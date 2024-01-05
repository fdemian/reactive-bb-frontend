import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Dropdown, Spin } from 'antd';
import { Empty } from 'antd';
import Message from './Message';
import MeessageMenuHeader from './MessagesMenuHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MessagesMenu = ({ messages, chatSubscription, enabled, t }) => {
    useEffect(() => {
        chatSubscription();
    }, [chatSubscription]);

    const { data, loading, error } = messages;

    if (loading) return <Spin />;

    if (error) return <p>Error</p>;

    const messageActions = [
        {
            label: (
                <div>
                    <FontAwesomeIcon
                        icon={faArrowsRotate}
                        spin={messages.length > 0}
                    />
                    &nbsp; {t('dismissMessages')}
                </div>
            ),
            disabled: data.chatsByUser.length === 0,
            key: 'dismiss-messages',
        },
        {
            label: (
                <div>
                    <Link to="/messages" className="notifications-link">
                        <FontAwesomeIcon icon={faEye} />
                        &nbsp; {t('seeAllMessages')}
                    </Link>
                </div>
            ),
            key: 'see-all-messages',
        },
    ];
    const messageItems =
        data.chatsByUser.length === 0
            ? [
                {
                    label: <Empty description={t('noMessages')} />,
                    key: 'messages-empty',
                    disabled: true,
                },
            ]
            : data.chatsByUser.map((m, index) => ({
                label: <Message message={m} />,
                key: 'message-' + index,
                disabled: false,
            }));
    const items = messageItems.concat(messageActions);

    return (
        <Dropdown overlayClassName="messages-dropdown" menu={{ items }} placement="bottom">
      <span>
        <MeessageMenuHeader t={t} messages={data.chatsByUser} enabled={enabled} />
      </span>
        </Dropdown>
    );
};


MessagesMenu.propTypes = {
    chatSubscription: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
    messages: PropTypes.shape({
        data: PropTypes.arrayOf({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        }),
        loading: PropTypes.bool.isRequired,
        error: PropTypes.bool
    }),
    t: PropTypes.func.isRequired
};

export default MessagesMenu;
