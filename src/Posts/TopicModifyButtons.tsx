import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLock } from '@fortawesome/free-solid-svg-icons';
import { TopicModifyButtonsProps } from './postTypes';
import './Posts.css';

const TopicModifyButtons = (props: TopicModifyButtonsProps) => {
  const { closed, reopenTopic, closeTopic, deleteTopic, userType, t } = props;

  if (userType === 'U') return null;

  return (
    <>
      {closed ? (
        <Button
          className="reopen-topic-button"
          role="button"
          aria-label="reopen-topic"
          key="closeTopicButton"
          type="primary"
          size="large"
          onClick={() => { reopenTopic(); }}
          style={{ marginLeft: 15 }}
        >
          <FontAwesomeIcon icon={faLock} />
          &nbsp; {t('posts.mod.reopenTopic')}
        </Button>
      ) : (
        <Button
          danger
          className="close-topic-button"
          role="button"
          aria-label="close-topic"
          key="closeTopicButton"
          type="primary"
          size="large"
          onClick={() => { closeTopic(); }}
          style={{ marginLeft: 15 }}
        >
          <FontAwesomeIcon icon={faTimes} />
          &nbsp; {t('posts.mod.closeTopic')}
        </Button>
      )}
      <Button
        danger
        className="delete-topic-button"
        role="button"
        aria-label="delete-topic"
        key="deleteTopicButton"
        type="primary"
        size="large"
        onClick={() => { deleteTopic(); }}
        style={{ marginLeft: 15 }}
      >
        <FontAwesomeIcon icon={faTimes} />
        &nbsp; {t('posts.mod.deleteTopic')}
      </Button>
    </>
  );
};

export default TopicModifyButtons;
