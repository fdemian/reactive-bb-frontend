import { useState } from 'react';
import { Modal, List, Button } from 'antd';
import ModifyPasswordModal from '../ModifyPassword/ModifyPasswordModal';
import ModifyEmailModal from '../ModifyEmail/ModifyEmailModal';
import { GET_PROFILE } from '../Queries';
import Loading from '../../Loading/LoadingIndicator';
import { getUserId } from '../../Login/authUtils';
import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';

const SecurityView = () => {
  const { t } = useTranslation('accountSettings', {
    keyPrefix: 'settings.security',
  });

  const userId = getUserId();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { id: userId ?? -1 },
    skip: !userId,
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };
  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const openEmailModal = () => {
    setShowEmailModal(true);
  };
  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  if (loading || !data || !data.getUser) return <Loading />;

  if (error) return <p>Error</p>;

  const { email } = data.getUser;

  const getData = () => [
    {
      title: t('password'),
      description: (
        <>
          {t('currentPass')}: <strong>*****</strong>
        </>
      ),
      actions: [
        <Button
          key="modify-pass-btn"
          aria-label={`password ${t('modify')}`}
          role="button"
          type="link"
          onClick={openPasswordModal}
        >
          {t('modify')}
        </Button>,
      ],
    },
    {
      title: t('email'),
      description: <strong>{email}</strong>,
      actions: [
        <Button
          key="modify-mail-btn"
          aria-label={`email ${t('modify')}`}
          role="button"
          type="link"
          onClick={openEmailModal}
        >
          {t('modify')}
        </Button>,
      ],
    } /*,
    {
      title: 'Delete',
      description:'This will permanently delete your account',
      actions: [<Button type="danger">Delete my account</Button>]
    }*/,
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <Modal
        width={650}
        title={t('passwordModalTitle')}
        footer={
          <Button onClick={closePasswordModal}>{t('dialogClose')}</Button>
        }
        open={showPasswordModal}
      >
        <ModifyPasswordModal t={t} />
      </Modal>
      <Modal
        width={650}
        title={t('emailModalTitle')}
        footer={<Button onClick={closeEmailModal}>{t('dialogClose')}</Button>}
        open={showEmailModal}
      >
        <ModifyEmailModal user={data.getUser} t={t} />
      </Modal>
    </>
  );
};

export default SecurityView;
