import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TOPIC, GET_POSTS } from './Queries';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  FLAG_POST,
  CLOSE_TOPIC,
  DELETE_TOPIC,
  REOPEN_TOPIC,
  INCREASE_VIEW_COUNT,
} from './Mutations';
import { GET_USER } from '../Navbar/Queries';
import { GET_IS_LOGGED_IN } from '../Login/queries';
import { SET_MENTIONS } from '../Editor/Queries';
import {
  Button,
  Statistic,
  Card,
  Divider,
  Breadcrumb,
  FloatButton,
  Modal,
  Spin,
} from 'antd';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faRightToBracket,
  faLock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import Loading from '../Loading/LoadingIndicator';
import {
  getUserId,
  getUserName,
  getBanStatus,
  getUserType,
} from '../Login/authUtils';
import { getCategoryURL, getCategoryName } from './utils';
import { useTranslation } from 'react-i18next';
import { getDefaultPageItems, getIsMobile, getConfig } from '../App/utils';
import { getPageNumber } from '../utils/pageUtils';
import format_title_string from '../utils/formats';
import TopicModifyButtons from './TopicModifyButtons';
import FlagPostModal from './FlagPostModal';
import { PostToQuote, PostType } from './postTypes';
import './Posts.css';
import { MentionType } from '../Editor/editorTypes';

const TopicReplies = lazy(() => import('./TopicReplies'));
const ReplyDrawer = lazy(() => import('./ReplyDrawer'));
const TagList = lazy(() => import('./TagList'));
const PaginationFooter = lazy(
  () => import('../PaginationFooter/PaginationFooter')
);

export const Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('posts');
  const isMobile = getIsMobile();
  const banStatus = getBanStatus();
  const config = getConfig();
  const userType = getUserType();
  const [mentions, setMentions] = useState<MentionType[]>([]);
  const [flagPostDialog, setFlagPostDialog] = useState(false);
  const [flagReasonValue, setFlagReasonValue] = useState(1);
  const [flaggedPostId, setFlaggedPostId] = useState<number | null>(null);
  const [flagTextValue, setFlagTextValue] = useState(null);
  const [editablePost, setEditablePost] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get('page');

  const openFlagPostDialog = (flagPostId: number) => {
    setFlaggedPostId(flagPostId);
    setFlagPostDialog(true);
  };

  const PAGE_LIMIT = parseInt(getDefaultPageItems() ?? '5', 10);
  const [currentPage, setCurrentPage] = useState(getPageNumber(initialPage));
  const PAGE_OFFSET = (currentPage - 1) * PAGE_LIMIT;
  const [closeTopicMut] = useMutation(CLOSE_TOPIC);
  const [deleteTopicMut] = useMutation(DELETE_TOPIC);
  const [reopenTopicMut] = useMutation(REOPEN_TOPIC);
  const [addPost] = useMutation(ADD_POST, {
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            return existingPosts.concat(createPost);
          },
        },
      });
    },
  });

  const [deletePost] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const { id } = deletePost;
            return existingPosts.filter(
              (p: PostType) => p.__ref !== 'Post:' + id
            );
          },
        },
      });
    },
  });

  const [editPost] = useMutation(EDIT_POST, {
    update(cache, { data: { editPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const { id, content } = editPost;
            return existingPosts.map((p: PostType) => {
              if (p.__ref !== 'Post:' + id) {
                return {
                  ...p,
                  content: content,
                };
              }
              return p;
            });
          },
        },
      });
    },
  });

  const [flagPost] = useMutation(FLAG_POST);
  const [publishMentions] = useMutation(SET_MENTIONS);
  const [increaseViewCount] = useMutation(INCREASE_VIEW_COUNT);
  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const isLoggedIn = loginQuery.data?.loggedIn;
  const { id, selectedPost } = useParams();

  const handleFlagPost = () => {
    setFlagPostDialog(false);
    const userId = getUserId();

    flagPost({
      variables: {
        post: flaggedPostId,
        user: userId,
        reason: flagReasonValue,
        text: flagTextValue,
      },
    });
  };

  const closeTopic = () =>
    closeTopicMut({
      variables: {
        topic: parseInt(id ?? '0', 10),
      },
      refetchQueries: [GET_TOPIC, 'GetTopic'],
    });

  const deleteTopic = () => {
    deleteTopicMut({
      variables: {
        topic: parseInt(id ?? '0', 10),
      },
    });

    navigate('/');
  };

  const reopenTopic = () =>
    reopenTopicMut({
      variables: {
        topic: parseInt(id ?? '0', 10),
      },
      refetchQueries: [GET_TOPIC, 'GetTopic'],
    });

  useEffect(() => {
    if (isLoggedIn) {
      // TODO: send the user id, so that a user cannot actually 'see' a thread more than once.
      increaseViewCount({
        variables: {
          topic: parseInt(id ?? '0', 10),
        },
      });
    }
  }, [increaseViewCount, id, isLoggedIn]);

  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => { setVisible(true); };
  const onClose = () => {
    setVisible(false);
    const editor: any = containerRef.current;
    editor.clear();
  };
  const userId = getUserId();

  const quotePost = (postToQuote: PostToQuote) => {
    // TODO: workaround.
    /*
     * The first time the user quotes a post and
     * has not opened the drawer the editor ref is not there.
     * As a stopgap we are opening the drawer automatically and quoting
     * the post when the drawer has hopefully been opened.
     */
    if (containerRef.current === null) {
      setVisible(true);
      setTimeout(() => {
        quotePost(postToQuote);
      }, 100);
      return;
    }

    const { content, user } = postToQuote;
    const editor: any = containerRef.current;

    const quoteProps = {
      author: {
        name: `@${user.username}`,
        link: `/users/${user.id}/${user.username}`,
      },
      source: {
        content: content,
        link: `/postlink/${postToQuote.id}`,
      },
    };
    editor.executeCommand('INSERT_CITE_QUOTE', quoteProps);
  };

  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: {
      id: parseInt(id ?? '0', 10),
    },
  });

  const postsQuery = useQuery(GET_POSTS, {
    variables: {
      topicId: parseInt(id ?? '0', 10),
      limit: PAGE_LIMIT,
      offset: PAGE_OFFSET,
    },
  });

  const userQuery = useQuery(GET_USER, {
    variables: { id: userId },
    skip: userId === null || isNaN(userId),
  });

  if (error || postsQuery.error) return <p>Error :(</p>;

  if (loading || postsQuery.loading) return <Loading />;

  const { topic } = data;

  // Number of pages calculation.
  const numberOfPages = Math.ceil(topic.replies / PAGE_LIMIT);

  const onChangePage = (page: number) => {
    const { fetchMore } = postsQuery;
    const _offset = (currentPage - 1) * PAGE_LIMIT;
    const _limit = (currentPage - 1) * PAGE_LIMIT + PAGE_LIMIT;

    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
    fetchMore({
      variables: {
        offset: _offset,
        limit: _limit,
      },
    });

    // Scroll to the top of the page.
    window.scroll(0, 0);
  };

  const removePost = (postId: number) => {
    const userId = getUserId();

    deletePost({
      variables: {
        post: postId,
        user: userId,
      },
      optimisticResponse: {
        deletePost: {
          ok: true,
          id: postId,
        },
      },
    });
  };

  const editUserPost = () => {
    const userId = getUserId();
    const editor: any = containerRef.current;
    const editorContent = editor.getContent();
    const newPostContent = JSON.stringify(editorContent);
    const postId = editablePost;

    editPost({
      variables: {
        post: postId,
        user: userId,
        content: newPostContent,
      },
      optimisticResponse: {
        editPost: {
          id: postId,
          ok: true,
          content: newPostContent,
          __typename: 'Post',
        },
      },
    });

    // Cleanup
    setEditablePost(null);
  };

  const createPost = () => {
    const editor: any = containerRef.current;
    const postContent = editor.getContent();
    const jsonContent = JSON.stringify(postContent);
    const topicId = parseInt(id ?? '0', 10);
    const userId = getUserId();
    const userName = getUserName();

    addPost({
      variables: {
        content: jsonContent,
        user: userId,
        topic: topicId,
      },
      optimisticResponse: {
        addPost: {
          createPost: {
            id: 0,
            content: jsonContent,
            user: userQuery.data.user,
            __ref: 'Post:0',
          },
        },
      },
    });
    onClose();

    // If there are any mentions, publish them and notify the users.
    if (mentions.length > 0) {
      const topicLink = `/topics/${topicId}/${format_title_string(topic.name)}`;
      publishMentions({
        variables: {
          link: topicLink,
          user: userName,
          mentioned: mentions,
        },
      });
    }

    onChangePage(numberOfPages);
  };

  const navigateToLogin = () =>
    { navigate('/login', { state: { from: location } }); };
  const { posts } = postsQuery.data;

  const replyActionButton = isLoggedIn ? (
    <div>
      <Button
        className="reply-button"
        role="button"
        aria-label={t('posts.main.reply')}
        key="replyCurrentThread"
        type="primary"
        size="large"
        onClick={showDrawer}
      >
        <FontAwesomeIcon icon={faReply} />
        &nbsp; {t('posts.main.reply')}
      </Button>
      <TopicModifyButtons
        closed={topic.closed}
        reopenTopic={reopenTopic}
        closeTopic={closeTopic}
        deleteTopic={deleteTopic}
        userType={userType ?? ''}
        t={t}
      />
    </div>
  ) : (
    <Button
      className="reply-button-login"
      aria-label={t('posts.main.loginToReply')}
      role="button"
      key="loginLink"
      type="primary"
      size="large"
      onClick={navigateToLogin}
    >
      <FontAwesomeIcon icon={faRightToBracket} />
      &nbsp; {t('posts.main.loginToReply')}
    </Button>
  );

  const breadCrumbItems = [
    {
      title: <Link to="/">{t('posts.main.home')}</Link>,
    },
    {
      title: (
        <Link to={getCategoryURL(topic.category)}>
          {getCategoryName(topic.category)}
        </Link>
      ),
    },
    {
      title: topic.name,
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {topic.name} - {config.name}
        </title>
      </Helmet>

      <Card className="posts-page-container">
        <div style={isMobile ? {} : { width: '80%', marginLeft: '10%' }}>
          <Breadcrumb items={breadCrumbItems} className="topic-breadcrumbs" />
          <>
            <p className="topic-name">
              {topic.name} &nbsp;
              {topic.closed && (
                <FontAwesomeIcon icon={faLock} size="1x" color="gainsboro" />
              )}
            </p>
            <TagList tags={topic.tags} />
            {(banStatus === null || !banStatus.banned) &&
              replyActionButton}
          </>
          <span className="topic-statistics">
            <Statistic
              title={t('posts.main.views')}
              value={topic.views}
              style={{ marginRight: 30 }}
            />
            <Statistic title={t('posts.main.replies')} value={topic.replies} />
          </span>
          <Divider>
            <h2>{t('posts.main.replies')}</h2>
          </Divider>
          <TopicReplies
            user={userQuery.data ? userQuery.data.getUser : null}
            containerRef={containerRef}
            isClosed={topic.closed}
            quotePost={quotePost}
            removePost={removePost}
            replies={posts}
            userId={userId ?? -1}
            isLoggedIn={isLoggedIn}
            topic={topic}
            selectedPost={selectedPost ?? '-1'}
            editablePost={editablePost}
            setEditablePost={setEditablePost}
            editUserPost={editUserPost}
            t={t}
            isMobile={isMobile}
            banStatus={banStatus}
            userType={userType ?? ''}
            openFlagPostDialog={openFlagPostDialog}
          />
        </div>
        <Suspense fallback={<Spin />}>
          <ReplyDrawer
            topic={topic}
            user={userQuery.data ? userQuery.data.getUser : null}
            containerRef={containerRef}
            onClose={onClose}
            open={visible}
            createPost={createPost}
            isMobile={isMobile}
            mentions={mentions}
            setMentions={setMentions}
          />
        </Suspense>
        <br />
        <Divider />
        <PaginationFooter
          lastPage={numberOfPages}
          currentPage={currentPage}
          onChangePage={onChangePage}
        />
        <FloatButton.Group shape="circle" style={{ right: isMobile ? 20 : 70 }}>
          {!topic.closed && isLoggedIn ? (
            <FloatButton
              className="float-button-reply"
              type="primary"
              tooltip={<div>{t('posts.main.reply')}</div>}
              onClick={showDrawer}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
          ) : null}
          <FloatButton.BackTop
            className="float-button-backtop"
            type="primary"
          />
        </FloatButton.Group>
        <Modal
          title="Flag post"
          open={flagPostDialog}
          onOk={handleFlagPost}
          onCancel={() => { setFlagPostDialog(false); }}
        >
          <FlagPostModal
            flagReasonValue={flagReasonValue}
            setFlagReasonValue={setFlagReasonValue}
            setFlagTextValue={setFlagTextValue}
          />
        </Modal>
      </Card>
    </>
  );
};
