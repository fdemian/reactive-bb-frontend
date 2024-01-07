import { useEffect } from 'react';
import { Dropdown } from 'antd';
import NotificationsHeader from './NotificationsMenuHeader';
import Notification from './Notification';
import { NotificationType } from '../../navbarTypes';
import { Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faEye, faInbox } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


type MarkReadParams = {
    variables: {
        notifications: number[],
    };
    optimisticResponse: {
        markAsRead: NotificationType[],
    };
};

type NotificationProps = {
    notifications: NotificationType[];
    enabled: boolean;
    markAsRead: (p: MarkReadParams) => void;
    newSubscription: () => void;
    t: (key:string) => string;
};

const NotificationsMenu = (props: NotificationProps) => {
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
            menu={enabled ? { items } : {}}
            placement="bottom"
        >
      <span>
        <NotificationsHeader notifications={notifications} enabled={enabled} />
      </span>
        </Dropdown>
    );
};

export default NotificationsMenu;
