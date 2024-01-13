import { Avatar } from 'antd';

type AvatarSizeType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type AccountAvatarTypes = {
  avatar: string;
  username: string;
  size: number | AvatarSizeType | 'large' | 'small' | 'default';
  shape: 'circle' | 'square' | undefined;
};

const AccountAvatar = ({
  avatar,
  username,
  size,
  shape,
}: AccountAvatarTypes) => {
  if (avatar === null || avatar === undefined)
    return (
      <Avatar
        shape={shape === undefined ? 'circle' : shape}
        size={size}
        className="Avatar"
        aria-label={`Avatar of ${username}`}
      >
        {username[0]}
      </Avatar>
    );

  return (
    <Avatar
      shape={shape === undefined ? 'circle' : shape}
      size={size}
      className="Avatar"
      aria-label={`Avatar of ${username}`}
      src={`/static/avatars/${avatar}`}
      alt={`Avatar of ${username}`}
    />
  );
};

export default AccountAvatar;
