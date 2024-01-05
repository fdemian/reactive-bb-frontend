import { formatRelative } from 'date-fns';

export const getExpirationTime = (expiration) => {
    return formatRelative(
        new Date(),
        new Date(expiration)
    );
};

export const getLockoutTimeStr = (lockoutTime, t) => {
    if (lockoutTime === null) return t('permanentlyBanned');

    const expTimeRel = getExpirationTime(lockoutTime);

    return `${t('bannedUntil')} ${expTimeRel}`;
};