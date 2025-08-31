import { Upload, Button } from 'antd';
import AccountAvatar from '../../../UserAvatar/UserAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faUpload } from '@fortawesome/free-solid-svg-icons';
import { UPLOAD_AVATAR, REMOVE_AVATAR } from '../../Mutations';
import { GET_PROFILE } from '../../Queries';
import { useMutation } from '@apollo/client/react';
import './ProfileView.css';

interface AvatarViewProps {
  id: number;
  avatar: string;
  username: string;
  t: (key: string) => string;
}

const uploadURL = '';

const AvatarView = ({ avatar, username, id, t }: AvatarViewProps) => {
  const [uploadAvatar] = useMutation(UPLOAD_AVATAR, {
    refetchQueries: [GET_PROFILE, 'GetUser'],
  });

  const [removeAvatar, { loading }] = useMutation(REMOVE_AVATAR, {
    refetchQueries: [GET_PROFILE, 'GetUser'],
  });

  const uploadImage = async (options: any) => {
    const { file } = options;
    const fmData = new FormData();
    fmData.append('image', file);
    uploadAvatar({
      variables: {
        id: id,
        image: file,
      },
    });
  };

  const removeImage = async () => {
    removeAvatar({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
      <Button
        danger
        type="primary"
        size="large"
        icon={<FontAwesomeIcon icon={faCircleXmark} />}
        loading={loading}
        onClick={() => removeImage()}
        className="remove-image-btn"
        disabled={!avatar}
      >
        Remove avatar
      </Button>
      <div className="avatar">
        <AccountAvatar
          avatar={avatar}
          username={username}
          size={160}
          shape="square"
        />
      </div>

      <Upload
        className="avatar-uploader"
        name="avatar"
        data-testid="upload-component"
        showUploadList={false}
        action={uploadURL}
        customRequest={uploadImage}
      >
        <FontAwesomeIcon icon={faUpload} className="avatar-uploader-trigger" />
        <h2>{t('avatarChange')}</h2>
      </Upload>
    </>
  );
};

export default AvatarView;
