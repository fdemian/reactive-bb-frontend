import { useState, useEffect } from 'react';
import { Menu, Divider, Button, Modal } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MessagesList from './MessagesList';
import UserAvatar from '../UserAvatar/UserAvatar';
import MessagesEditor from './MessagesEditor';
import CreateMessage from './CreateMessage';
import '../AccountSettings/Settings.css';
import './Messages.css';
import { UserType } from '../User/userTypes';

type MessagesEditorProps = {
    containerRef: any;
    sendMessage: (user: number, p: boolean) => void;
    clearMessage: () => void;
    users: UserType[];
    userId: number;
    t: (key: string) => string;
};

const ChatsList = (props: MessagesEditorProps) => {
    const { containerRef, sendMessage, clearMessage, users, userId, t } = props;

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsUser = searchParams.get('user');
    const initialSelectedUser =
        paramsUser !== null ? parseInt(paramsUser, 10) : users[0].id;
    const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);
    const sendAndCloseModal = (user: number, newchat: boolean) => {
        sendMessage(user, newchat);
        closeModal();
    };

    useEffect(() => {
        if (!paramsUser) {
            setSearchParams({ user: initialSelectedUser.toString() });
        }
    }, [paramsUser, setSearchParams, initialSelectedUser]);

    const items = users.map((u) => ({
        key: u.id,
        label: (
            <div onClick={() => setSelectedUser(u.id)}>
                <UserAvatar
                    size="large"
                    shape="square"
                    avatar={u.avatar}
                    username={u.username}
                />
                &nbsp; {u.username}
            </div>
        ),
    }));

    const onMenuItemSelect = ({ key }: { key: string }) => {
        setSearchParams({ user: key });
        setSelectedUser(parseInt(key, 10));
    };

    return (
        <>
            <Divider>
                <h1 className="chat-list-title">{t('title')}</h1>
            </Divider>
            <Button
                aria-label={t('newConversation')}
                onClick={openModal}
                type="primary"
            >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; {t('newConversation')}
            </Button>
            <div className="info-main">
                <div className="leftmenu">
                    <Menu
                        mode="inline"
                        selectedKeys={[selectedUser.toString()]}
                        items={items}
                        onSelect={onMenuItemSelect}
                    />
                </div>
                <div className="right">
                    <MessagesList
                        currentUser={userId}
                        otherUser={selectedUser}
                    />
                    <MessagesEditor
                        containerRef={containerRef}
                        selectedUser={selectedUser}
                        sendMessage={sendMessage}
                        clearMessage={clearMessage}
                        initialState={undefined}
                        t={t}
                    />
                </div>
            </div>
            <Modal
                data-testid="new-conversation-modal"
                centered
                width={1250}
                title={t('newConversation')}
                open={isModalOpen}
                footer={[
                    <Button key="close-modal-btn" onClick={closeModal}>
                        {t('close')}
                    </Button>,
                ]}
            >
                <CreateMessage
                    sendMessage={sendAndCloseModal}
                    containerRef={containerRef}
                    t={t}
                />
            </Modal>
        </>
    );
};

export default ChatsList;
