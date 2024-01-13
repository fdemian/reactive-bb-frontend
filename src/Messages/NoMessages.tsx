import { useState } from 'react';
import { Button, Empty } from 'antd';
import CreateMessage from './CreateMessage';
import './Messages.css';

interface NoMessageProps {
  userId: number;
  sendMessage: (user: number, p: boolean) => void;
  containerRef: any;
  t: (key: string) => string;
}

const NoMessages = ({ sendMessage, containerRef, t }: NoMessageProps) => {
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
          sendMessage={sendMessage}
          containerRef={containerRef}
          t={t}
        />
      ) : (
        <Button
          aria-label={t('startConversation')}
          className="messages-create-conversation"
          type="primary"
          onClick={() => { setConverstationVisible(true); }}
        >
          {t('startConversation')}
        </Button>
      )}
    </>
  );
};

export default NoMessages;
