import { useMutation } from '@apollo/client';
import { GET_TOPICS, PIN_TOPIC } from './Queries';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { TopicType } from './topicTypes';
import './Topics.css';

type PinTopicParams = { topic: TopicType };

const PinTopic = ({ topic }: PinTopicParams) => {
  const [pinTopicMut] = useMutation(PIN_TOPIC);

  const pinTopic = (id: number) =>
    pinTopicMut({
      variables: {
        topic: id,
      },
      refetchQueries: [GET_TOPICS, 'GetTopics'],
    });

  return (
    <span className="topic-pin-btn" onClick={() => pinTopic(topic.id)}>
      <Tooltip
        placement="left"
        title={topic.pinned ? 'Unpin topic' : 'Pin topic'}
      >
        <FontAwesomeIcon
          icon={faThumbtack}
          size="2x"
          color={topic.pinned ? 'black' : 'gainsboro'}
          transform={topic.pinned ? '' : 'rotate-270'}
        />
        &nbsp;
      </Tooltip>
    </span>
  );
};

export default PinTopic;
