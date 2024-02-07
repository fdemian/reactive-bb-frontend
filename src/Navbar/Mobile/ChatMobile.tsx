interface ChatType {
    id: number;
    avatar?: string | null | undefined;
    username: string;
}

interface ChatMobileProps {
  t: (key: string) => string;
  chat: ChatType;
}

const ChatMobile = ({ t, chat }: ChatMobileProps) => {
  return <div>{`${t('chatWith')} ${chat.username}`}</div>;
};

export default ChatMobile;
