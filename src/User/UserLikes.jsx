import PropTypes from 'prop-types';
import { GET_LIKES_BY_USER } from './Queries';
import Loading from '../Loading/LoadingIndicator';
import Avatar from '../UserAvatar/UserAvatar';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import Renderer from '../Editor/Renderer';
import { useQuery } from '@apollo/client';

const UserLikes = ({ id, user }) => {
    const { loading, error, data } = useQuery(GET_LIKES_BY_USER, {
        variables: { id: id },
    });

    if (error) return <p>Error</p>;

    if (loading) return <Loading />;

    const likes = data.likesByUser;

    return (
        <List
            itemLayout="vertical"
            size="large"
            data-testid="user-likes"
            dataSource={likes}
            renderItem={(item) => (
                <List.Item id={`post-${item.id}`} key={item.id}>
                    <List.Item.Meta
                        avatar={
                            <Avatar
                                avatar={user.avatar}
                                username={user.username}
                                shape="square"
                                size={60}
                            />
                        }
                        title={
                            <Link to={`/posts/${item.post.id}/${item.post.topicId}`}>
                                <span className="user-name">{user.username}</span>
                            </Link>
                        }
                    />
                    <Renderer content={item.post.content} />
                </List.Item>
            )}
        />
    );
};

UserLikes.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        banned: PropTypes.bool.isRequired
    })
};

export default UserLikes;
