import { UserType } from '../User/userTypes';

export interface FlaggedDataType {
  postId: number;
  userId: number;
  reasonId: number;
  reasonText: string;
}

export type TranslationFn = (key: string) => string;

export interface FlaggedMessagesProps {
  t: TranslationFn;
}

export interface BanUserTypes {
  user: UserType | null;
  goBack: () => void;
  setScreenType: (p: any) => void;
  t: TranslationFn;
}

export interface SearchUserTypes {
  setScreenType: (p: any) => void;
  setUserToBan: (u: UserType) => void;
  t: TranslationFn;
}

export interface SearchUserListProps {
  users: UserType[];
  setScreenType: (p: any) => void;
  setUserToBan: (u: UserType) => void;
  t: TranslationFn;
}

export interface FlaggedPost {
  postId: number;
  userId: number;
  reasonId: number;
  reasonText: string;
}
