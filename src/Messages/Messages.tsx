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
    const userId = getUserId();
    const [sendPm] = useMutation(SEND_PM);
    const { t } = useTranslation('chats', { keyPrefix: 'chats' });

    const sendMessage = (user: number, newchat: boolean) => {
        const editor: any = containerRef.current;
        const message = editor.getContent();
        sendPm({
            variables: {
                author: userId,
                recipient: user,
                message: message,
                newchat: newchat,
            },
        });
        editor.clear();
    };

    const clearMessage = () => {
        const editor: any = containerRef.current;
        editor.clear();
    };

    const { data, loading, error } = useQuery(GET_ALL_CHATS, {
        variables: {
            user: userId,
        },
        pollInterval: 500,
    });

    if (loading) return <Spin />;

    if (error) return <p>Error</p>;

    const { chatsByUser } = data;

    if (chatsByUser.length === 0)
        return (
            <NoMessages
                userId={userId ?? 0}
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
            userId={userId ?? 0}
            t={t}
        />
    );
};
