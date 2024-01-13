import { useQuery, useMutation } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { List, Badge, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import UserAvatar from '../UserAvatar/UserAvatar';
import { getUserId } from '../Login/authUtils';
import { GET_ALL_NOTIFICATIONS } from './Queries';
import { MARK_NOTIFICATIONS_READ } from '../Navbar/Queries';
import { getDefaultPageItems } from '../App/utils';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const getTranslationKey = (key: string): string => {
    if (key === 'mention') return 'mentionUser';
    return 'likedPost';
};

type UserType = {
    avatar: string;
    username: string;
};

type NotificationType = {
    id: number;
    read: boolean;
    link: string;
    type: string;
    user: UserType;
    originator: UserType;
};

export const Component = () => {
    const { t } = useTranslation('navbar', { keyPrefix: 'navbar' });
    const id = getUserId();
    const limit = getDefaultPageItems();
    const navigate = useNavigate();

    const [markAsRead] = useMutation(MARK_NOTIFICATIONS_READ, {
        update(cache, { data: { markAsRead } }) {
            cache.modify({
                fields: {
                    notifications() {
                        return markAsRead;
                    },
                },
            });
        },
    });

    const { data, loading, error } = useQuery(GET_ALL_NOTIFICATIONS, {
        variables: {
            user: id,
            limit: parseInt(limit ?? '5', 10),
            offset: 0,
        },
    });

    if (error) return <p>Error</p>;

    if (loading) return <p>Loading...</p>;

    const { allNotifications } = data;

    return (
        <>
            <Helmet>
                <title>{t('notifications')}</title>
            </Helmet>
            <List
                bordered
                header={<h1>{t('notifications')}</h1>}
                dataSource={allNotifications}
                renderItem={(notification: NotificationType) => (
                    <List.Item
                        actions={[
                            <Typography.Text key="read-indicator" mark>
                                {notification.read ? 'READ' : 'UNREAD'}
                            </Typography.Text>,
                        ]}
                    >
                        <div
                            className="notification-item"
                            onClick={() => {
                                // Mark as read.
                                markAsRead({
                                    variables: {
                                        notifications: [notification.id],
                                    },
                                    optimisticResponse: {
                                        markAsRead: allNotifications.filter(
                                            (n: NotificationType) =>
                                                n.id !== notification.id
                                        ),
                                    },
                                });
                                navigate(notification.link);
                            }}
                        >
                            <Badge
                                status={
                                    notification.read ? 'default' : 'processing'
                                }
                            />
                            &nbsp;
                            <UserAvatar
                                avatar={notification.user.avatar}
                                username={notification.user.username}
                                size={20}
                                shape="square"
                            />
                            &nbsp; &nbsp;
                            <strong>{notification.originator.username}</strong>
                            &nbsp;
                            {t(getTranslationKey(notification.type))}
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
};
