import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NotificationType, MarkNotificationsMutation } from '../navbarTypes';
import '../Navbar.css';

const getTranslationKey = (key: string): string => {
  if (key === 'mention') return 'mentionUser';
  return 'likedPost';
};

interface NotificationParams {
  t: (key: string) => string;
  markAsRead: MarkNotificationsMutation;
  notification: NotificationType;
  notifications: NotificationType[];
}

const NotificationMobile = (props: NotificationParams) => {
  const { t, markAsRead, notification, notifications } = props;
  const navigate = useNavigate();
  const markNotificationAsRead = (
    notification: NotificationType,
    notifications: NotificationType[]
  ) => {
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
  };

  return (
    <span
      className="notification-title"
      onClick={() => { markNotificationAsRead(notification, notifications); }}
    >
      {`${notification.user.username} ${t(getTranslationKey(notification.type))}`}
      <Badge status="processing" className="new-notification-icon" />
    </span>
  );
};

export default NotificationMobile;
