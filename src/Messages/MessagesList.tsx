import { useEffect } from 'react';
import { GET_CHAT, CHATS_SUBSCRIPTION } from './Queries';
import { useQuery } from '@apollo/client/react';
import { List, Tooltip, Spin } from 'antd';
import { Link } from 'react-router-dom';
import UserAvatar from '../UserAvatar/UserAvatar';
import Renderer from '../Editor/Renderer';
import { formatDistance, format, parseISO } from 'date-fns';
import './Messages.css';

const getDate = (date: Date) => format(new Date(date), 'MMM d yyyy h:mm');
const getDateRelative = (date: string) =>
  formatDistance(parseISO(date), new Date(), { addSuffix: true });

interface ChatMessageType {
  __typename?: 'ChatMessage' | undefined;
  date: any;
  content: any;
  author: {
    __typename?: 'User' | undefined;
    id: number;
    avatar?: string | null | undefined;
    username: string;
  };
  recipient: {
    __typename?: 'User' | undefined;
    id: number;
    avatar?: string | null | undefined;
    username: string;
  };
}

const MessagesList = ({
  currentUser,
  otherUser,
}: {
  currentUser: number;
  otherUser: number;
}) => {
  const { data, loading, error, subscribeToMore } = useQuery(GET_CHAT, {
    variables: {
      userA: currentUser,
      userB: otherUser,
      limit: 400,
      offset: 0,
    },
  });

  const newSubscription = () =>
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      variables: {
        userA: currentUser,
        userB: otherUser,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const prevChats: ChatMessageType[] =
          prev.chat !== undefined && prev.chat !== null ? prev.chat : [];

        if (
          subscriptionData.data.chatAdded === null ||
          subscriptionData.data.chatAdded === undefined
        ) {
          return prev;
        }

        const newChatItem: ChatMessageType = subscriptionData.data.chatAdded;

        return {
          chat: [...prevChats, newChatItem],
        };
      },
    });

  useEffect(() => {
    newSubscription();
  });

  if (error) return <p>Error</p>;

  if (loading || !data) return <Spin />;

  let { chat } = data;

  return (
    <List
      className="comment-list"
      itemLayout="vertical"
      dataSource={chat ?? []}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Link to={`/users/${item.author.id}/${item.author.username}`}>
                <UserAvatar
                  avatar={item.author.avatar}
                  username={item.author.username}
                  shape="square"
                  size={60}
                />
              </Link>
            }
            title={
              <>
                <Link to={`/users/${item.author.id}/${item.author.username}`}>
                  <span className="chat-username">{item.author.username}</span>
                </Link>
              </>
            }
            description={
              <span className="chat-post-date">
                <Tooltip title={getDate(item.date)}>
                  {getDateRelative(item.date.toISOString())}
                </Tooltip>
              </span>
            }
          />
          <Renderer content={JSON.stringify(item.content)} />
        </List.Item>
      )}
    />
  );
};

export default MessagesList;
