import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../UserAvatar/UserAvatar';

const translationKeys = {
    mention: 'mentionUser',
    like: 'likedPost',
};

const Notification = ({ t, notification, markAsRead, notifications }) => {
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
                size="20px"
                shape="square"
            />
            &nbsp; &nbsp;
            <strong>{notification.originator.username}</strong>
            &nbsp;
            {t(translationKeys[notification.type])}
        </div>
    );
};


Notification.propTypes = {
    notification: PropTypes.shape({
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
    ),
    markAsRead: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default Notification;
