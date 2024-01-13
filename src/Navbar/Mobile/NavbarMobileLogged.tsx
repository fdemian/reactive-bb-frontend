import { Suspense, lazy, useEffect, useState } from 'react';
import { Menu, Spin, Badge, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faArrowsRotate,
  faAddressCard,
  faCog,
  faSignOut,
  faBell,
  faBellSlash,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import NotificationMobile from './NotificationMobile';
import ChatMobile from './ChatMobile';
import { Link } from 'react-router-dom';
import { getItem } from './utils';
import '../Navbar.css';
import DrawerToggleButton from './DrawerToggleButton';
import { NavbarLoggedProps } from '../navbarTypes';

const AccountAvatar = lazy(() => import('../../UserAvatar/UserAvatar'));

const NavbarMobileLogged = (props: NavbarLoggedProps) => {
  const {
    user,
    notificationsEnabled,
    notifications,
    newSubscription,
    chats,
    chatSubscription,
    markAsRead,
    logoutFn,
    t,
  } = props;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const closeDrawer = () => setDrawerVisible(false);
  const openDrawer = () => setDrawerVisible(true);

  useEffect(() => {
    newSubscription();
    chatSubscription();
  }, [newSubscription, chatSubscription]);

  const logoutAction = () => {
    logoutFn();
    closeDrawer();
  };

  const dismissNotifications = () => {
    const notificationIds = notifications.map((n) => n.id);
    markAsRead({
      variables: {
        notifications: notificationIds,
      },
      optimisticResponse: {
        markAsRead: [],
      },
    });
  };

  if (!user || !chats.data) return <Spin />;

  const chatsDisabled = chats.data && chats.data.chatsByUser.length === 0;

  const items = user
    ? [
        getItem(
          <strong className="sidemenu-style-title">{t('user')}</strong>,
          'user',
          <FontAwesomeIcon icon={faUser} size="2x" />,
          [
            getItem(
              <Link to="/bookmarks" onClick={closeDrawer}>
                {t('bookmarks')}
              </Link>,
              'bookmarks',
              <FontAwesomeIcon
                icon={faAddressCard}
                className="MenuIcon"
                size="lg"
              />
            ),
            getItem(
              <Link
                to={`/users/${user.id}/${user.username}`}
                onClick={closeDrawer}
              >
                {t('profile')}
              </Link>,
              'profile',
              <FontAwesomeIcon icon={faUser} className="MenuIcon" size="lg" />
            ),
            getItem(
              <Link to="/settings" onClick={closeDrawer}>
                {t('settings')}
              </Link>,
              'settings',
              <FontAwesomeIcon icon={faCog} className="MenuIcon" size="lg" />
            ),
            getItem(
              <span onClick={logoutAction} className="logout-link">
                {t('logout')}
              </span>,
              'logout',
              <FontAwesomeIcon
                icon={faSignOut}
                className="MenuIcon"
                size="2x"
              />
            ),
          ]
        ),
        getItem(
          <>
            <strong>
              {t(
                notificationsEnabled ? 'notifications' : 'notificationsDisabled'
              )}
            </strong>
            &nbsp;
            <Badge
              offset={[10, -3]}
              className="notifications-count-badge"
              count={notifications.length}
            />
          </>,
          'notifications',
          <FontAwesomeIcon
            icon={notificationsEnabled ? faBell : faBellSlash}
            size="lg"
            color={notifications.length > 0 ? '1890ff' : 'gainsboro'}
          />,
          notifications
            .map((notification) =>
              getItem(
                <NotificationMobile
                  t={t}
                  markAsRead={markAsRead}
                  notification={notification}
                  notifications={notifications}
                />,
                `notification-${notification.id}`,
                <AccountAvatar
                  avatar={notification.user.avatar}
                  username={notification.user.username}
                  size={20}
                  shape="square"
                />
              )
            )
            .concat(
              getItem(
                <span
                  className="notification-title"
                  onClick={dismissNotifications}
                >
                  &nbsp; {t('markAllNotificationsRead')}
                </span>,
                'dismiss-notifications',
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size="lg"
                  color={notifications.length > 0 ? 'black' : 'gainsboro'}
                  spin={notifications.length > 9}
                />,
                undefined,
                notifications.length === 0
              )
            ),
          notifications.length === 0
        ),
        getItem(
          <>
            <strong>{t('chats')}</strong>
            <Badge
              count={
                chatsDisabled || !chats.data ? 0 : chats.data.chatsByUser.length
              }
            />
          </>,
          'chats',
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            color={chatsDisabled ? 'gainsboro' : '1890ff'}
          />,
          chats.data.chatsByUser.map((chat) =>
            getItem(
              <ChatMobile t={t} chat={chat} />,
              `chat-${chat.author.id}`,
              <AccountAvatar
                avatar={chat.author.avatar}
                username={chat.author.username}
                size={20}
                shape="square"
              />
            )
          ),
          chatsDisabled
        ),
      ]
    : [
        getItem(
          <Spin aria-busy={true} data-testid="loading-spinner" />,
          'loading',
          undefined
        ),
      ];

  return (
    <>
      <span className="mobile-drawer-toggle">
        <DrawerToggleButton
          t={t}
          openDrawer={openDrawer}
          isLoggedIn={true}
          showBadge={notifications.length > 0}
          user={user}
        />
      </span>
      <Drawer
        open={drawerVisible}
        placement="right"
        onClose={closeDrawer}
        className="drawer-navbar"
        title={
          <span onClick={openDrawer}>
            <AccountAvatar
              size={50}
              shape="square"
              avatar={user.avatar}
              username={user.username}
            />
            &nbsp;{' '}
            <strong className="username-drawer-title">{user.username}</strong>
          </span>
        }
      >
        <Suspense fallback={<Spin />}>
          <Menu
            onClick={undefined}
            defaultSelectedKeys={[]}
            defaultOpenKeys={[]}
            mode="inline"
            items={items}
          />
        </Suspense>
      </Drawer>
    </>
  );
};

export default NavbarMobileLogged;
