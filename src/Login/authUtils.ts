const USER_ID = 'ID';
const USER_USERNAME = 'USER_USERNAME';
const REFRESH_TIMEOUT = 'REFRESH_TIMEOUT';
const TOKEN_TTL = 'TOKEN_TTL';
const BANNED_USER = 'BANNED_USER';
const BAN_REASON = 'BAN_REASON';
const USER_TYPE = 'USER_TYPE';

type FailFnType = () => void;

type BanStatusReturn = {
    banned: boolean,
    banReason: string | null
};

export const getUserId = (): number | null => {
    const stringId = localStorage.getItem(USER_ID);
    return stringId === null ? null : parseInt(stringId, 10);
};

export const getUserName = (): string | null => {
    return localStorage.getItem(USER_USERNAME);
};

export const setLoginData = (id:number, username:string, ttl:number) => {
    localStorage.setItem(USER_ID, id.toString());
    localStorage.setItem(USER_USERNAME, username);
    localStorage.setItem(TOKEN_TTL, ttl.toString());
};

const clearTTL = (): void => localStorage.removeItem(TOKEN_TTL);
const getTTLForToken = (): number => parseInt(localStorage.getItem(TOKEN_TTL) ?? "0", 10);

const removeCurrentTimeout = (): void => {
    const timeoutElem: string = localStorage.getItem(REFRESH_TIMEOUT) ?? "0";
    const timeoutId: number = parseInt(timeoutElem, 10);
    if (!isNaN(timeoutId)) {
        clearTimeout(timeoutId);
    }
    localStorage.removeItem(REFRESH_TIMEOUT);
};

const saveTimeout = (id: string): void => localStorage.setItem(REFRESH_TIMEOUT, id);

export const clearUser = ():void => {
    removeCurrentTimeout();
    clearTTL();
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(BANNED_USER);
    localStorage.removeItem(BAN_REASON);
    localStorage.removeItem(USER_TYPE);
};

export const authenticateUser = async (username:string, password: string) => {
    const jsonData: string = JSON.stringify({
        username: username,
        password: password
    });
    const resp: Response = await fetch('/api/login', {
        method: 'POST',
        body: jsonData
    });
    const data = await resp.json();

    return data;
};

/*
 * Summary: obtains new session JWT and refresh tokens for the user.
 * Description:
 * - Clears the previous timeout (if any).
 * - Gets the expiration time and sets a timeout to refresh the token.
 * - This function runs once the token expiration time is over.
 * - The refresh token is stored in httponly headers, so it is not stored on the client.
 * - The server will attempt to refresh the token once the expiration time has passed.
 * - If the refresh token is no longer valid when the user is
 */
export const refreshToken = async (onFail?:FailFnType) => {
    const user: number | null = getUserId();
    if (user === null && onFail) {
        onFail();
        return;
    }

    const resp = await fetch('/api/refresh', { method: 'POST' });

    if (!resp.ok && onFail) {
        onFail();
    }

    const data = await resp.json();

    if (data.ok) {
        const expiration: number = getTTLForToken();
        const id: NodeJS.Timeout = setTimeout(refreshToken, expiration);
        removeCurrentTimeout();
        saveTimeout(id.toString());
    } else {
        if (onFail) {
            onFail();
        }
    }
};

export const getBanStatus = (): BanStatusReturn  => {
    const banned: string | null = localStorage.getItem(BANNED_USER);
    const banReason: string | null = localStorage.getItem(BAN_REASON);
    return {
        banned: banned === 'true',
        banReason: banReason
    };
};

export const setBanStatus = (banned: boolean, banReason: string): void => {
    localStorage.setItem(BANNED_USER, banned.toString());
    localStorage.setItem(BAN_REASON, banReason);
};

export const clearBanStatus = (): void => {
    localStorage.removeItem(BANNED_USER);
    localStorage.removeItem(BAN_REASON);
    localStorage.setItem(BANNED_USER, "false");
};

export const setUserType = (type: string) => {
    localStorage.setItem(USER_TYPE, type);
};

export const getUserType = (): string | null => {
    return localStorage.getItem(USER_TYPE);
};