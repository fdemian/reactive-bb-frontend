import PropTypes from 'prop-types';
import { useState } from 'react';
import { Menu } from 'antd';
//import { useTranslation } from 'react-i18next';
import UserPosts from './UserPosts';
import UserTopics from './UserTopics';
import UserLikes from './UserLikes';
import './User.css';

const UserProfileMenu = ({ id, user }) => {

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

    const setKey = ({ key }) => {
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
                <Menu mode="inline" items={menuMap} selectedKeys={[selectKey]} onClick={setKey} />
            </div>
            <div className="right">
                <div className="title">{`${title} by ${user.username}`}</div>
                {childComponent}
            </div>
        </div>
    );
};

UserProfileMenu.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        about: PropTypes.string.isRequired,
        banned: PropTypes.bool.isRequired
    })
};

export default UserProfileMenu;
