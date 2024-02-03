import { useState } from 'react';
import { Dropdown, Badge, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faQuoteLeft,
  faBookmark,
  faReply,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import {
  LIKE_POST,
  REMOVE_LIKE,
  BOOKMARK_POST,
  REMOVE_BOOKMARK,
} from './Mutations';
import { useMutation } from '@apollo/client';
import { BookmarkType, LikeType, PostFooterProps, PostType } from './postTypes';

const PostFooter = (props: PostFooterProps) => {
  const {
    item,
    userId,
    topic,
    banStatus,
    bookmarksByPostList,
    isLoggedIn,
    isMobile,
    quotePost,
    replyAsNewPost,
    openFlagPostDialog,
    t,
  } = props;


  const [postLikes, setPostLikes] = useState<LikeType[]>(item.likes!);
  const [addBookmark] = useMutation(BOOKMARK_POST, {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    update(cache, { data }) {
      cache.modify({
        fields: {
          bookmarksByPostList(existingBookmarks = []) {
            if(!data?.bookmarkPost)
              return existingBookmarks;
            const { postId, userId } = data?.bookmarkPost;
            return existingBookmarks.concat({
              id: 0,
              postId: postId,
              userId: userId,
            });
          },
        },
      });
    },
  });

  const [removeBookmark] = useMutation(REMOVE_BOOKMARK, {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    update(cache, { data }) {
      cache.modify({
        fields: {
          bookmarksByPostList(existingBookmarks = []) {
            if(!data?.removeBookmark)
              return existingBookmarks;
            const { postId, userId } = data?.removeBookmark;
            return existingBookmarks.filter(
              (b: BookmarkType) => b.postId !== postId && b.userId !== userId
            );
          },
        },
      });
    },
  });

  const bookmarkPost = (post: PostType) => {
    const bookmarkExists =
      bookmarksByPostList.find(
        (l) => l.postId === post.id && l.userId === userId
      ) !== undefined;

    if (bookmarkExists) {
      removeBookmark({
        variables: {
          user: userId,
          post: post.id,
        },
        optimisticResponse: {
          removeBookmark: {
            id: 0,
            ok: true,
            postId: post.id,
            userId: userId,
          },
        },
      });
    } else {
      addBookmark({
        variables: {
          user: userId,
          post: post.id,
        },
        optimisticResponse: {
          bookmarkPost: {
            id: 0,
            ok: true,
            postId: post.id,
            userId: userId,
          },
        },
      });
    }
  };

  const [removeLike] = useMutation(REMOVE_LIKE);
  const [addLike] = useMutation(LIKE_POST);

  const bumpLikes = (post: PostType) => {
    if (
      postLikes.find((l) => l.postId === post.id && l.userId === userId) !==
      undefined
    ) {
      // User already liked the post. Remove like.
      removeLike({
        variables: {
          user: userId,
          post: post.id,
        },
      });

      setPostLikes(
        postLikes.filter(
          (l: LikeType) => l.postId !== post.id && l.userId !== userId
        )
      );
    } else {
      addLike({
        variables: {
          originator: userId,
          user: post.user.id,
          post: post.id,
          topic: topic.id,
        },
      });

      const newLike: LikeType = {
        id: 0,
        postId: post.id,
        userId: post.user.id,
        __typename: 'Like',
      };

      setPostLikes([newLike].concat(postLikes));
    }
  };

  const onFlagPostClick = () => {
    openFlagPostDialog(item.id);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ marginLeft: '95%' }}>
        <Badge count={postLikes.length} overflowCount={99}>
          <Tooltip
            placement="bottomLeft"
            title={
              postLikes.length > 0
                ? `${postLikes.length} ${t('posts.footer.likes')}`
                : t('posts.footer.noLikes')
            }
          >
            <span>
              <FontAwesomeIcon
                color={postLikes.length > 0 ? 'black' : 'gainsboro'}
                icon={faHeart}
                size="2x"
                style={{ marginTop: '10px' }}
              />
            </span>
          </Tooltip>
        </Badge>
      </div>
    );
  }

  const bookmarks = bookmarksByPostList;
  const bookmarkFilter = bookmarks.find((l) => l.postId === item.id);
  const itemColor = bookmarkFilter !== undefined ? 'black' : 'gainsboro';
  const testId =
    bookmarkFilter !== undefined ? 'bookmarked-post-icon' : 'bookmark-icon';
  const userBanned = banStatus.banned;

  if (isMobile) {
    return (
      <div style={{ marginLeft: '57%' }}>
        <FontAwesomeIcon
          data-testid="quote-icon-mobile"
          color="gainsboro"
          icon={faQuoteLeft}
          size="2x"
          onClick={() => { quotePost(item); }}
          style={{ marginRight: '10px' }}
        />
        <Badge count={postLikes.length} overflowCount={99}>
          <FontAwesomeIcon
            data-testid="like-icon-mobile"
            color={postLikes.length > 0 ? 'black' : 'gainsboro'}
            icon={faHeart}
            size="2x"
            className="like-post-mobile"
            onClick={() => { bumpLikes(item); }}
            style={{ marginTop: '10px' }}
          />
        </Badge>
        <FontAwesomeIcon
          className="bookmark-post-mobile"
          data-testid="bookmark-icon-mobile"
          onClick={() => { bookmarkPost(item); }}
          icon={faBookmark}
          size="2x"
          color={itemColor}
          style={{ marginTop: '10px', marginLeft: '10px' }}
        />
      </div>
    );
  }

  const items = [
    {
      label: (
        <div onClick={() => { replyAsNewPost(item); }}>
          <FontAwesomeIcon icon={faReply} /> &nbsp;{' '}
          {t('posts.footer.replyAsTopic')}
        </div>
      ),
      key: 'replyasnewpost',
    },
    {
      label: (
        <div onClick={onFlagPostClick}>
          <FontAwesomeIcon icon={faFlag} /> &nbsp; {t('posts.footer.flagPost')}
        </div>
      ),
      key: 'flagpost',
    },
  ];

  return (
    <div style={{ marginLeft: userBanned ? '90%' : '78%' }}>
      {!userBanned ? (
        <Dropdown.Button
          type="primary"
          className="dropdown-button-quote"
          onClick={() => { quotePost(item); }}
          menu={{ items }}
        >
          <FontAwesomeIcon icon={faQuoteLeft} />
          &nbsp; {t('posts.footer.quote')}
        </Dropdown.Button>
      ) : null}
      <Badge
        count={postLikes.length}
        data-testid="like-badge"
        overflowCount={99}
        offset={[0, -10]}
      >
        <Tooltip
          placement="bottom"
          title={
            postLikes.length > 0
              ? `${postLikes.length} ${t('posts.footer.likes')}`
              : t('posts.footer.likePost')
          }
        >
          <span>
            <FontAwesomeIcon
              data-testid="like-icon"
              color={postLikes.length > 0 ? 'black' : 'gainsboro'}
              icon={faHeart}
              size="2x"
              className="like-post-icon"
              onClick={() => { bumpLikes(item); }}
            />
          </span>
        </Tooltip>
      </Badge>
      <Tooltip placement="bottomLeft" title={t('posts.footer.bookmarkPost')}>
        <span>
          <FontAwesomeIcon
            data-testid={testId}
            onClick={() => { bookmarkPost(item); }}
            icon={faBookmark}
            size="2x"
            color={itemColor}
            className="bookmark-post-icon"
          />
        </span>
      </Tooltip>
    </div>
  );
};

export default PostFooter;
