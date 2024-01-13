import { Navigate } from 'react-router-dom';
import Renderer from '../Editor/Renderer';
import BanExpirationClock from '../ModerationPanel/Ban/BanExpirationClock';
import { useTranslation } from 'react-i18next';
import { getBanStatus } from '../Login/authUtils';
import './Banned.css';

export const Banned = () => {
  const banStatus = getBanStatus();
  const { banned, banExpires, banReason } = banStatus;
  const { t } = useTranslation('banned', { keyPrefix: 'banned' });

  // Not banned. Return to home.
  if (!banned) {
    return <Navigate to="/" />;
  }

  return (
    <div className="ban-status-container">
      <h1>{t('banTitle')}</h1>
      <h2>{t('banReason')}</h2>
      <div className="ban-reason-renderer-container">
        <Renderer content={banReason} />
      </div>
      <h2>{t('banActionTitle')}</h2>
      <p>{t('unjustBanText')}</p>
      <p>{t('waitBanExpires')}</p>
      <h2>{t('banExpires')}</h2>
      <BanExpirationClock lockoutTime={banExpires} t={t} />
    </div>
  );
};
