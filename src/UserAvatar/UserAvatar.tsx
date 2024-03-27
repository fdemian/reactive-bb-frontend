import { Avatar } from 'antd';

interface AvatarSizeType {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface AccountAvatarTypes {
  avatar: string | null | undefined;
  username: string;
  size: number | AvatarSizeType | 'large' | 'small' | 'default';
  shape: 'circle' | 'square' | undefined;
}

const AccountAvatar = ({
  avatar,
  username,
  size,
  shape,
}: AccountAvatarTypes) => {
  if (avatar === null || avatar === undefined || avatar.trim() === '')
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
