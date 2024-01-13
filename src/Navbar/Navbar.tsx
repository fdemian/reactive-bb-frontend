import { lazy, useState, Suspense } from 'react';
import { getUserId, getUserType, clearUser } from '../Login/authUtils';
import { useQuery, useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import NavLogo from './NavLogo';
import { useTranslation } from 'react-i18next';
import { Row, Col, Card, Spin } from 'antd';
import {
    GET_USER,
    GET_NOTIFICATIONS,
    NOTIFICATIONS_SUBSCRIPTION,
    CHATS_SUBSCRIPTION,
    MARK_NOTIFICATIONS_READ,
} from './Queries';
import { GET_ALL_CHATS } from '../Messages/Queries';
import { GET_IS_LOGGED_IN, SET_LOGIN } from '../Login/queries';
import './Navbar.css';

// Desktop search bar component.
const SearchBar = lazy(() => import('./Desktop/SearchBarComponent'));

// Desktop nav.
const DesktopNavUnlogged = lazy(() => import('./Desktop/NavbarUnlogged'));
const DesktopNavLogged = lazy(() => import('./Desktop/NavbarLogged'));

// MobileNav
const MobileNavUnlogged = lazy(() => import('./Mobile/NavbarMobileUnlogged'));
const MobileNavLogged = lazy(() => import('./Mobile/NavbarMobileLogged'));

type NavbarProps = {
    mobile: boolean;
    name: string;
    logoURL: string;
    isLoading: boolean;
    isError: boolean;
};

const Navbar = ({ mobile, name, logoURL, isLoading, isError }: NavbarProps) => {
    const { t } = useTranslation('navbar', { keyPrefix: 'navbar' });
    const client = useApolloClient();
    const id = getUserId();
    const userType = getUserType();

    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const setSearchValue = (e: any) => setSearchText(e.target.value);
    const enterPress = () => {
        navigate('/search?term=' + searchText);
        setSearchText('');
    };

    const loginQuery = useQuery(GET_IS_LOGGED_IN);
    const isLoggedIn = loginQuery.data && loginQuery.data.loggedIn === true;
    const queryOpts = { variables: { id: id }, skip: !id };
    const { loading, error, data } = useQuery(GET_USER, queryOpts);
    const [markAsRead] = useMutation(MARK_NOTIFICATIONS_READ, {
        update(cache, { data: { markAsRead } }) {
            cache.modify({
                fields: {
                    notifications() {
                        return markAsRead;
                    },
                },
            });
        },
    });

    const logoutFn = async () => {
        clearUser();
        await client.resetStore();
        await client.writeQuery({
            query: SET_LOGIN,
            data: {
                loggedIn: false,
            },
            variables: {
                status: false,
            },
        });
        fetch('/logout', { method: 'POST' });
    };

    // Notifications query and subscriptions.
    const notificationsQuery = useQuery(GET_NOTIFICATIONS, {
        variables: { user: id },
        skip: !id,
    });
    const notifications = notificationsQuery.data
        ? notificationsQuery.data.notifications
        : [];
    const { subscribeToMore } = notificationsQuery;
    const newSubscription = () =>
        subscribeToMore({
            document: NOTIFICATIONS_SUBSCRIPTION,
            variables: { user: id },
            updateQuery: (prev, { subscriptionData }) => {
                if (
                    !subscriptionData.data ||
                    subscriptionData.data.notificationAdded === null
                )
                    return prev;
                const newNotification = subscriptionData.data.notificationAdded;
                return {
                    notifications: [...prev.notifications, newNotification],
                };
            },
        });

    //
    const chatsQuery = useQuery(GET_ALL_CHATS, {
        variables: {
            user: id,
        },
        skip: !id,
    });
    const chatsQuerySubscribe = chatsQuery.subscribeToMore;
    const newChatSubscription = () =>
        chatsQuerySubscribe({
            document: CHATS_SUBSCRIPTION,
            variables: { user: id },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data || !subscriptionData.data.chatAdded)
                    return prev;

                const newChat = subscriptionData.data.chatAdded;
                return {
                    notifications: [...prev.chat, newChat],
                };
            },
        });

    //
    if (error) {
        console.log('Error');
        //logoutFn();
    }

    const userResult = data && data.getUser ? data.getUser : null;
    const navbarProps = {
        userType: userType,
        name: name,
        notificationsEnabled: true,
        chats: chatsQuery,
        chatSubscription: newChatSubscription,
        notifications: notifications,
        newSubscription: newSubscription,
        logoutFn: logoutFn,
        loading: loading,
        user: userResult,
        isLoggedIn: isLoggedIn,
        markAsRead: markAsRead,
        t: t,
    };

    return (
        <nav role="navigation">
            <Card>
                <Row>
                    <Col span={6}>
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <NavLogo
                                mobile={mobile}
                                name={name}
                                logoURL={logoURL}
                            />
                        )}
                    </Col>
                    <Col span={6}>
                        {mobile && !isError ? (
                            <h1 className="forum-name-mobile">{name}</h1>
                        ) : null}
                        {!isLoading && !mobile && isLoggedIn && !isError && (
                            <Suspense fallback={<Spin />}>
                                <SearchBar
                                    searchText={searchText}
                                    t={t}
                                    setSearchValue={setSearchValue}
                                    enterPress={enterPress}
                                />
                            </Suspense>
                        )}
                    </Col>
                    <Col span={6}></Col>
                    <Col span={6}>
                        {isLoading || isError ? <Spin /> : null}
                        {mobile && !loading && !isError ? (
                            isLoggedIn ? (
                                <Suspense fallback={<Spin />}>
                                    <MobileNavLogged {...navbarProps} />
                                </Suspense>
                            ) : (
                                <Suspense fallback={<Spin />}>
                                    <MobileNavUnlogged {...navbarProps} />
                                </Suspense>
                            )
                        ) : isLoggedIn ? (
                            <Suspense fallback={<Spin />}>
                                <DesktopNavLogged {...navbarProps} />
                            </Suspense>
                        ) : (
                            <Suspense fallback={<Spin />}>
                                <DesktopNavUnlogged {...navbarProps} />
                            </Suspense>
                        )}
                    </Col>
                </Row>
            </Card>
        </nav>
    );
};

export default Navbar;
