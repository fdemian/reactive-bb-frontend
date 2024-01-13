import { Badge, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ChatType } from '../../navbarTypes';
import './Messages.css';

type MessagesHeaderProps = {
    t: (key: string) => string;
    messages: ChatType[];
    enabled: boolean;
};

const bellIconStyle = { marginTop: '23px' };

const MessagesHeader = ({ t, messages, enabled }: MessagesHeaderProps) => {
    if (enabled) {
        return (
            <span className="message-icon-header header-enabled">
                <Badge
                    count={
                        messages.filter(
                            (n: ChatType) => n['read'] !== undefined && !n.read
                        ).length
                    }
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

export default MessagesHeader;
