import { Link } from 'react-router-dom';
import UserAvatar from '../../../UserAvatar/UserAvatar';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
    const { avatar, id, username } = message;

    return (
        <div style={{ padding: '10px' }}>
            <Link to={`/messages?user=${id}`}>
                <UserAvatar avatar={avatar} username={username} size={30} shape="square" />
                &nbsp; {`Chat with ${username}`}
            </Link>
        </div>
    );
};


Message.propTypes = {
  message: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      username:PropTypes.string.isRequired
  })
};

export default Message;
