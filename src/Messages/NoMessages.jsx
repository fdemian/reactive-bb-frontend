import PropTypes from "prop-types";
import { useState } from 'react';
import { Button, Empty } from 'antd';
import CreateMessage from './CreateMessage';
import './Messages.css';

const NoMessages = ({ userId, sendMessage, containerRef, t }) => {
    const [converstationVisible, setConverstationVisible] = useState(false);
    return (
        <>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
                description={<h2>{t('noMessages')}</h2>}
            />
            {converstationVisible ? (
                <CreateMessage
                    userId={userId}
                    sendMessage={sendMessage}
                    containerRef={containerRef}
                    t={t}
                />
            ) : (
                <Button
                    aria-label={t('startConversation')}
                    className="messages-create-conversation"
                    type="primary"
                    onClick={() => setConverstationVisible(true)}
                >
                    {t('startConversation')}
                </Button>
            )}
        </>
    );
};

NoMessages.propTypes = {
    userId: PropTypes.number.isRequired,
    sendMessage: PropTypes.func.isRequired,
    containerRef: PropTypes.shape({
        current: PropTypes.shape({
            executeCommand: PropTypes.func.isRequired
        })
    }),
    t: PropTypes.func.isRequired
};

export default NoMessages;