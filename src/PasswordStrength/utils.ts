import zxcvbn from 'zxcvbn';

export const PASSWORD_COLORS = [
    "#ff0000",
    "#ff0000",
    "#ffd908",
    "#cbe11d",
    "#6ecc3a"
];

export const translateStrings = [
    "riskyPassword",
    "weakPassword",
    "normalPassword",
    "strongPassword",
    "veryStrongPassword"
];

export const getPasswordScore = (password:string) => {
    const passwordStats = zxcvbn(password);
    return passwordStats.score;
}