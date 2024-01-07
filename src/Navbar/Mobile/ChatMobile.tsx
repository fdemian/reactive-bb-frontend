type ChatType = {
    id: number;
    avatar: string;
    username: string;
};

type ChatMobileProps = {
  t: (key: string) => string;
  chat: ChatType;
}

const ChatMobile = ({ t, chat }: ChatMobileProps) => {
    return <div>{`${t("chatWith")} ${chat.username}`}</div>;
};

export default ChatMobile;
