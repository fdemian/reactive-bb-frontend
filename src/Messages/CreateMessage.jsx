import PropTypes from "prop-types";
import { useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MENTION_USERS } from '../Editor/Queries';
import CalliopeEditor from 'kalliope';
import { Button, Form, Mentions } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import editorConfig from './editorConfig';
import './Messages.css';

const { getMentions } = Mentions;

const CreateMessage = ({ sendMessage, containerRef, t }) => {
    const [updatedList, setUpdatedList] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const ref = useRef();

    const mentionSelectChange = ({ value }) => {
        const userId = users.filter((u) => u.name === value)[0].id;
        setSelectedUser(userId);
    };

    const checkMention = async (_, value) => {
        const mentions = getMentions(value);

        if (mentions.length > 1) {
            throw new Error(t('oneUserSelectedError'));
        }
    };

    const onFinish = () => {
        sendMessage(selectedUser, true);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [getMentionCandidates, { data, loading }] = useLazyQuery(GET_MENTION_USERS);

    const onSearch = (value) => {
        ref.current = value;
        setUsers([]);

        getMentionCandidates({
            variables: {
                search: value
            }
        });
        setUpdatedList(true);
    };

    if (data && !loading && updatedList) {
        const { mentionCandidates } = data;
        if (mentionCandidates !== null) {
            const _suggestions = mentionCandidates.map((u) => ({
                id: u.id,
                name: u.username,
                link: `/users/${u.id}/${u.username}`,
                avatar: u.avatar
            }));
            setUsers(_suggestions);
        }
        setUpdatedList(false);
    }

    const mentionOptions = users.map(({ name, avatar }) => {
        return {
            value: name,
            key: name,
            label: (
                <>
                    <UserAvatar avatar={avatar} username={name} size={30} shape="circle" />
                    &nbsp; <span>{name}</span>
                </>
            )
        };
    });

    return (
        <Form
            role="form"
            aria-label="new-conversation-modal"
            name="new-conversation-modal"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label={t('user')}
                name="user"
                rules={[
                    {
                        required: true,
                        message: t('userNameInputError')
                    },
                    {
                        validator: checkMention
                    }
                ]}
            >
                <Mentions
                    data-testid="mention-user-select"
                    rows={1}
                    onSelect={mentionSelectChange}
                    placeholder={t('userMentionPlaceholder')}
                    style={{ width: '400px' }}
                    loading={loading}
                    onSearch={onSearch}
                    options={mentionOptions}
                />
            </Form.Item>

            <Form.Item label={t('message')} name="message" rules={[]}>
                <CalliopeEditor
                    config={editorConfig}
                    containerRef={containerRef}
                    setFormats={() => {}}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                <Button
                    role="button"
                    aria-label={t('sendMessage')}
                    type="primary"
                    htmlType="submit"
                >
                    {t('sendMessage')}
                </Button>
            </Form.Item>
        </Form>
    );
};

CreateMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  containerRef: PropTypes.any.isRequest,
  t: PropTypes.func.isRequired
};

export default CreateMessage;
