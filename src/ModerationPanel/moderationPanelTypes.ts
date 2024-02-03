import { UserType } from '../User/userTypes';

export interface MentionTypeUser {
  __typename?: "User" | undefined;
  id: number;
  username: string;
  avatar?: string | null | undefined;
  banned: boolean;
  banReason?: string | null | undefined;
  banExpires?: any;
};


export interface FlaggedDataType {
  postId: number;
  userId: number;
  reasonId: number;
  reasonText?: string | null | undefined;
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
  setUserToBan: (u: MentionTypeUser) => void;
  t: TranslationFn;
}

export interface SearchUserListProps {
  users: MentionTypeUser[];
  setScreenType: (p: any) => void;
  setUserToBan: (u: MentionTypeUser) => void;
  t: TranslationFn;
}

export interface FlaggedPost {
  postId: number;
  userId: number;
  reasonId: number;
  reasonText: string;
}
