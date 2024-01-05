import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Topics.css'

const PinnedIndicator = ({ topic }) => {

    return (
    <span className="topic-pin-btn">
        <Tooltip
            placement="left"
            title={topic.pinned ? "Unpin topic": "Pin topic"}
        >
          <FontAwesomeIcon
              icon={faThumbtack}
              size="2x"
              color={topic.pinned ? "black" : "gainsboro"}
              transform={topic.pinned ? "" : "rotate-270"}
          />
            &nbsp;
        </Tooltip>
    </span>
    );
}

PinnedIndicator.propTypes = {
    topic: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        views: PropTypes.number.isRequired,
        replies: PropTypes.number.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        closed: PropTypes.bool.isRequired,
        pinned: PropTypes.bool.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
        }),
        category: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired
        })
    })
}

export default PinnedIndicator;