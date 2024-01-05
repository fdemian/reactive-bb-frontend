import PropTypes from 'prop-types';
import { GET_TOPICS_BY_USER } from './Queries';
import Loading from '../Loading/LoadingIndicator';
import Avatar from '../UserAvatar/UserAvatar';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import format_title_string from '../utils/formats.js';

const UserTopics = ({ id, user }) => {
    const { loading, error, data } = useQuery(GET_TOPICS_BY_USER, {
        variables: { id: id },
    });

    if (error) return <p>Error</p>;

    if (loading) return <Loading />;

    const topics = data.topicsByUser;

    return (
        <List
            itemLayout="vertical"
            size="large"
            data-testid="user-topics"
            dataSource={topics}
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
                            <Link
                                data-testid="topic-link"
                                to={`/topics/${item.id}/${format_title_string(item.name)}`}
                            >
                                <span className="topic-item-title">{item.name}</span>
                            </Link>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

UserTopics.propTypes = {
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

export default UserTopics;
