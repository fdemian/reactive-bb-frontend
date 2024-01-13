import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, Alert, Tooltip } from 'antd';
import TopIcon from '../Login/TopIcon';
import OuathLogins from '../Login/OauthLogins';
import Loading from '../Loading/LoadingIndicator';
import PasswordStrengthBar from '../PasswordStrength/PasswordStrengthBar.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faUserPlus,
    faTimes,
    faCheck,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { CREATE_USER } from './Mutations';
import { CHECK_USERNAME } from './Queries';
import './Register.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

type FormValues = {
    passwordValue: string;
    passwordrepeat: string;
    username: string;
    email: string;
};

export const Component = () => {
    const [form] = Form.useForm();
    const id = localStorage.getItem('ID');
    const { t } = useTranslation('register', { keyPrefix: 'register' });
    const isLoggedIn = id !== null;
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [createUser, { loading, data }] = useMutation(CREATE_USER);
    const [checkUsername, usernameQueryResp] = useLazyQuery(CHECK_USERNAME);
    const [passwordValue, setPasswordValue] = useState(null);

    const onFinish = (values: FormValues) => {
        if (passwordValue !== values.passwordrepeat) {
            setError(true);
            setErrorMessage(t('passNoMatch'));
            return false;
        }

        const { username, email } = values;
        createUser({
            variables: {
                username: username,
                password: passwordValue,
                email: email,
            },
        });
    };

    const checkUsernameAvailability = async (e: any) => {
        const username = e.target.value;
        if (username.length < 4) return;
        checkUsername({
            variables: {
                username: username,
            },
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo.errorFields);
    };

    if (loading) return <Loading />;

    if (isLoggedIn) return <Navigate to="/" />;

    if (data) {
        const { ok, email } = data.createUser;
        if (ok) {
            return <Navigate to={`/activationinfo/${email}`} />;
        }
    }

    const usernameTaken =
        usernameQueryResp.data &&
        usernameQueryResp.data.checkUsername.exists === true;

    const UserNameSuffix = usernameTaken ? (
        <Tooltip title={t('usernameTaken')}>
            <FontAwesomeIcon icon={faTimes} color="red" />
        </Tooltip>
    ) : (
        <Tooltip title={t('usernameValid')}>
            <FontAwesomeIcon icon={faCheck} color="green" />
        </Tooltip>
    );

    return (
        <div className="register-grid-container">
            <TopIcon />
            <br />
            <Form
                {...layout}
                form={form}
                name="register-form"
                role="form"
                className="register-form"
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
                            message: t('requiredField'),
                        },
                    ]}
                >
                    <Input
                        aria-label="username"
                        name="username"
                        className="input-field"
                        placeholder={t('usernamePlaceholder')}
                        prefix={
                            <FontAwesomeIcon
                                icon={faUser}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="username"
                        onChange={checkUsernameAvailability}
                        suffix={usernameQueryResp.data && UserNameSuffix}
                    />
                </Form.Item>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: t('requiredField'),
                        },
                        {
                            type: 'email',
                            message: t('notValidEmail'),
                        },
                    ]}
                >
                    <Input
                        aria-label="email"
                        name="email"
                        className="input-field"
                        placeholder={t('emailPlaceholder')}
                        prefix={
                            <FontAwesomeIcon
                                icon={faUser}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="email"
                        /*suffix={
                         error ? null : (
                          <Tooltip title="Mail looks valid. We'll email you to confirm.">
                            <FontAwesomeIcon icon={faCheck} color="green" />
                          </Tooltip>
                          )
                        }*/
                    />
                </Form.Item>
                <Form.Item label="" name="password" rules={[]}>
                    <Input.Password
                        aria-label="password"
                        name="password"
                        role="textbox"
                        className="input-field"
                        placeholder={t('passwordPlaceholder')}
                        type="password"
                        prefix={
                            <FontAwesomeIcon
                                icon={faLock}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="password"
                        onChange={(e: any) => setPasswordValue(e.target.value)}
                    />
                    <PasswordStrengthBar password={passwordValue ?? ''} t={t} />
                </Form.Item>
                <Form.Item
                    label=""
                    name="passwordrepeat"
                    rules={[
                        {
                            required: true,
                            message: t('repeatPasswordMissing'),
                        },
                    ]}
                >
                    <Input.Password
                        aria-label="passwordrepeat"
                        name="passwordrepeat"
                        role="textbox"
                        className="input-field"
                        placeholder={t('repeatPasswordPlaceholder')}
                        onChange={undefined}
                        type="password"
                        prefix={
                            <FontAwesomeIcon
                                icon={faLock}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="password-repeat"
                    />
                </Form.Item>
                <br />
                <Form.Item>
                    <Button
                        aria-label={t('register')}
                        type="primary"
                        htmlType="submit"
                        className="register-button"
                        role="button"
                        size="large"
                        block
                    >
                        {t('register')} &nbsp;
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            size="lg"
                            color="white"
                        />
                    </Button>
                </Form.Item>
            </Form>
            <OuathLogins t={t} />
            {error && (
                <Alert
                    className="register-alert-error"
                    message={errorMessage}
                    type="error"
                    showIcon
                    closable
                />
            )}
        </div>
    );
};
