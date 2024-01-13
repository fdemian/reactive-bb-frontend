import UserAvatar from '../UserAvatar/UserAvatar';
import { useQuery } from '@apollo/client';
import { GET_USER } from './Queries';
import { useParams } from 'react-router-dom';
import { Card, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import UserProfileMenu from './UserProfileMenu';
import Loading from '../Loading/LoadingIndicator';
import './User.css';

export const Component = () => {
  let { id } = useParams();
  const parsedId = parseInt(id ?? '5', 10);
  const queryOpts = { variables: { id: parsedId }, skip: !id };
  const { loading, error, data } = useQuery(GET_USER, queryOpts);
  const { t } = useTranslation('accountSettings', {
    keyPrefix: 'settings.profile',
  });

  if (loading) return <Loading />;

  if (error) return <p>Error</p>;

  const { username, avatar, fullname, status, about, banned } = data.getUser;

  return (
    <>
      <Helmet>
        <title>{t('profile')}</title>
      </Helmet>

      <Card>
        <div className="user-container-wrapper">
          <div className="user-title">
            <span className="user-avatar">
              <UserAvatar
                avatar={avatar}
                username={username}
                size={180}
                shape="circle"
              />
            </span>
            <p className="user-name">
              <strong>{username}</strong>
            </p>
            <p className="user-name">
              <em>{fullname}</em>
            </p>
            <p className="user-status">{status}</p>
            <p className="user-about">{about}</p>
            {banned && (
              <Tag
                className="ban-tag"
                icon={<FontAwesomeIcon icon={faCircleExclamation} />}
                color="#cd201f"
              >
                &nbsp; BANNED
              </Tag>
            )}
          </div>
        </div>
      </Card>
      <UserProfileMenu id={parsedId} user={data.getUser} />
    </>
  );
};
