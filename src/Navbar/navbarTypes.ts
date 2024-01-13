import { ApolloError } from '@apollo/client';
import { UserType } from '../User/userTypes';

interface UserNotificationType {
  id: number;
  avatar: string;
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
  data: {
    chatsByUser: ChatType[];
  };
  loading: boolean;
  error?: ApolloError | undefined;
}

interface MarkReadParams {
  variables: {
    notifications: number[];
  };
  optimisticResponse: {
    markAsRead: NotificationType[];
  };
}

export interface NavbarLoggedProps {
  loading: boolean;
  userType: string | null;
  user: UserType;
  chats: ChatsByUserResponse;
  chatSubscription: () => void;
  notifications: NotificationType[];
  notificationsEnabled: boolean;
  newSubscription: () => void;
  logoutFn: () => void;
  markAsRead: (p: MarkReadParams) => void;
  t: (key: string) => string;
}

export interface NotificationType {
  id: number;
  link: string;
  type: 'like' | 'mention';
  read: boolean;
  originator: UserNotificationType;
  user: UserNotificationType;
}
