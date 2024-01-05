import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Spin, Button, Tooltip, Checkbox, Result } from 'antd';
import AccountAvatar from '../../UserAvatar/UserAvatar';
import Editor from '../../Editor/Editor';
import { getIsMobile } from '../../App/utils';
import BanDatePicker from './BanDatePicker';
import { BAN_USER } from './Mutations';
import { GET_MENTION_USERS } from '../../Editor/Queries';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import './Ban.css';

const BanUser = ({ user, goBack, t }) => {
    const [banLimitDate, setBanLimitDate] = useState(null);
    const [isPermanent, setIsPermanent] = useState(false);
    const [banMutation, { data, loading }] = useMutation(BAN_USER, {
        refetchQueries: [{ query: GET_MENTION_USERS }, 'GET_MENTION_USERS'],
    });

    const banUser = () => {
        const _id = parseInt(user.id, 10);
        const reason = containerRef.current.getContent();
        const banDate = isPermanent ? null : new Date(banLimitDate);

        banMutation({
            variables: {
                user: _id,
                expires: banDate,
                reason: JSON.stringify(reason),
            },
        });
    };

    const datePickerChange = (date) => {
        if (date === null) {
            setBanLimitDate(null);
            return;
        }
        setBanLimitDate(date.toISOString());
    };

    const containerRef = useRef(null);
    const mentions = [];
    const setMentions = () => {};
    const isMobile = getIsMobile();

    if (loading) return <Spin />;

    if (!loading && data && data.banUser === true)
        return (
            <Result
                title={`${t('user')} ${user.username} ${t('successfulBan')}`}
                extra={
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <AccountAvatar
                                avatar={user.avatar}
                                username={user.username}
                                size={100}
                                shape="circle"
                            />
                        </div>
                        <br />
                        <Button onClick={goBack} type="primary" key="back">
                            {t('back')}
                        </Button>
                    </>
                }
            />
        );

    return (
        <div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <h1>{user.username}</h1>
                <AccountAvatar
                    avatar={user.avatar}
                    username={user.username}
                    size={100}
                    shape="circle"
                />
            </div>
            <div>
                <h2>
                    {t('expirationDate')} &nbsp;
                    <Tooltip placement="right" title={t('banEndTooltip')}>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </Tooltip>
                </h2>
                <BanDatePicker onChange={datePickerChange} disabled={isPermanent} />
                <Checkbox
                    role="checkbox"
                    aria-label={t('permanent')}
                    className="checkbox-ban-permanent"
                    checked={isPermanent}
                    disabled={false}
                    onChange={(evt) => setIsPermanent(evt.target.checked)}
                >
                    <h2>{t('permanent')}</h2> &nbsp;
                </Checkbox>
            </div>
            <br />
            <div>
                <h2>
                    {t('justification')} &nbsp;
                    <Tooltip placement="right" title={t('justificationTooltip')}>
                        <FontAwesomeIcon icon={faQuestionCircle} />
                    </Tooltip>
                </h2>
            </div>
            <div>
                <Editor
                    containerRef={containerRef}
                    setMentions={setMentions}
                    mentions={mentions}
                    user={user}
                    initialState={undefined}
                    isMobile={isMobile}
                />
            </div>
            <div className="ban-button-group">
                <Button role="button" aria-label={t('back')} type="primary" onClick={goBack}>
                    {t('back')}
                </Button>
                <Button
                    role="button"
                    aria-label={t('banUser')}
                    className="ban-button"
                    danger
                    type="primary"
                    onClick={banUser}
                >
                    {t('banUser')}
                </Button>
            </div>
        </div>
    );
};


BanUser.propTypes = {
  user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
      banned: PropTypes.bool.isRequired,
      banReason: PropTypes.string
  }),
  goBack: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};


export default BanUser;
