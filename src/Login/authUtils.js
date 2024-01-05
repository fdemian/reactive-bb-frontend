const USER_ID = 'ID';
const USER_USERNAME = 'USER_USERNAME';
const REFRESH_TIMEOUT = 'REFRESH_TIMEOUT';
const TOKEN_TTL = 'TOKEN_TTL';
const BANNED_USER = 'BANNED_USER';
const BAN_REASON = 'BAN_REASON';
const USER_TYPE = 'USER_TYPE';

export const getUserId = () => {
    const stringId = localStorage.getItem(USER_ID);
    return stringId === null ? null : parseInt(stringId, 10);
};

export const getUserName = () => {
    return localStorage.getItem(USER_USERNAME);
};

export const setLoginData = (id, username, ttl) => {
    localStorage.setItem(USER_ID, id);
    localStorage.setItem(USER_USERNAME, username);
    localStorage.setItem(TOKEN_TTL, ttl);
};

const clearTTL = () => localStorage.removeItem(TOKEN_TTL);
const getTTLForToken = () => parseInt(localStorage.getItem(TOKEN_TTL), 10);

const removeCurrentTimeout = () => {
    const timeoutElem = localStorage.getItem(REFRESH_TIMEOUT);
    const timeoutId = parseInt(timeoutElem, 10);
    if (!isNaN(timeoutId)) {
        clearTimeout(timeoutId);
    }
    localStorage.removeItem(REFRESH_TIMEOUT);
};

const saveTimeout = (id) => localStorage.setItem(REFRESH_TIMEOUT, id);

export const clearUser = () => {
    removeCurrentTimeout();
    clearTTL();
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(BANNED_USER);
    localStorage.removeItem(BAN_REASON);
    localStorage.removeItem(USER_TYPE);
};

export const authenticateUser = async (username, password) => {
    const jsonData = JSON.stringify({
        username: username,
        password: password
    });
    const resp = await fetch('/api/login', {
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
export const refreshToken = async (onFail) => {
    const user = getUserId();
    if (user === null) {
        onFail();
        return;
    }

    const resp = await fetch('/api/refresh', { method: 'POST' });

    if (!resp.ok) {
        if (onFail) {
            onFail();
        }
    }

    const data = await resp.json();

    if (data.ok) {
        const expiration = getTTLForToken();
        const id = setTimeout(refreshToken, expiration);
        removeCurrentTimeout();
        saveTimeout(id);
    } else {
        if (onFail) {
            onFail();
        }
    }
};

export const getBanStatus = () => {
    const banned = localStorage.getItem(BANNED_USER);
    const banReason = localStorage.getItem(BAN_REASON);
    return {
        banned: banned === 'true',
        banReason: banReason
    };
};

export const setBanStatus = (banned, banReason) => {
    localStorage.setItem(BANNED_USER, banned);
    localStorage.setItem(BAN_REASON, banReason);
};

export const clearBanStatus = () => {
    localStorage.removeItem(BANNED_USER);
    localStorage.removeItem(BAN_REASON);
    localStorage.setItem(BANNED_USER, false);
};

export const setUserType = (type) => {
    localStorage.setItem(USER_TYPE, type);
};

export const getUserType = () => {
    return localStorage.getItem(USER_TYPE);
};