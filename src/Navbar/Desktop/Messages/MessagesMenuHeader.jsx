import PropTypes from "prop-types";
import { Badge, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Messages.css';

const bellIconStyle = { marginTop: '23px' };

const MessagesHeader = ({ t, messages, enabled }) => {
    if (enabled) {
        return (
            <span className="message-icon-header header-enabled">
        <Badge
            count={messages.filter((n) => n['read'] !== undefined && !n.read).length}
            offset={[0, 9]}
            size="small"
        >
          <FontAwesomeIcon
              icon={faEnvelope}
              size="2x"
              style={bellIconStyle}
              color="rgba(0,0,0,.65)"
          />
        </Badge>
      </span>
        );
    } else {
        return (
            <span className="message-icon-header header-disabled">
        <Tooltip title={t('messagingDisabled')} placement="bottom">
          <Badge count={0} offset={[0, 9]} size="small">
            <FontAwesomeIcon
                icon={faEnvelope}
                style={bellIconStyle}
                size="2x"
                color="rgba(0,0,0,.65)"
            />
          </Badge>
        </Tooltip>
      </span>
        );
    }
};

MessagesHeader.propTypes = {
    t: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    enabled: PropTypes.bool.isRequired
}

export default MessagesHeader;
