import PropTypes from 'prop-types';

const ChatMobile = ({ t, chat }) => {
    return <div>{`${t("chatWith")} ${chat.username}`}</div>;
};

ChatMobile.propTypes = {
    chat: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    }),
    t: PropTypes.func.isRequired
};

export default ChatMobile;
