import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { GET_IS_LOGGED_IN } from '../Login/queries';
import { RESET_PASSWORD_REQUEST } from './Mutations';
import Loading from '../Loading/LoadingIndicator';
import './ResetPassword.css';


type ResetPasswordValues = {
    email: string;
};


export const Component = () => {
    const [resetInitiated, setResetInitiated] = useState(false);
    const navigate = useNavigate();
    const onFinish = (values:ResetPasswordValues) => {
        const { email } = values;
        resetPassword({
            variables: {
                email: email
            }
        });
        setResetInitiated(true);
    };
    const { t } = useTranslation('register', { keyPrefix: 'register' });

    const [resetPassword] = useMutation(RESET_PASSWORD_REQUEST);
    const { data, loading } = useQuery(GET_IS_LOGGED_IN);

    if (loading) return <Loading />;

    const { loggedIn } = data;

    if (loggedIn) return <Navigate to="/" />;

    if (resetInitiated)
        return (
            <div className="reset-password-container">
                <h1 className="reset-password-title">{t('resetPass')}</h1>
                <Alert
                    message={t('resetPass')}
                    description={t('requestResetSuccess')}
                    type="success"
                    showIcon
                />
                <br />
                <Button
                    className="reset-pass-button"
                    type="primary"
                    size="large"
                    key="home"
                    onClick={() => navigate('/')}
                >
                    {t('home')}
                </Button>
            </div>
        );

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">{t('resetPass')}</h1>
            <br />
            <Alert
                message={t('resetPass')}
                description={t('resetRequestInfo')}
                type="info"
                showIcon
            />
            <br />
            <Form
                name="reset-password-form"
                role="form"
                className="reset-password-form"
                onFinish={onFinish}
            >
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: t('requiredField')
                        },
                        {
                            type: 'email',
                            message: t('notValidEmail')
                        }
                    ]}
                >
                    <Input
                        role="input"
                        width={700}
                        aria-label="email"
                        name="email"
                        className="reset-pass-input"
                        placeholder={t('emailPlaceholder')}
                        prefix={
                            <FontAwesomeIcon
                                icon={faUser}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="email"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        aria-label={t('resetPass')}
                        className="reset-pass-button"
                        role="button"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        {t('resetPass')} &nbsp;
                    </Button>
                </Form.Item>
            </Form>
            <br />
        </div>
    );
};
