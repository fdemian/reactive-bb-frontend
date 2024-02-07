import { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { NavbarLoggedProps } from '../navbarTypes';
import '../Navbar.css';

const AccountMenu = lazy(() => import('./AccountMenu/AccountMenu'));
const Notifications = lazy(() => import('./Notifications/NotificationsMenu'));
const Messages = lazy(() => import('./Messages/MessagesMenu'));

const NavbarLogged = (props: NavbarLoggedProps) => {
  const {
    loading,
    userType,
    user,
    chats,
    chatSubscription,
    notifications,
    newSubscription,
    logoutFn,
    markAsRead,
    t,
  } = props;

  if (loading || !user)
    return <Spin aria-busy={true} data-testid="loading-spinner" />;

  return (
    <>
      <span
        aria-label={t('notifications')}
        className="account-nav-items"
        role="button"
      >
        <Notifications
          notifications={notifications!}
          newSubscription={newSubscription}
          markAsRead={markAsRead}
          enabled={true}
          t={t}
        />
      </span>
      <Suspense fallback={<Spin />}>
        <span
          role="button"
          className="account-nav-items"
          aria-label={t('messages')}
        >
          <Messages
            chatSubscription={chatSubscription}
            messages={chats!}
            enabled={true}
            t={t}
          />
        </span>
      </Suspense>
      <Suspense fallback={<Spin />}>
        <span
          role="button"
          className="account-nav-items"
          aria-label={user.username[0]}
        >
          <AccountMenu
            userType={userType}
            user={user}
            logoutFn={logoutFn}
            data-testid="username-test"
            t={t}
          />
        </span>
      </Suspense>
    </>
  );
};

export default NavbarLogged;
