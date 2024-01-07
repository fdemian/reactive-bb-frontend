import { Link } from 'react-router-dom';
import { Spin, Dropdown } from 'antd';
import AccountAvatar from '../../../UserAvatar/UserAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faUserPlus,
    faCog,
    faShield,
    faBookmark,
    faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { UserType } from '../../../User/userTypes';
import './AccountMenu.css';

type AccountMenuType = {
    userType: string;
    user: UserType;
    logoutFn: () => void;
    t: (key:string) => string;
};

const AccountMenu = ({ userType, user, logoutFn, t }:AccountMenuType) => {
    if (user === undefined) return <Spin />;

    const isMod = userType !== 'U';
    const isAdmin = userType === 'A';

    const menuItems = [
        {
            label: (
                <>
                    <AccountAvatar
                        avatar={user.avatar}
                        username={user.username}
                        shape="circle"
                        size="medium"
                    />
                    &nbsp;
                    <strong className="username-menu-text">{user.username}</strong>
                    <hr className="divider" />
                </>
            ),
            disabled: true,
            key: 'user'
        },
        {
            label: (
                <Link to={`/users/${user.id}/${user.username}`}>
                    <FontAwesomeIcon icon={faUser} className="MenuIcon" size="lg" />
                    &nbsp; {t('profile')}
                </Link>
            ),
            key: 'profile'
        },
        {
            label: (
                <Link to="/settings">
                    <FontAwesomeIcon icon={faCog} className="MenuIcon" size="lg" />
                    &nbsp; {t('settings')}
                </Link>
            ),
            disabled: user.banned,
            key: 'settings'
        },
        {
            label: (
                <Link to="/bookmarks">
                    <FontAwesomeIcon
                        icon={faBookmark}
                        className="MenuIcon"
                        size="lg"
                    />
                    &nbsp; {t('bookmarks')}
                </Link>
            ),
            key: 'bookmarks'
        }
    ];

    const modMenu = {
        label: (
            <Link to="/modcp">
                <FontAwesomeIcon
                    icon={faShield}
                    onClick={() => {}}
                    className="MenuIcon"
                    size="lg"
                />
                &nbsp;{t('modcp')}
            </Link>
        ),
        disabled: user.banned,
        key: 'modcp'
    };

    const adminMenu = {
        label: (
            <Link to="/admincp">
                <FontAwesomeIcon
                    icon={faUserPlus}
                    onClick={() => {}}
                    className="MenuIcon"
                    size="lg"
                />
                &nbsp;{t('admincp')}
            </Link>
        ),
        disabled: user.banned,
        key: 'admincp'
    };

    const logoutItem = {
        label: (
            <>
                <FontAwesomeIcon
                    icon={faSignOutAlt}
                    onClick={logoutFn}
                    className="MenuIcon"
                    size="lg"
                />
                &nbsp; {t('logout')}
            </>
        ),
        key: 'logout'
    };

    const adminModMenu = isMod && isAdmin ?
        [modMenu, adminMenu, logoutItem] :
        [modMenu, logoutItem];

    const items = isMod
        ? menuItems.concat(adminModMenu)
        : menuItems.concat(logoutItem);

    return (
    <Dropdown overlayClassName="account-menu" menu={{ items }} placement="bottom">
      <span className="UserMenuAvatar">
        <AccountAvatar
            avatar={user.avatar}
            username={user.username}
            size={60}
            shape="square"
        />
      </span>
    </Dropdown>
    );
};

export default AccountMenu;
