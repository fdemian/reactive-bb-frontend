import { Link } from 'react-router-dom';
import UserAvatar from '../../../UserAvatar/UserAvatar';

type MessageProps = {
  message: {
    id: number;
    avatar: string;
    username: string;
  };
};

const Message = ({ message }: MessageProps) => {
  const { avatar, id, username } = message;

  return (
    <div style={{ padding: '10px' }}>
      <Link to={`/messages?user=${id}`}>
        <UserAvatar
          avatar={avatar}
          username={username}
          size={30}
          shape="square"
        />
        &nbsp; {`Chat with ${username}`}
      </Link>
    </div>
  );
};

export default Message;
