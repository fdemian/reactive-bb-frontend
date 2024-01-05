import PropTypes from 'prop-types';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserId } from '../Login/authUtils';

const NoTopics = ({ t }) => {
    const loggedIn = getUserId() !== null;
    return (
        <Result
            status="info"
            title={t('noTopics')}
            extra={
                loggedIn ? (
                    <Link to="/topics/new">
                        <Button type="primary" size="big">
                            Create new topic &nbsp;
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </Link>
                ) : null
            }
        />
    );
};

NoTopics.propTypes = {
    t: PropTypes.func.isRequired
};

export default NoTopics;