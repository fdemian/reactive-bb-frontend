import { formatRelative } from 'date-fns';

export const getExpirationTime = (expiration:string) => {
    return formatRelative(
        new Date(),
        new Date(expiration)
    );
};

export const getLockoutTimeStr = (lockoutTime:string, t:(key:string)=>string) => {
    if (lockoutTime === null) return t('permanentlyBanned');

    const expTimeRel = getExpirationTime(lockoutTime);

    return `${t('bannedUntil')} ${expTimeRel}`;
};