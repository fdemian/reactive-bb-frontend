import PropTypes from 'prop-types';
import { Progress } from 'antd';
import { getExpirationTime } from './utils';
import { differenceInMilliseconds } from 'date-fns';

const BanExpirationClock = ({ lockoutTime, t }) => {
    if (lockoutTime === null | lockoutTime === undefined) return <h3>{t('permanentlyBanned')}</h3>;

    const dateDiffString = getExpirationTime(lockoutTime);
    const msDiff = differenceInMilliseconds(
        new Date(lockoutTime),
        new Date()
    );

    return (
        <Progress
            type="circle"
            percent={msDiff}
            format={() => `${dateDiffString}`}
        />
    );
}

BanExpirationClock.propTypes = {
    lockoutTime: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
};

export default BanExpirationClock;
