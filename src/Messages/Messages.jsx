import { useRef } from 'react';
import { Spin } from 'antd';
import NoMessages from './NoMessages';
import ChatsList from './ChatsList';
import { getUserId } from '../Login/authUtils';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_ALL_CHATS } from './Queries';
import { SEND_PM } from './Mutations';
import './Messages.css';

export const Component = () => {
    const containerRef = useRef(null);
    const userId = parseInt(getUserId(), 10);
    const [sendPm] = useMutation(SEND_PM);
    const { t } = useTranslation('chats', { keyPrefix: 'chats' });

    const sendMessage = (user, newchat) => {
        const message = containerRef.current.getContent();
        sendPm({
            variables: {
                author: userId,
                recipient: user,
                message: message,
                newchat: newchat
            }
        });
        containerRef.current.clear();
    };

    const clearMessage = () => containerRef.current.clear();

    const { data, loading, error } = useQuery(GET_ALL_CHATS, {
        variables: {
            user: userId
        },
        pollInterval: 500
    });

    if (loading) return <Spin />;

    if (error) return <p>Error</p>;

    const { chatsByUser } = data;

    if (chatsByUser.length === 0)
        return (
            <NoMessages
                userId={userId}
                sendMessage={sendMessage}
                containerRef={containerRef}
                t={t}
            />
        );

    return (
        <ChatsList
            containerRef={containerRef}
            sendMessage={sendMessage}
            clearMessage={clearMessage}
            users={chatsByUser}
            userId={userId}
            t={t}
        />
    );
};
