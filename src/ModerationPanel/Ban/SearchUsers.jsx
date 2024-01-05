import PropTypes from "prop-types";
import { Input } from 'antd';
import SearchUsersList from './SearchUsersList';
import { useLazyQuery } from '@apollo/client';
import { GET_MENTION_USERS } from '../../Editor/Queries';

const SearchUsers = ({ setScreenType, setUserToBan, t }) => {
    const [getMentionCandidates, { data }] = useLazyQuery(GET_MENTION_USERS);

    const changeInputFn = (evt) => {
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

    const users = data && data.mentionCandidates ? data.mentionCandidates : [];

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

SearchUsers.propTypes = {
    setScreenType: PropTypes.func.isRequired,
    setUserToBan: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default SearchUsers;
