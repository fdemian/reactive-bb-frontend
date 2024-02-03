import { Spin, Button, Result } from 'antd';
import { useMutation } from '@apollo/client';
import { REMOVE_BAN } from './Mutations';
import { GET_MENTION_USERS } from '../../Editor/Queries';
import AccountAvatar from '../../UserAvatar/UserAvatar';
import Renderer from '../../Editor/Renderer';
import BanExpirationClock from './BanExpirationClock';
import { BanUserTypes } from '../moderationPanelTypes';
import './Ban.css';

const RemoveBanScreen = ({ user, goBack, t }: BanUserTypes) => {
  const [removeBanMutation, { data, loading }] = useMutation(REMOVE_BAN, {
    refetchQueries: [{ query: GET_MENTION_USERS }, 'GET_MENTION_USERS'],
  });

  const removeBan = () => {
    if (!user) return;

    const _id = parseInt(user.id.toString(), 10);
    removeBanMutation({
      variables: {
        user: _id,
      },
    });
  };

  if (loading || !user) return <Spin />;

  if (!loading && data && data.removeUserBan === true)
    return (
      <Result
        title={t('banRemoved')}
        extra={
          <>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2>{user.username}</h2>
              <AccountAvatar
                avatar={user.avatar}
                username={user.username}
                size={100}
                shape="circle"
              />
            </div>
            <br />
            <Button onClick={goBack} type="primary" key="home">
              {t('back')}
            </Button>
          </>
        }
      />
    );
  
  //lockoutTime
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>{user.username}</h1>
      <AccountAvatar
        avatar={user.avatar}
        username={user.username}
        size={100}
        shape="circle"
      />
      <Renderer content={user.banReason} />
      <h2>{t('expirationDate')}</h2>
      <BanExpirationClock lockoutTime={user.banExpires} t={t} />
      <br />
      <br />
      <Button onClick={goBack} type="primary" key="home">
        {t('back')}
      </Button>
      <Button className="ban-button" danger type="primary" onClick={removeBan}>
        {t('liftBan')}
      </Button>
    </div>
  );
};

export default RemoveBanScreen;
