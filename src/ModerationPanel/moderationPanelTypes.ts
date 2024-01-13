import { UserType } from '../User/userTypes';

export type FlaggedDataType = {
    postId: number;
    userId: number;
    reasonId: number;
    reasonText: string;
};

export type TranslationFn = (key: string) => string;

export type FlaggedMessagesProps = {
    t: TranslationFn;
};

export type BanUserTypes = {
    user: UserType | null;
    goBack: () => void;
    setScreenType: (p: any) => void;
    t: TranslationFn;
};

export type SearchUserTypes = {
    setScreenType: (p: any) => void;
    setUserToBan: (u: UserType) => void;
    t: TranslationFn;
};

export type SearchUserListProps = {
    users: UserType[];
    setScreenType: (p: any) => void;
    setUserToBan: (u: UserType) => void;
    t: TranslationFn;
};

export type FlaggedPost = {
    postId: number;
    userId: number;
    reasonId: number;
    reasonText: string;
};
