import PropTypes from "prop-types";
import AccountAvatar from '../../UserAvatar/UserAvatar';
import { List, Button } from 'antd';
import { getLockoutTimeStr } from './utils';

const SearchUsersList = ({ users, setScreenType, setUserToBan, t }) => {
    const changeToBanScreen = (user) => {
        setScreenType(user.banned ? 'removeban' : 'ban');
        setUserToBan(user);
    };

    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
                <List.Item
                    actions={[
                     <Button
                        danger
                        type="primary"
                        key="ban-user-btn"
                        onClick={() => changeToBanScreen(user)}
                     >
                       {user.banned ? t('reviewBan') : t('banUser')}
                     </Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={
                            <AccountAvatar
                                avatar={user.avatar}
                                username={user.username}
                                size="5px"
                                shape="circle"
                            />
                        }
                        title={<strong>{user.username}</strong>}
                        description={
                            user.banned ? getLockoutTimeStr(user.banExpires, t) : t('notBanned')
                        }
                    />
                </List.Item>
            )}
        />
    );
};

SearchUsersList.propTypes = {
   users: PropTypes.array.isRequired,
   setScreenType: PropTypes.func.isRequired,
   setUserToBan: PropTypes.func.isRequired,
   t: PropTypes.func.isRequired
};

export default SearchUsersList;
