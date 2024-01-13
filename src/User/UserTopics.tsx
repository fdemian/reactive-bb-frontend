import { GET_TOPICS_BY_USER } from './Queries.js';
import Loading from '../Loading/LoadingIndicator.js';
import Avatar from '../UserAvatar/UserAvatar.js';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import format_title_string from '../utils/formats.js';
import { UserType, TopicType } from './userTypes';

type UserTopicsProps = {
    id: number;
    user: UserType;
};

const UserTopics = ({ id, user }: UserTopicsProps) => {
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
            renderItem={(item: TopicType) => (
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
                                <span className="topic-item-title">
                                    {item.name}
                                </span>
                            </Link>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default UserTopics;
