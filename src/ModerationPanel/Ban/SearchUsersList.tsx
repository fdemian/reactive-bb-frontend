import AccountAvatar from '../../UserAvatar/UserAvatar';
import { List, Button } from 'antd';
import { getLockoutTimeStr } from './utils';
import { SearchUserListProps, MentionTypeUser } from '../moderationPanelTypes';

const SearchUsersList = ({
  users,
  setScreenType,
  setUserToBan,
  t,
}: SearchUserListProps) => {

  const changeToBanScreen = (user: MentionTypeUser) => {
    setScreenType(user.banned ? 'removeban' : 'ban');
    setUserToBan(user);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              danger
              type="primary"
              key="ban-user-btn"
              onClick={() => { changeToBanScreen(user); }}
            >
              {user.banned ? t('reviewBan') : t('banUser')}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <AccountAvatar
                avatar={user.avatar}
                username={user.username}
                size={5}
                shape="circle"
              />
            }
            title={<strong>{user.username}</strong>}
            description={
              user.banned
                ? getLockoutTimeStr(user.banExpires!, t)
                : t('notBanned')
            }
          />
        </List.Item>
      )}
    />
  );
};

export default SearchUsersList;
