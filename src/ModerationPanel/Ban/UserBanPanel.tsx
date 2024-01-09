import PropTypes from "prop-types";
import { useState, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { UserType } from '../../User/userTypes';

const SearchUsers = lazy(() => import('./SearchUsers'));
const BanUser = lazy(() => import('./BanUser'));
const RemoveBan = lazy(() => import('./RemoveBan'));

const UserBanPanel = ({ t }) => {
    const [screenType, setScreenType] = useState('search');
    const [userToBan, setUserToBan] = useState<UserType | null>(null);

    const goBack = () => setScreenType('search');

    if (screenType === 'search') {
        return (
            <Suspense fallback={<Spin />}>
                <SearchUsers setUserToBan={setUserToBan} setScreenType={setScreenType} t={t} />
            </Suspense>
        );
    }

    if (screenType === 'removeban') {
        return (
            <Suspense fallback={<Spin />}>
                <RemoveBan user={userToBan} setScreenType={setScreenType} t={t} goBack={goBack} />
            </Suspense>
        );
    }

    return <BanUser user={userToBan} setScreenType={setScreenType} t={t} goBack={goBack} />;
};

UserBanPanel.propTypes = {
  t: PropTypes.func.isRequired
};

export default UserBanPanel;
