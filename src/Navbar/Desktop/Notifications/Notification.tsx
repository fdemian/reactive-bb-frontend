import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../../navbarTypes';
import UserAvatar from '../../../UserAvatar/UserAvatar';

const translationKeys = {
  mention: 'mentionUser',
  like: 'likedPost',
};

type MarkReadParams = {
  variables: {
    notifications: number[];
  };
  optimisticResponse: {
    markAsRead: NotificationType[];
  };
};

type NotificationProps = {
  notification: NotificationType;
  notifications: NotificationType[];
  markAsRead: (p: MarkReadParams) => void;
  t: (key: string) => string;
};

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
            markAsRead: notifications.filter((n) => n.id !== notification.id),
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
      {t(translationKeys[notification.type])}
    </div>
  );
};

export default Notification;
