import PropTypes from 'prop-types';
import { List, Tooltip } from 'antd';
import Avatar from '../UserAvatar/UserAvatar';
import Renderer from '../Editor/Renderer';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import './Bookmarks.css';

const BookmarkPostList = ({ bookmarks, userId, removeBookmark, t }) => {
    const navigate = useNavigate();
    const deleteBookmark = (bookmark) => {
        removeBookmark({
            variables: {
                user: userId,
                post: bookmark.post.id
            },
            optimisticResponse: {
                removeBookmark: {
                    id: bookmark.id,
                    ok: true,
                    userId: userId,
                    postId: bookmark.post.id
                }
            }
        });
    };

    const goToBookmark = (bookmark) => navigate(`/postlink/${bookmark.post.id}`);

    return (
        <List
            itemLayout="vertical"
            size="large"
            header={
                <h2>
                    {bookmarks.length} {t('bookmarks')}
                </h2>
            }
            dataSource={bookmarks}
            renderItem={(bookmark) => (
                <List.Item id={bookmark.id} key={bookmark.id}>
                    <List.Item.Meta
                        key={bookmark.id}
                        avatar={
                            <Link to={`/users/${bookmark.post.user.id}/${bookmark.post.user.username}`}>
                                <Avatar
                                    avatar={bookmark.post.user.avatar}
                                    username={bookmark.post.user.username}
                                    shape="square"
                                    size={60}
                                />
                            </Link>
                        }
                        title={
                            <Link to={`/users/${bookmark.post.user.id}/${bookmark.post.user.username}`}>
                                <p className="user-name">{bookmark.post.user.username}</p>
                            </Link>
                        }
                    />
                    <br />
                    <Renderer content={bookmark.post.content} />
                    <br />
                    <div style={{ marginLeft: '80%' }}>
                        <Tooltip placement="bottomLeft" title={t('goToBookmark')}>
                            <FontAwesomeIcon
                                data-testid="bookmark-icon"
                                onClick={() => goToBookmark(bookmark)}
                                icon={faArrowCircleUp}
                                size="2x"
                                color="gainsboro"
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            />
                        </Tooltip>
                        <Tooltip placement="bottomLeft" title={t('removeBookmark')}>
                            <FontAwesomeIcon
                                data-testid="bookmark-icon"
                                onClick={() => deleteBookmark(bookmark)}
                                icon={faTrash}
                                size="2x"
                                color="gainsboro"
                                style={{ marginTop: '10px', marginLeft: '10px' }}
                            />
                        </Tooltip>
                    </div>
                </List.Item>
            )}
        />
    );
};

BookmarkPostList.propTypes = {
    bookmarks: PropTypes.array.isRequired,
    userId: PropTypes.number.isRequired,
    removeBookmark: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

export default BookmarkPostList;
