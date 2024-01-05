import PropTypes from 'prop-types';
import Badge from 'antd/lib/badge';
import Tooltip from 'antd/lib/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import './Notifications.css';

const NotificationsHeader = ({ notifications, enabled }) => {
    if (enabled) {
        return (
            <span className="notifications-icon-header header-enabled">
        <Badge count={notifications.length} offset={[0, -4]} size="small">
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


NotificationsHeader.propTypes = {
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
    enabled: PropTypes.bool.isRequired
};

export default NotificationsHeader;
