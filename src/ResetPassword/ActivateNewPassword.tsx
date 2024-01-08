import { Form, Input, Button, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Loading from '../Loading/LoadingIndicator';
import { RESET_PASSWORD } from './Mutations';
import './ResetPassword.css';

type ActivatePasswordValues = {
    password: string;
};

export const Component = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('register', { keyPrefix: 'register' });
    const [resetPassword, { data, loading }] = useMutation(RESET_PASSWORD);
    let { token } = useParams();

    const onFinish = (values:ActivatePasswordValues) => {
        resetPassword({
            variables: {
                token: token,
                password: values.password
            }
        });
    };

    if (loading) return <Loading />;

    if (data && !loading) {
        const { resetPassword } = data;
        if (resetPassword === true) {
            return (
                <>
                    <div>
                        <Alert
                            aria-label={t('passwordResetSuccess')}
                            message={t('resetPass')}
                            description={t('passwordResetSuccess')}
                            type="success"
                            showIcon
                        />
                        <Button
                            role="button"
                            aria-label={t('home')}
                            className="reset-pass-button"
                            type="primary"
                            size="large"
                            key="home"
                            onClick={() => navigate('/')}
                        >
                            {t('home')}
                        </Button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div>
                        <Alert
                            message={t('resetPass')}
                            description={t('passwordResetError')}
                            type="error"
                            showIcon
                        />
                        <br />
                        <Button
                            role="button"
                            className="reset-pass-button"
                            type="primary"
                            size="large"
                            key="home"
                            onClick={() => navigate('/')}
                        >
                            {t('home')}
                        </Button>
                        <Button
                            role="button"
                            aria-label={t("resetPassRepeat")}
                            className="forgot-pass-button-link"
                            type="primary"
                            size="large"
                            key="resetpass"
                            onClick={() => navigate('/forgotpass')}
                        >
                            {t('resetPass')}
                        </Button>
                    </div>
                </>
            );
        }
    }

    return (
        <div className="reset-password-container">
            <h1 className="reset-password-title">{t('resetPass')}</h1>
            <Alert
                message={t('resetPass')}
                description={t('enterNewPass')}
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
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: t('passwordMissing')
                        }
                    ]}
                >
                    <Input.Password
                        aria-label={t('resetPass') + ' input'}
                        name="password"
                        role="textbox"
                        className="input-field"
                        placeholder={''}
                        type="password"
                        prefix={
                            <FontAwesomeIcon
                                icon={faLock}
                                size="lg"
                                color="gainsboro"
                            />
                        }
                        autoComplete="password"
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
        </div>
    );
};
