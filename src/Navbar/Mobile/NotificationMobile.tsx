import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NotificationType } from '../navbarTypes';
import '../Navbar.css';

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

type NotificationParams = {
    t: (key: string) => string;
    markAsRead: (p: MarkReadParams) => void;
    notification: NotificationType;
    notifications: NotificationType[];
};

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
                markAsRead: notifications.filter(
                    (n) => n.id !== notification.id
                ),
            },
        });
        navigate(notification.link);
    };

    return (
        <span
            className="notification-title"
            onClick={() => markNotificationAsRead(notification, notifications)}
        >
            {`${notification.user.username} ${t(translationKeys[notification.type])}`}
            <Badge status="processing" className="new-notification-icon" />
        </span>
    );
};

export default NotificationMobile;
