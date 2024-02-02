import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MENTION_USERS } from '../Editor/Queries';
import Editor from '../Editor/Editor';
import { Button, Form, Mentions, GetProp, MentionProps } from 'antd';
import UserAvatar from '../UserAvatar/UserAvatar';
import { getIsMobile } from '../App/utils';
import './Messages.css';
import { CalliopeContainerType } from 'kalliope';
import { MentionType } from '../Editor/editorTypes';

const { getMentions } = Mentions;

interface CreateMessageProps {
  sendMessage: (user: number, p: boolean) => void;
  containerRef: { current: CalliopeContainerType | null };
  t: (key: string) => string;
}

interface UserMessageType {
  id: number;
  name: string;
}

type MentionsOptionProps = GetProp<MentionProps, 'options'>[number];

const emptyFn = (m: MentionType[]) => { console.log(m); };

const CreateMessage = ({
  sendMessage,
  containerRef,
  t,
}: CreateMessageProps) => {
  const [updatedList, setUpdatedList] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState([]);
  const isMobile = getIsMobile();

  const mentionSelectChange = ({ value }: MentionsOptionProps) => {
    /* eslint-disable @typescript-eslint/no-unnecessary-condition */
    const filteredUser = users.filter((u: UserMessageType) => u.name === value);
    if (!filteredUser) return;
    const user: UserMessageType = filteredUser[0];
    const userIdCurrent = user.id;
    setSelectedUser(userIdCurrent);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const checkMention = (_: any, value: string) => {
    const mentions = getMentions(value);
    if (mentions.length > 1) {
      throw new Error(t('oneUserSelectedError'));
    }
  };

  const onFinish = () => {
    if (!selectedUser) return;
    sendMessage(selectedUser, true);
  };

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [getMentionCandidates, { data, loading }] =
    useLazyQuery(GET_MENTION_USERS);

  const onSearch = (value: string) => {
    setUsers([]);

    getMentionCandidates({
      variables: {
        search: value,
      },
    });
    setUpdatedList(true);
  };

  if (data && !loading && updatedList) {
    const { mentionCandidates } = data;
    if (mentionCandidates !== null && mentionCandidates !== undefined) {
      const _suggestions = mentionCandidates.map((u) => ({
        id: u.id,
        name: u.username,
        link: `/users/${u.id}/${u.username}`,
        avatar: u.avatar,
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
          <UserAvatar
            avatar={avatar}
            username={name}
            size={30}
            shape="circle"
          />
          &nbsp; <span>{name}</span>
        </>
      ),
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
            message: t('userNameInputError'),
          },
          {
            validator: checkMention,
          },
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
        <Editor
          containerRef={containerRef}
          setMentions={emptyFn}
          mentions={[]}
          user={null}
          initialState={undefined}
          isMobile={isMobile}
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

export default CreateMessage;
