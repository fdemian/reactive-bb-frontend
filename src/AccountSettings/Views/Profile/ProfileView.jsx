import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UPDATE_PROFILE } from '../../Mutations';
import { GET_PROFILE } from '../../Queries';
import Loading from '../../../Loading/LoadingIndicator';
import AvatarView from './AvatarView';
import { getUserId } from '../../../Login/authUtils';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import './ProfileView.css';

const FormItem = Form.Item;

const UserProfile = () => {
    const { t } = useTranslation('accountSettings', { keyPrefix: 'settings.profile' });

    const handleSubmit = () => {};
    const userId = getUserId();
    const [modalProps, setModalProps] = useState({ avatar: '', status: '', about: '' });
    const [updateProfile, mutationData] = useMutation(UPDATE_PROFILE);
    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: {
            id: parseInt(userId, 10),
        },
        skip: !userId,
    });
    const [form] = Form.useForm();

    if (loading) return <Loading />;

    if (error) return <p>Error</p>;

    const { username, avatar, status, about } = data.getUser;

    if (status !== null && about !== null) {
        if (modalProps.avatar === '') {
            setModalProps({
                avatar: avatar,
                status: status,
                about: about,
            });
        }
    }

    const updateProfileInfo = () => {
        updateProfile({
            variables: {
                id: data.getUser.id,
                status: modalProps.status,
                about: modalProps.about,
            },
        });
    };

    const setStatus = (e) =>
        setModalProps({
            ...modalProps,
            status: e.target.value,
        });

    const setAbout = (e) =>
        setModalProps({
            ...modalProps,
            about: e.target.value,
        });

    return (
    <>
        <Helmet>
            <title>{t('profileSettings')}</title>
        </Helmet>
        <div className="baseView">
            <div className="left">
                <h2>{username}</h2>
                <Form
                    role="form"
                    form={form}
                    layout="vertical"
                    onSubmit={handleSubmit}
                    hideRequiredMark
                >
                    <FormItem label={t('status')}>
                        <Input
                            name="status"
                            aria-label="Status"
                            defaultValue=""
                            value={modalProps.status}
                            onChange={setStatus}
                        />
                    </FormItem>
                    <FormItem label={t('aboutMe')}>
                        <Input.TextArea
                            name="about"
                            aria-label="About me"
                            defaultValue=""
                            value={modalProps.about}
                            onChange={setAbout}
                            rows={4}
                        />
                    </FormItem>
                    <Button
                        type="primary"
                        loading={mutationData.loading}
                        onClick={updateProfileInfo}
                    >
                        {mutationData.loading ? t('clientUpdating') : t('clientUpdate')}
                    </Button>
                </Form>
            </div>
            <br />
            <div className="right">
                <AvatarView
                    id={data.getUser.id}
                    avatar={data.getUser.avatar}
                    username={username}
                    t={t}
                />
            </div>
        </div>
    </>
    );
};

export default UserProfile;
