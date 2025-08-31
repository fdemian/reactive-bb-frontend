import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { SET_LOGIN, GET_IS_LOGGED_IN } from './queries';
import {
  authenticateUser,
  refreshToken,
  setLoginData,
  setBanStatus,
  setUserType,
} from './authUtils';
import TopIcon from './TopIcon';
import Loading from '../Loading/LoadingIndicator';
import OauthLogins from './OauthLogins';
import './Login.css';

interface LoginDataTypes {
  id: number;
  ok: boolean;
  ttl: number;
  banned: boolean;
  banReason: string;
  banExpirationTime: string;
  type: string;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const Component = (): React.ReactElement => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [userBanned, setUserBanned] = useState<null | boolean>(null);
  const [loginLoading, setLoginLoading] = useState<null | boolean>(false);

  const loginQuery = useQuery(GET_IS_LOGGED_IN);
  const client = useApolloClient();
  const location = useLocation();
  const { t } = useTranslation('login', { keyPrefix: 'login' });

  const from = location.state?.from?.pathname || '/';

  const loginResponse = (loginData: LoginDataTypes, username: string) => {
    const { id, ok, ttl, banned, banReason, banExpirationTime, type } =
      loginData;
    const ttlInSeconds = ttl * 1000;

    if (ok) {
      setUserType(type);
      setBanStatus(banned, banReason, banExpirationTime);
      setLoginData(id, username, ttlInSeconds);
      setUserBanned(userBanned);

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
      setTimeout(refreshToken, ttlInSeconds);
    } else {
      if (!errorMessage) {
        setErrorMessage(
          'La combinación de usuario y contraseña es incorrecta.'
        );
      }
    }
  };

  // Finished checking login values.
  const onFinish = async (values: LoginFormValues) => {
    if (loginLoading) return;

    const { username, password } = values;
    setLoginLoading(true);
    const data = await authenticateUser(username, password);
    loginResponse(data, username);
    setLoginLoading(false);
  };

  const clearError = () => {
    setErrorMessage(null);
    setLoginLoading(false);
  };

  // Fail!
  const onFinishFailed = (errorInfo: any) => {
    setErrorMessage('Failed: ' + errorInfo);
    setLoginLoading(false);
  };

  if (loginQuery.loading) return <Loading />;

  if (userBanned) {
    return <Navigate to="/banned" replace={true} />;
  }

  if (loginQuery.data.loggedIn && !userBanned)
    return <Navigate to={from} replace={true} />;

  return (
    <div data-testid="login-container" className="login-grid-container">
      <TopIcon />
      <br />
      <Form
        {...layout}
        name="login-form"
        role="form"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label=""
          name="username"
          rules={[
            {
              required: true,
              message: t('usernameError'),
            },
          ]}
        >
          <Input
            disabled={loginLoading ?? true}
            name="username"
            className="input-field"
            placeholder={t('usernamePlaceholder')}
            prefix={
              <FontAwesomeIcon icon={faUser} size="lg" color="gainsboro" />
            }
            autoComplete="username"
          />
        </Form.Item>
        <Form.Item
          label=""
          name="password"
          rules={[
            {
              required: true,
              message: t('passwordError'),
            },
          ]}
        >
          <Input.Password
            disabled={loginLoading ?? true}
            className="input-field"
            placeholder={t('passwordPlaceholder')}
            type="password"
            name="password"
            prefix={
              <FontAwesomeIcon icon={faLock} size="lg" color="gainsboro" />
            }
            role="textbox"
            autoComplete="current-password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            aria-label={t('login')}
            loading={loginLoading ?? true}
            className="login-button"
            size="large"
            type="primary"
            htmlType="submit"
            block
          >
            {t('login')} &nbsp;
            <FontAwesomeIcon icon={faSignIn} size="lg" color="white" />
          </Button>
        </Form.Item>
        <Form.Item>
          <h1>
            <Link to="/forgotpass">{t('forgotPass')}</Link>
          </h1>
        </Form.Item>
      </Form>
      <br />
      {loginLoading ? (
        <div>
          <Alert
            className="login-info-alert"
            message={t('loadingLogIn')}
            description={t('pleaseWait')}
            type="info"
          />
        </div>
      ) : (
        <OauthLogins t={t} />
      )}
      {errorMessage && (
        <Alert
          style={{ marginTop: 24, width: '32%', marginLeft: '34%' }}
          type="error"
          message="Error"
          description={errorMessage}
          showIcon
          closable
          onClose={clearError}
        />
      )}
    </div>
  );
};
