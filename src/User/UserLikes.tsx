import { GET_LIKES_BY_USER } from './Queries';
import Loading from '../Loading/LoadingIndicator';
import Avatar from '../UserAvatar/UserAvatar';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import Renderer from '../Editor/Renderer';
import { UserType, LikeType } from './userTypes';
import { useQuery } from '@apollo/client';

interface UserLikesProps {
  id: number;
  user: UserType;
}

const UserLikes = ({ id, user }: UserLikesProps) => {
  const { loading, error, data } = useQuery(GET_LIKES_BY_USER, {
    variables: { id: id },
  });

  if (error) return <p>Error</p>;

  if (loading || !data) return <Loading />;

  const likes = data.likesByUser;

  return (
    <List
      itemLayout="vertical"
      size="large"
      data-testid="user-likes"
      dataSource={likes ?? []}
      renderItem={(item: LikeType) => (
        <List.Item id={`post-${item.id}`} key={item.id}>
          <List.Item.Meta
            avatar={
              <Avatar
                avatar={user.avatar}
                username={user.username}
                shape="square"
                size={60}
              />
            }
            title={
              <Link to={`/posts/${item.post.id}/${item.post.topicId}`}>
                <span className="user-name">{user.username}</span>
              </Link>
            }
          />
          <Renderer content={item.post.content} />
        </List.Item>
      )}
    />
  );
};

export default UserLikes;
