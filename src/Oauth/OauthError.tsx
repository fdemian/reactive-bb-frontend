import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Result, Typography } from 'antd';

const { Paragraph, Text } = Typography;

export const Component = (): React.ReactElement => {
  const { service } = useParams();
  const navigate = useNavigate();
  const goToLoginPage = () => { navigate('/login'); };
  const { t } = useTranslation('oauth', { keyPrefix: 'oauth' });

  return (
    <Result
      status="error"
      title={t('authFailed')}
      subTitle={`${t('oauthUsing')} ${service} ${t('failed')}`}
      extra={[
        <Button type="primary" key="console" onClick={goToLoginPage}>
          {t('loginPageBtn')}
        </Button>,
      ]}
    >
      <div className="desc">
        <Paragraph>
          <Text strong style={{ fontSize: 16 }}>
            {t('loginSuggestion')}
          </Text>
        </Paragraph>
      </div>
    </Result>
  );
};
