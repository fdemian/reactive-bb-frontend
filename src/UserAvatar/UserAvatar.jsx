import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const AccountAvatar = ({ avatar, username, size, shape }) => {
    if (avatar === null || avatar === undefined)
        return (
            <Avatar
                shape={shape === undefined ? 'circle' : shape}
                size={size}
                role="img"
                className="Avatar"
                aria-label={`Avatar of ${username}`}
            >
                {username[0]}
            </Avatar>
        );

    return (
        <Avatar
            shape={shape === undefined ? 'circle' : shape}
            type="circle"
            size={size}
            className="Avatar"
            role="img"
            aria-label={`Avatar of ${username}`}
            src={`/static/avatars/${avatar}`}
            alt={`Avatar of ${username}`}
        />
    );
};

AccountAvatar.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ 
            xs: PropTypes.number, 
            sm: PropTypes.number, 
            md: PropTypes.number, 
            lg: PropTypes.number, 
            xl: PropTypes.number, 
            xxl: PropTypes.number 
        })
    ]),
    shape: PropTypes.string
};

export default AccountAvatar;
