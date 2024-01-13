import { useState } from 'react';
import { Menu } from 'antd';
import UserPosts from './UserPosts';
import UserTopics from './UserTopics';
import UserLikes from './UserLikes';
import { UserType } from './userTypes';
import './User.css';

interface UserProfileProps {
  id: number;
  user: UserType;
}

const UserProfileMenu = ({ id, user }: UserProfileProps) => {
  const menuMap = [
    {
      key: 'topics',
      label: 'Topics',
      name: 'Topics',
      component: <UserTopics id={id} user={user} />,
    },
    {
      key: 'posts',
      label: 'Posts',
      name: 'Posts',
      component: <UserPosts id={id} user={user} />,
    },
    {
      key: 'likes',
      label: 'Likes',
      name: 'Likes',
      component: <UserLikes id={id} user={user} />,
    },
  ];
  const [selectIndex, setSelectIndex] = useState(0);

  const setKey = ({ key }: { key: string }) => {
    const index = menuMap.findIndex((s) => s.key === key);
    setSelectIndex(index);
  };

  const menuItem = menuMap[selectIndex];
  const title = menuItem.name;
  const selectKey = menuItem.key;
  const childComponent = menuItem.component;

  if (!user) return null;

  return (
    <div className="info-main">
      <div className="leftmenu">
        <Menu
          mode="inline"
          items={menuMap}
          selectedKeys={[selectKey]}
          onClick={setKey}
        />
      </div>
      <div className="right">
        <div className="title">{`${title} by ${user.username}`}</div>
        {childComponent}
      </div>
    </div>
  );
};

export default UserProfileMenu;
