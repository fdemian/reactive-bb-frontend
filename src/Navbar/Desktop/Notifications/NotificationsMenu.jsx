import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Dropdown } from 'antd';
import NotificationsHeader from './NotificationsMenuHeader';
import Notification from './Notification';
import { Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faEye, faInbox } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NotificationsMenu = (props) => {
    const { notifications, newSubscription, markAsRead, enabled, t } = props;

    const dismissNotifications = () => {
        const notificationIds = notifications.map((n) => n.id);
        markAsRead({
            variables: {
                notifications: notificationIds,
            },
            optimisticResponse: {
                markAsRead: [],
            },
        });
    };

    useEffect(() => {
        newSubscription();
    }, [newSubscription]);

    const notificationItems = notifications.map((n, index) => ({
        label: (
            <Notification
                t={t}
                notifications={notifications}
                notification={n}
                markAsRead={markAsRead}
            />
        ),
        key: 'notifications-' + index,
        disabled: false,
    }));

    const notificationActions = [
        {
            label: (
                <span onClick={dismissNotifications}>
          <FontAwesomeIcon icon={faArrowsRotate} />
                    &nbsp; {t('markAllNotificationsRead')}
        </span>
            ),
            key: 'mark-notifications-read',
            disabled: notifications.length === 0,
        },
        {
            label: (
                <Link to="/notifications" className="notifications-link">
                    <FontAwesomeIcon icon={faEye} />
                    &nbsp; {t('seeAllNotifications')}
                </Link>
            ),
            key: 'see-all-notifications',
            disabled: false,
        },
    ];

    const displayItems =
        notifications.length === 0
            ? [
                {
                    label: (
                        <Empty
                            image={<FontAwesomeIcon icon={faInbox} />}
                            imageStyle={{
                                height: 40,
                            }}
                            description={t('noNotifications')}
                        />
                    ),
                    key: 'no-notifications',
                    disabled: true,
                },
            ]
            : notificationItems;
    const items = displayItems.concat(notificationActions);

    return (
        <Dropdown
            overlayClassName="notifications-dropdown"
            menu={enabled ? { items } : []}
            placement="bottom"
        >
      <span>
        <NotificationsHeader notifications={notifications} enabled={enabled} />
      </span>
        </Dropdown>
    );
};

NotificationsMenu.propTypes = {
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
    newSubscription: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default NotificationsMenu;
