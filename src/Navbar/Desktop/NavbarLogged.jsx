import { lazy, Suspense } from "react";
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import '../Navbar.css';

const AccountMenu = lazy(() => import('./AccountMenu/AccountMenu'));
const Notifications = lazy(() => import('./Notifications/NotificationsMenu'));
const Messages = lazy(() => import('./Messages/MessagesMenu'));

const NavbarLogged = (props) => {

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
       return <Spin role="loading" aria-busy={true} data-testid="loading-spinner" />;

    return (
    <>
        <span aria-label={t('notifications')} className="account-nav-items" role="button">
          <Notifications
              notifications={notifications}
              newSubscription={newSubscription}
              markAsRead={markAsRead}
              enabled={true}
              userId={user.id}
              t={t}
          />
        </span>
        <Suspense fallback={<Spin />}>
          <span role="button" className="account-nav-items" aria-label={t('messages')}>
            <Messages
                chatSubscription={chatSubscription}
                markRead={() => console.log('MARK READ!')}
                messages={chats}
                enabled={true}
                t={t}
            />
          </span>
        </Suspense>
        <Suspense fallback={<Spin />}>
            <span role="button" className="account-nav-items" aria-label={user[0]}>
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
}

NavbarLogged.propTypes = {
    loading: PropTypes.bool.isRequired,
    userType: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        type: PropTypes.string.isRequired,
        banned: PropTypes.bool.isRequired,
        banReason: PropTypes.string
    }),
    chats: PropTypes.shape({
      data: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }),
      loading: PropTypes.bool.isRequired,
      error: PropTypes.bool
    }),
    chatSubscription: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            link: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            originator: PropTypes.shape({
                id: PropTypes.number.isRequired,
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired
            }),
            user: PropTypes.shape({
                id: PropTypes.number.isRequired,
                avatar: PropTypes.string,
                username: PropTypes.string.isRequired
            })
        })
    ),
    newSubscription: PropTypes.func.isRequired,
    logoutFn: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default NavbarLogged;