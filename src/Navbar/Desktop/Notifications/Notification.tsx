import { useNavigate } from 'react-router-dom';
import { NotificationType, MarkNotificationsMutation } from '../../navbarTypes';
import UserAvatar from '../../../UserAvatar/UserAvatar';

const getTranslationKey = (key: string): string => {
  if (key === 'mention') return 'mentionUser';
  return 'likedPost';
};

interface NotificationProps {
  notification: NotificationType;
  notifications: NotificationType[];
  markAsRead: MarkNotificationsMutation;
  t: (key: string) => string;
}

const Notification = ({
  t,
  notification,
  markAsRead,
  notifications,
}: NotificationProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        //mark as read.
        markAsRead({
          variables: {
            notifications: [notification.id],
          },
          optimisticResponse: {
            markNotificationsRead: notifications.filter((n) => n.id !== notification.id).map(n => n.id),
          },
        });
        navigate(notification.link);
      }}
    >
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
  );
};

export default Notification;
