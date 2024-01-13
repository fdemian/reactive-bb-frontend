import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { TopicType } from './topicTypes';
import './Topics.css';

interface PinnedIndicatorProps { topic: TopicType }

const PinnedIndicator = ({ topic }: PinnedIndicatorProps) => {
  return (
    <span className="topic-pin-btn">
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

export default PinnedIndicator;
