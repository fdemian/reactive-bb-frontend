import { Input } from 'antd';
import SearchUsersList from './SearchUsersList';
import { useLazyQuery } from '@apollo/client';
import { GET_MENTION_USERS } from '../../Editor/Queries';
import { SearchUserTypes } from '../moderationPanelTypes';

const SearchUsers = ({ setScreenType, setUserToBan, t }: SearchUserTypes) => {
  const [getMentionCandidates, { data }] = useLazyQuery(GET_MENTION_USERS);

  const changeInputFn = (evt: any) => {
    const username = evt.target.value;

    if (username.length <= 3) {
      return;
    }

    getMentionCandidates({
      variables: {
        search: username,
      },
    });
  };

  const users = data?.mentionCandidates ? data.mentionCandidates : [];

  return (
    <>
      <br />
      <Input
        role="input"
        aria-label={t('searchUsers')}
        onChange={changeInputFn}
        placeholder={t('searchUsers')}
      />
      <br />
      <SearchUsersList
        t={t}
        users={users}
        setScreenType={setScreenType}
        setUserToBan={setUserToBan}
      />
    </>
  );
};

export default SearchUsers;
