import { Button } from 'antd';
import Editor from '../Editor/Editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faShare } from '@fortawesome/free-solid-svg-icons';
import './Messages.css';
import { getIsMobile } from '../App/utils';
import { CalliopeContainerType } from 'kalliope';
import { MentionType } from '../Editor/editorTypes';

interface MessagesEditorProps {
  initialState: string | undefined;
  selectedUser: number;
  sendMessage: (user: number, p: boolean) => void;
  clearMessage: () => void;
  containerRef: { current: CalliopeContainerType | null };
  t: (key: string) => string;
}

const emptyFn = (m: MentionType[]) => { console.log(m); };

const MessagesEditor = ({
  initialState,
  selectedUser,
  sendMessage,
  clearMessage,
  containerRef,
  t,
}: MessagesEditorProps) => {
  const isMobile = getIsMobile();
  return (
    <div className="messages-editor">
      <Editor
        containerRef={containerRef}
        setMentions={emptyFn}
        mentions={[]}
        user={null}
        initialState={initialState}
        isMobile={isMobile}
      />
      <span className="button-group">
        <Button
          aria-label={t('clear')}
          className="chats-clear-button"
          onClick={clearMessage}
        >
          {t('clear')} &nbsp;
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button
          aria-label={t('send')}
          className="chats-send-button"
          type="primary"
          onClick={() => {
            sendMessage(selectedUser, false);
          }}
        >
          {t('send')} &nbsp;
          <FontAwesomeIcon icon={faShare} />
        </Button>
      </span>
    </div>
  );
};

export default MessagesEditor;
