import { Result, Button } from 'antd';
import { redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Register.css';

export const Component = () => {
  const { t } = useTranslation('register', { keyPrefix: 'register' });
  return (
    <Result
      status="success"
      title={t('registerSuccess')}
      subTitle={t('registerSuccessSub')}
      extra={[
        <Button
          aria-label={t('login')}
          role="button"
          type="primary"
          size="large"
          key="login"
          onClick={() => redirect('/login')}
        >
          {t('login')}
        </Button>,
        <Button
          aria-label={t('home')}
          role="button"
          type="primary"
          size="large"
          key="home"
          onClick={() => redirect('/')}
        >
          {t('home')}
        </Button>,
      ]}
    />
  );
};
