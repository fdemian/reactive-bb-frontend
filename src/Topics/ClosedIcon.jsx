import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './Topics.css';

const ClosedIcon = ({ closed }) => {
    if (!closed) return null;

    return (
    <span className="closed-topic-icon">
      <Tooltip placement="right" title="Topic closed">
        <FontAwesomeIcon icon={faLock} size="2x" color="gainsboro" />
      </Tooltip>
    </span>
    );
};

ClosedIcon.propTypes = {
    closed: PropTypes.bool
};

export default ClosedIcon;