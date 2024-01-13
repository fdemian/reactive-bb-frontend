import Badge from 'antd/lib/badge';
import Tooltip from 'antd/lib/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { NotificationType } from '../../navbarTypes';
import './Notifications.css';

type NotificationsHeaderParams = {
    notifications: NotificationType[];
    enabled: boolean;
};

const NotificationsHeader = ({
    notifications,
    enabled,
}: NotificationsHeaderParams) => {
    if (enabled) {
        return (
            <span className="notifications-icon-header header-enabled">
                <Badge
                    count={notifications.length}
                    offset={[0, -4]}
                    size="small"
                >
                    <FontAwesomeIcon
                        className="bell-icon-notification"
                        icon={faBell}
                        size="2x"
                        color="rgba(0,0,0,.65)"
                    />
                </Badge>
            </span>
        );
    } else {
        return (
            <span className="notifications-icon-header header-disabled">
                <Tooltip title="Notifications disabled" placement="bottom">
                    <FontAwesomeIcon
                        className="bell-icon-notification"
                        icon={faBellSlash}
                        size="lg"
                        color="rgba(0,0,0,.65)"
                    />
                </Tooltip>
            </span>
        );
    }
};

export default NotificationsHeader;
