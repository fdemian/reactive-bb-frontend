import { Suspense, lazy } from 'react';
import { List, Skeleton, Tooltip, Spin, Typography, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../UserAvatar/UserAvatar';
import { Link } from 'react-router-dom';
import PostFooter from './PostFooter';
import ModeratorPostControls from './ModeratorPostControls';
import Loading from '../Loading/LoadingIndicator';
import { GET_BOOKMARKS_BY_POSTS } from './Queries';
import { useQuery } from '@apollo/client';
import { getDate, getDateRelative, savePostReplyContent } from './utils';
import { useNavigate } from 'react-router-dom';
import { TopicRepliesProps, PostType } from './postTypes';

import './Posts.css';

const Renderer = lazy(() => import('../Editor/Renderer'));
const Editor = lazy(() => import('../Editor/Editor'));

const getPostsIdsMapped = (replies: PostType[]) => replies.map((p) => p.id);

const { Text } = Typography;

const PostsFile = (props: TopicRepliesProps) => {
  const {
    userType,
    banStatus,
    quotePost,
    removePost,
    topic,
    replies,
    isLoggedIn,
    userId,
    selectedPost,
    isMobile,
    isClosed,
    openFlagPostDialog,
    editablePost,
    setEditablePost,
    editUserPost,
    containerRef,
    user,
    t,
  } = props;

  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_BOOKMARKS_BY_POSTS, {
    variables: {
      user: userId,
      posts: getPostsIdsMapped(replies),
    },
    skip: isNaN(userId) || userId === null,
  });

  const replyAsNewPost = (item: PostType) => {
    const commentLink = `/postlink/${item.id}`;
    savePostReplyContent(item.content, item.user, commentLink);
    navigate('/topics/new');
  };

  if (loading) return <Loading />;

  if (error) return <p>Error</p>;

  const postToSelect = parseInt(selectedPost, 10);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={replies}
        renderItem={(item) => (
          <Suspense fallback={<Skeleton avatar paragraph={{ rows: 4 }} />}>
            <List.Item
              id={`post-${item.id}`}
              key={`post-${item.id}`}
              className={item.id === postToSelect ? 'post-selected' : ''}
              extra={
                userType === 'M' && !banStatus.banned ? (
                  <Suspense fallback={<Spin />}>
                    <ModeratorPostControls
                      isEditing={item.id === editablePost}
                      t={t}
                      onDelete={() => { removePost(item.id); }}
                      onEdit={() => { setEditablePost(item.id); }}
                    />
                  </Suspense>
                ) : null
              }
            >
              <List.Item.Meta
                avatar={
                  <Link to={`/users/${item.user.id}/${item.user.username}`}>
                    <Avatar
                      avatar={item.user.avatar}
                      username={item.user.username}
                      shape="square"
                      size={60}
                    />
                  </Link>
                }
                description={
                  <>
                    <div className="post-user-status">{item.user.status}</div>
                    <div className="post-date">
                      <Tooltip title={getDate(item.created)}>
                        {getDateRelative(item.created)}
                      </Tooltip>
                    </div>
                  </>
                }
                title={
                  <>
                    <Link to={`/users/${item.user.id}/${item.user.username}`}>
                      <span className="user-name">{item.user.username}</span>
                    </Link>
                  </>
                }
              />
              {item.edited ? (
                <>
                  <Tooltip
                    placement="bottomLeft"
                    title={t('posts.mod.editByMod')}
                  >
                    <FontAwesomeIcon
                      data-testid="edited-icon"
                      icon={faInfoCircle}
                      size="2x"
                      color="black"
                      className="bookmark-post-icon"
                    />
                  </Tooltip>
                  &nbsp;
                  <Text mark>[{t('posts.mod.edited')}]</Text>
                </>
              ) : null}
              <Suspense fallback={<Spin />}>
                {item.id === editablePost ? (
                  <Editor
                    containerRef={containerRef}
                    mentions={[]}
                    setMentions={() => {}}
                    isMobile={isMobile}
                    user={user}
                    initialState={item.content}
                  />
                ) : (
                  <Renderer content={item.content} />
                )}
              </Suspense>
              {!isClosed && !(item.id === editablePost) ? (
                <PostFooter
                  topic={topic}
                  userId={userId}
                  banStatus={banStatus}
                  item={item}
                  bookmarksByPostList={data ? data.bookmarksByPostList : []}
                  isLoggedIn={isLoggedIn}
                  quotePost={quotePost}
                  replyAsNewPost={replyAsNewPost}
                  isMobile={isMobile}
                  openFlagPostDialog={openFlagPostDialog}
                  t={t}
                />
              ) : (
                <>
                  <Button
                    danger
                    role="button"
                    aria-label="cancel-edit"
                    key="cancelEditButtn"
                    type="primary"
                    size="large"
                    onClick={() => { setEditablePost(null); }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    &nbsp; {t('posts.mod.cancelEdit')}
                  </Button>
                  &nbsp;
                  <Button
                    role="button"
                    aria-label="confirm-edit"
                    key="confirmEditBtn"
                    type="primary"
                    size="large"
                    onClick={(val: any) => { editUserPost(val); }}
                  >
                    {t('posts.mod.confirmEdit')}
                    &nbsp; <FontAwesomeIcon icon={faCheck} />
                  </Button>
                </>
              )}
            </List.Item>
          </Suspense>
        )}
      />
    </>
  );
};

export default PostsFile;
