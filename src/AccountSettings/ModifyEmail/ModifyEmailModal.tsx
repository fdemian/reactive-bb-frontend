import PropTypes from 'prop-types';
import { useState } from 'react';
import { Input, Button, Alert } from 'antd';
import Loading from '../../Loading/LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import ErrorLayer from './ErrorLayer';
import { UPDATE_EMAIL } from './Mutations';
import { useMutation } from '@apollo/client';
import { UserType } from '../../User/userTypes';

interface ModifyEmailModalProps {
  user: UserType;
  t: (key: string) => string;
}

const ModifyEmailModal = ({ user, t }: ModifyEmailModalProps) => {
  const { email } = user;
  const [userEmail, setUserEmail] = useState(email);
  const [updateEmail, mutationData] = useMutation(UPDATE_EMAIL);

  const changeEmail = () => {
    updateEmail({
      variables: {
        id: user.id,
        email: userEmail,
      },
    });
  };

  const success =
    mutationData.data?.updateEmail;
  const error = mutationData.error;

  if (mutationData.loading) return <Loading />;

  if (success)
    return (
      <div className="security-view password-success-layer">
        <FontAwesomeIcon
          icon={faCheck}
          size="2x"
          color="green"
          className="alert-circle"
        />
        <p className="ValidatedText">{t('updateEmailSuccess')}</p>
      </div>
    );

  return (
    <>
      <p>
        Current email: &nbsp;
        <span className="email-desc">
          <strong>{user.email}</strong>
        </span>
      </p>
      <Alert
        message={t('warning')}
        description={t('emailChangeWarning')}
        type="warning"
        showIcon
        data-testid="alert-warning"
      />
      <div style={{ marginTop: '10px' }}>
        <Input
          role="textbox"
          aria-label={t('emailChangePlaceholder')}
          className="input-field-security"
          placeholder={t('emailChangePlaceholder')}
          onChange={(e) => { setUserEmail(e.target.value); }}
          value={userEmail}
          prefix={
            <FontAwesomeIcon icon={faEnvelope} size="lg" color="gainsboro" />
          }
          data-testid="alert-warning"
        />
      </div>
      <br />
      <div>
        <Button
          type="primary"
          aria-label="Email change submit"
          onClick={changeEmail}
        >
          {t('emailModalTitle')}
        </Button>
      </div>
      <ErrorLayer error={error} tr={t} />
    </>
  );
};

ModifyEmailModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string,
    about: PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
};

export default ModifyEmailModal;
