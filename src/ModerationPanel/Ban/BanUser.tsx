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
import { BanUserTypes } from '../moderationPanelTypes';
import './Ban.css';

const BanUser = ({ user, goBack, t }:BanUserTypes) => {
    const [banLimitDate, setBanLimitDate] = useState(null);
    const [isPermanent, setIsPermanent] = useState(false);
    const [banMutation, { data, loading }] = useMutation(BAN_USER, {
        refetchQueries: [{ query: GET_MENTION_USERS }, 'GET_MENTION_USERS'],
    });

    const banUser = () => {
        if(!containerRef || !containerRef.current || !user)
            return;

        // @ts-ignore
        const reason = containerRef.current.getContent();
        const banDate = (isPermanent || !banLimitDate) ? null : new Date(banLimitDate);

        banMutation({
            variables: {
                user: user.id,
                expires: banDate,
                reason: JSON.stringify(reason),
            },
        });
    };

    const datePickerChange = (date:any) => {
        if (date === null) {
            setBanLimitDate(null);
            return;
        }
        setBanLimitDate(date.toISOString());
    };

    const containerRef = useRef(null);
    const mentions:any[] = [];
    const setMentions = () => {};
    const isMobile = getIsMobile();

    if (loading || !user) return <Spin />;

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

export default BanUser;
