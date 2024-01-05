import { useState } from 'react';
import { Dropdown, Badge, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart,
  faQuoteLeft,
  faBookmark,
  faReply,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { LIKE_POST, REMOVE_LIKE, BOOKMARK_POST, REMOVE_BOOKMARK } from './Mutations';
import { useMutation } from '@apollo/client';
import Loading from '../Loading/LoadingIndicator';
import PropTypes from 'prop-types';

const PostFooter = (props) => {
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

    const [postLikes, setPostLikes] = useState(item.likes);
    const [addBookmark] = useMutation(BOOKMARK_POST, {
        update(cache, { data: { bookmarkPost } }) {
            cache.modify({
                fields: {
                    bookmarksByPostList(existingBookmarks = []) {
                        const { postId, userId } = bookmarkPost;
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
        update(cache, { data: { removeBookmark } }) {
            cache.modify({
                fields: {
                    bookmarksByPostList(existingBookmarks = []) {
                        const { postId, userId } = removeBookmark;
                        return existingBookmarks.filter(
                            (b) => b.postId !== postId && b.userId !== userId
                        );
                    },
                },
            });
        },
    });

    const bookmarkPost = (post) => {
        const bookmarkExists =
            bookmarksByPostList.find((l) => l.postId === post.id && l.userId === userId) !==
            undefined;

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

    const bumpLikes = (post) => {
        if (
            postLikes.find((l) => l.postId === post.id && l.userId === userId) !== undefined
        ) {
            // User already liked the post. Remove like.
            removeLike({
                variables: {
                    user: userId,
                    post: post.id,
                },
            });

            setPostLikes(postLikes.filter((l) => l.postId !== post.id && l.userId !== userId));
        } else {
            addLike({
                variables: {
                    originator: userId,
                    user: post.user.id,
                    post: post.id,
                    topic: topic.id,
                },
            });

            const newLike = {
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

    if (!bookmarksByPostList) return <Loading />;

    const bookmarks = bookmarksByPostList;
    const bookmarkFilter = bookmarks.find((l) => l.postId === item.id);
    const itemColor = bookmarkFilter !== undefined ? 'black' : 'gainsboro';
    const testId = bookmarkFilter !== undefined ? 'bookmarked-post-icon' : 'bookmark-icon';
    const userBanned = banStatus !== null && banStatus.banned === true;

    if (isMobile) {
        return (
            <div style={{ marginLeft: '57%' }}>
                <FontAwesomeIcon
                    data-testid="quote-icon-mobile"
                    color="gainsboro"
                    icon={faQuoteLeft}
                    size="2x"
                    onClick={() => quotePost(item)}
                    style={{ marginRight: '10px' }}
                />
                <Badge
                    count={postLikes.length}
                    overflowCount={99}
                    onClick={() => bumpLikes(item)}
                >
                    <FontAwesomeIcon
                        data-testid="like-icon-mobile"
                        color={postLikes.length > 0 ? 'black' : 'gainsboro'}
                        icon={faHeart}
                        size="2x"
                        className="like-post-mobile"
                        style={{ marginTop: '10px' }}
                    />
                </Badge>
                <FontAwesomeIcon
                    className="bookmark-post-mobile"
                    data-testid="bookmark-icon-mobile"
                    onClick={() => bookmarkPost(item)}
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
                <div onClick={() => replyAsNewPost(item)}>
                    <FontAwesomeIcon icon={faReply} /> &nbsp;{' '}
                    {t('posts.footer.replyAsTopic')}
                </div>
            ),
            key: 'replyasnewpost',
        },
        {
            label: (
                <div onClick={onFlagPostClick}>
                    <FontAwesomeIcon icon={faFlag} /> &nbsp;{' '}
                    {t('posts.footer.flagPost')}
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
                    onClick={() => quotePost(item)}
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
                onClick={() => bumpLikes(item)}
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
            />
          </span>
            </Tooltip>
         </Badge>
        <Tooltip placement="bottomLeft" title={t('posts.footer.bookmarkPost')}>
            <span>
              <FontAwesomeIcon
                  data-testid={testId}
                  onClick={() => bookmarkPost(item)}
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


PostFooter.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.any.isRequired,
        edited: PropTypes.bool.isRequired,
        created: PropTypes.instanceOf(Date),
        likes: PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            postId: PropTypes.number.isRequired,
        }),
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    }),
    userId: PropTypes.number.isRequired,
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        replies: PropTypes.number.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        closed: PropTypes.bool.isRequired,
        tags: PropTypes.string.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    }),
    banStatus: PropTypes.string.isRequired,
    bookmarksByPostList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            userId: PropTypes.number.isRequired,
            postId: PropTypes.number.isRequired
        })
    ),
    isLoggedIn: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    quotePost: PropTypes.func.isRequired,
    replyAsNewPost: PropTypes.func.isRequired,
    openFlagPostDialog: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default PostFooter;
