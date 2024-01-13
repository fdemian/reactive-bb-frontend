import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const BanStatusBanner = () => {
  const { t } = useTranslation('banned', { keyPrefix: 'banned' });

  return (
    <Card bordered={true} className="ban-alert-class">
      <h1>
        <FontAwesomeIcon icon={faCircleExclamation} color="red" />
        &nbsp; {t('banStatusNotice')}
      </h1>
      <p>
        {t('banStatusNoticeText')}
        &nbsp; <Link to="/banned">{t('banStatusClick')}</Link> .
      </p>
    </Card>
  );
};

export default BanStatusBanner;
