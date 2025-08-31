import { useQuery, useMutation } from '@apollo/client/react';
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

interface NotificationType {
  __typename?: 'NotificationResponse' | undefined;
  id: number;
  link: string;
  type: string;
  read: boolean;
  originator: {
    __typename?: 'User' | undefined;
    id: number;
    avatar?: string | null | undefined;
    username: string;
  };
  user: {
    __typename?: 'User' | undefined;
    id: number;
    avatar?: string | null | undefined;
    username: string;
  };
}

const getAllNotifications = (
  allNotifications: NotificationType[] | null | undefined,
  notification: NotificationType
): number[] =>
  allNotifications !== null && allNotifications !== undefined
    ? allNotifications.filter((n) => n.id !== notification.id).map((n) => n.id)
    : [];

export const Component = () => {
  const { t } = useTranslation('navbar', { keyPrefix: 'navbar' });
  const id = getUserId();
  const limit = getDefaultPageItems();
  const navigate = useNavigate();

  const [markAsRead] = useMutation(MARK_NOTIFICATIONS_READ, {
    update(cache, { data }) {
      if (!data || !data.markNotificationsRead) return;
      cache.modify({
        fields: {
          notifications() {
            if (data.markNotificationsRead === undefined) return [];

            return data.markNotificationsRead;
          },
        },
      });
    },
  });

  const { data, loading, error } = useQuery(GET_ALL_NOTIFICATIONS, {
    variables: {
      user: id ?? -1,
      limit: parseInt(limit ?? '5', 10),
      offset: 0,
    },
  });

  if (error) return <p>Error</p>;

  if (loading || !data) return <p>Loading...</p>;

  let { allNotifications } = data;
  if (!allNotifications) allNotifications = [];

  return (
    <>
      <Helmet>
        <title>{t('notifications')}</title>
      </Helmet>
      <List
        bordered
        header={<h1>{t('notifications')}</h1>}
        dataSource={allNotifications}
        renderItem={(notification) => (
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
                    markNotificationsRead: getAllNotifications(
                      allNotifications,
                      notification
                    ),
                  },
                });
                navigate(notification.link);
              }}
            >
              <Badge status={notification.read ? 'default' : 'processing'} />
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
