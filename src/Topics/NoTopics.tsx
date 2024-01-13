import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserId } from '../Login/authUtils';

type NoTopicProps = { t: (key: string) => string };

const NoTopics = ({ t }: NoTopicProps) => {
  const loggedIn = getUserId() !== null;
  return (
    <Result
      status="info"
      title={t('noTopics')}
      extra={
        loggedIn ? (
          <Link to="/topics/new">
            <Button type="primary" size="large">
              Create new topic &nbsp;
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Link>
        ) : null
      }
    />
  );
};

export default NoTopics;
