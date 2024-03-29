import { ApolloError, MutationFunctionOptions, ApolloCache } from '@apollo/client';
import { UserType } from '../User/userTypes';
import { GetChatsByUserQuery, MarkNotificationsReadMutation, Exact, InputMaybe }  from '../__generated__/graphql';

export type MarkNotificationsMutation = (options?: MutationFunctionOptions<MarkNotificationsReadMutation, Exact<{ notifications?: InputMaybe<number | number[]> | undefined; }>, any, ApolloCache<any>> | undefined) => Promise<any>;

interface UserNotificationType {
  id: number;
  avatar?: string | null | undefined;
  username: string;
}

export interface ChatType {
  author: {
    id: number;
    avatar: string;
    username: string;
  };
  read: boolean;
}

export interface MessageType {
  id: number;
  avatar: string;
  username: string;
  read: boolean;
}

export interface ChatsByUserResponse {
  data: GetChatsByUserQuery | undefined;
  loading: boolean;
  error?: ApolloError | undefined;
}

export interface NavbarLoggedProps {
  loading: boolean;
  userType: string | null;
  user: UserType | undefined | null;
  chats: ChatsByUserResponse | undefined;
  chatSubscription: () => void;
  notifications: NotificationType[] | undefined | null;
  notificationsEnabled: boolean;
  newSubscription: () => void;
  logoutFn: () => void;
  markAsRead: MarkNotificationsMutation;
  t: (key: string) => string;
}

export interface NotificationType {
  id: number;
  link: string;
  type: string;
  read: boolean;
  originator: UserNotificationType;
  user: UserNotificationType;
}
