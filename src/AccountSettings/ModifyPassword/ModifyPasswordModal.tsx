import PropTypes from 'prop-types';
import { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { UPDATE_PASSWORD } from '../Mutations';
import ErrorLayout from './ErrorLayout';
import Loading from '../../Loading/LoadingIndicator';
import PasswordStrengthBar from '../../PasswordStrength/PasswordStrengthBar';
import { getUserId } from '../../Login/authUtils';

const ModifyPasswordModal = ({ t }: { t: (key: string) => string }) => {
    const [updatePassword, mutationData] = useMutation(UPDATE_PASSWORD);
    const modifyPassword = (currentPass: string, newPass: string) => {
        const userId = getUserId();
        updatePassword({
            variables: {
                id: userId,
                currentPass: currentPass,
                newPass: newPass,
            },
        });
    };

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassRepeat, setNewPassRepeat] = useState('');
    const [errorState, setErrorState] = useState(false);
    const [message, setMessage] = useState('');

    const errorClass = errorState ? ' input-error' : '';

    function clearError() {
        setErrorState(false);
        setMessage('');
    }

    function onSubmit() {
        if (newPass.trim() === '' || currentPass.trim() === '') {
            setErrorState(true);
            setMessage(t('passwordMissing'));
            return false;
        }

        if (newPassRepeat.trim() === '') {
            setErrorState(true);
            setMessage(t('repeatPasswordMissing'));
            return false;
        }

        if (newPass !== newPassRepeat) {
            setErrorState(true);
            setMessage(t('passNoMatch'));
            return false;
        }

        modifyPassword(currentPass, newPass); // No error. Submit.
        clearError(); // Clear errors from state.
        return true;
    }

    const { loading, error, data } = mutationData;

    if (error || (data && data.updatePassword && !data.updatePassword.ok)) {
        if (!errorState) {
            setErrorState(true);
            setMessage(t('passwordUpdateError'));
        }
    }

    const newPasswordInputChangeFn = (e: any) => setNewPass(e.target.value);

    if (loading) return <Loading />;

    if (data && data.updatePassword.ok) {
        return (
            <h1>
                {t('passwordUpdateSuccess')} &nbsp;
                <FontAwesomeIcon icon={faCheck} color="green" size="1x" />
            </h1>
        );
    }

    return (
        <Form
            id="modify-password-form"
            name="modify-password-form"
            role="form"
            className="modify-password-form"
        >
            <Form.Item name="password-current" rules={[]}>
                <Input.Password
                    aria-label="Password"
                    id="modify-password-form_password-current"
                    type="password"
                    role="input"
                    name="passwordCurrent"
                    className="input-field-security "
                    placeholder={t('passwordInputPlaceholder')}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    value={currentPass}
                    prefix={
                        <FontAwesomeIcon
                            icon={faLock}
                            size="lg"
                            color="gainsboro"
                        />
                    }
                />
            </Form.Item>
            <Form.Item name="password-new" rules={[]}>
                <Input.Password
                    aria-label="Password new"
                    role="input"
                    name="passwordNew"
                    id="modify-password-form_password-new"
                    className={'input-field-security ' + errorClass}
                    placeholder={t('passwordNewPlaceholder')}
                    onChange={newPasswordInputChangeFn}
                    type="password"
                    value={newPass}
                    prefix={
                        <FontAwesomeIcon
                            icon={faLock}
                            size="lg"
                            color="gainsboro"
                        />
                    }
                />
                <PasswordStrengthBar password={newPass} t={t} />
            </Form.Item>
            <Form.Item label="" name="password-repeat" rules={[]}>
                <Input.Password
                    aria-label="Password repeat"
                    id="modify-password-form_password-repeat"
                    className={'input-field-security ' + errorClass}
                    role="input"
                    name="passwordRepeat"
                    placeholder={t('passwordConfirmPlaceholder')}
                    onChange={(e) => setNewPassRepeat(e.target.value)}
                    type="password"
                    value={newPassRepeat}
                    prefix={
                        <FontAwesomeIcon
                            icon={faLock}
                            size="lg"
                            color="gainsboro"
                        />
                    }
                />
            </Form.Item>
            <div>
                <Button
                    type="primary"
                    aria-label="Password change submit"
                    onClick={onSubmit}
                >
                    {t('passwordModalTitle')}
                </Button>
            </div>

            <div style={{ marginTop: '10px' }}>
                <ErrorLayout
                    isError={errorState}
                    message={message}
                    onClose={clearError}
                    tr={t}
                />
            </div>
        </Form>
    );
};

ModifyPasswordModal.propTypes = {
    t: PropTypes.func.isRequired,
};

export default ModifyPasswordModal;
