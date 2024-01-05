import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../Navbar.css'

const translationKeys = {
    mention: 'mentionUser',
    like: 'likedPost',
};

const NotificationMobile = (props) => {
    const { t, markAsRead, notification, notifications } = props;
    const navigate = useNavigate();
    const markNotificationAsRead = (notification, notifications) => {
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

NotificationMobile.propTypes = {
  t: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  notification:  PropTypes.shape({
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
      originator: PropTypes.shape({
          id: PropTypes.number.isRequired,
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired
      }),
      user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          avatar: PropTypes.string,
          username: PropTypes.string.isRequired
      })
  }),
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
        id: PropTypes.number.isRequired,
        link: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        read: PropTypes.bool.isRequired,
        originator: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        }),
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        })
    })
  )
};

export default NotificationMobile;
