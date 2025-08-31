import { useEffect } from 'react';
import { Alert, Spin } from 'antd';
import { SET_LOGIN } from '../Login/queries';
import { useApolloClient } from '@apollo/client/react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { refreshToken, setLoginData } from '../Login/authUtils';
import { useTranslation } from 'react-i18next';

export const Component = (): React.ReactElement => {
  const { service } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const client = useApolloClient();
  const navigate = useNavigate();
  const { t } = useTranslation('oauth', { keyPrefix: 'oauth' });

  const registerUser = async (code: string, service: string) => {
    const jsonData = JSON.stringify({
      service: service,
      code: code,
    });
    const resp = await fetch('/api/oauth', {
      method: 'POST',
      body: jsonData,
    });
    const data = await resp.json();
    return data;
  };

  useEffect(() => {
    async function oauthFlow() {
      if (code === null) {
        navigate(`/autherror/${service}`);
        return;
      }

      if (service === undefined) {
        navigate(`/autherror/`);
        return;
      }

      const data = await registerUser(code, service);
      const { id, ok, ttl } = data;

      if (ok) {
        setLoginData(id, code, ttl * 1000);
        client.writeQuery({
          query: SET_LOGIN,
          data: {
            loggedIn: true,
          },
          variables: {
            status: true,
          },
        });

        // Refresh token once its TTL (time to live) has passed.
        setTimeout(refreshToken, ttl * 1000);
        navigate(-2);
      } else {
        navigate(`/autherror/${service}`);
      }
    }
    oauthFlow();
  });

  return (
    <div>
      <Spin tip={t('loggingIn')}>
        <Alert
          message={t('waitWarning')}
          description={`${t('loggingInWith')} ${service}`}
          type="info"
        />
      </Spin>
    </div>
  );
};
