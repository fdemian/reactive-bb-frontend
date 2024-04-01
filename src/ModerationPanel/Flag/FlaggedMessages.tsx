/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate } from 'react-router-dom';
import { Table, Spin, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GET_FLAGGED_POSTS, REMOVE_FLAG } from './Queries';
import { useQuery, useMutation } from '@apollo/client';
import {
  FlaggedDataType,
  TranslationFn,
  FlaggedMessagesProps,
  FlaggedPost,
} from '../moderationPanelTypes';
import '../ModerationPanel.css';

const getReasonText = (
  reasonId: number,
  flaggedData: FlaggedDataType,
  t: TranslationFn
):string => {
  if (reasonId === 4 && flaggedData.reasonText) {
    return flaggedData.reasonText;
  }
  return t('flagReason-' + reasonId.toString());
};

const FlaggedMessages = ({ t }: FlaggedMessagesProps) => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_FLAGGED_POSTS, {
    variables: {
      offset: 0,
      limit: 5,
    },
  });

  const [removeFlagMutation] = useMutation(REMOVE_FLAG, {
    update(cache, { data }) {
      if(!data?.removeFlag)
        return;
      cache.modify({
        fields: {
          flaggedPosts(flaggedPosts = []) {
            if(!data.removeFlag)
              return flaggedPosts;
            
            const { postId, userId } = data.removeFlag;
            return flaggedPosts.filter(
              (f: FlaggedPost) => f.postId !== postId && f.userId !== userId
            );
          },
        },
      });
    },
  });

  const removeFlag = (postId: number, userId: number) => {
    removeFlagMutation({
      variables: {
        post: postId,
        user: userId,
      },
      optimisticResponse: {
        removeFlag: {
          userId: userId,
          postId: postId,
        },
      },
    });
  };

  const columns = [
    {
      title: 'Post #',
      key: 'postId',
    },
    {
      title: 'User',
      key: 'userId',
    },
    {
      title: 'Reason',
      key: 'reasonId',
      render: (reasonId: number, flaggedData: FlaggedDataType) =>
        getReasonText(reasonId, flaggedData, t),
    },
    {
      title: '',
      key: '',
      render: (_: string, record: FlaggedDataType) => (
        <Tooltip title="Go to post">
          <FontAwesomeIcon
            onClick={() => { navigate(`/postlink/${record.postId.toString()}`); }}
            icon={faExternalLinkAlt}
            color="gainsboro"
            size="2x"
          />
        </Tooltip>
      ),
    },
    {
      title: '',
      key: '',
      render: (_: string, record: FlaggedDataType) => (
        <Tooltip title="Remove this flag from post">
          <FontAwesomeIcon
            onClick={() => { removeFlag(record.postId, record.userId); }}
            icon={faTrash}
            color="gainsboro"
            size="2x"
          />
        </Tooltip>
      ),
    },
  ];

  if (loading || !data) return <Spin />;

  if (error) return <p>Error</p>;

  const { flaggedPosts } = data;

  if (!flaggedPosts || flaggedPosts.length === 0) {
    return (
      <h1
        role="presentation"
        className="flagged-posts"
        aria-label={t('noFlaggedPosts')}
      >
        {t('noFlaggedPosts')}
      </h1>
    );
  }

  return (
    <div>
      <br />
      <Table 
        dataSource={flaggedPosts} 
        columns={columns} 
      />
    </div>
  );
};

export default FlaggedMessages;
