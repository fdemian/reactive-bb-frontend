import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Result } from 'antd';

export const Component = (): React.ReactElement => {
  const { t } = useTranslation('nomatch', { keyPrefix: 'nomatch' });
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t('pageDoesNotExist')}
      extra={
        <Button
          className="reset-pass-button"
          type="primary"
          size="large"
          key="home"
          onClick={() => { navigate('/'); }}
        >
          {t('home')}
        </Button>
      }
    />
  );
};
