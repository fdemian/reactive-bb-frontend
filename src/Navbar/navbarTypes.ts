import { ApolloError } from '@apollo/client';
import { UserType } from '../User/userTypes';

type UserNotificationType = {
    id: number;
    avatar: string;
    username: string;
};

export type ChatType = {
    author: {
      id: number;
      avatar: string;
      username: string;
    };
    read: boolean;
};

export type MessageType = {
    id: number;
    avatar: string;
    username: string;
    read: boolean;
};


export type ChatsByUserResponse = {
    data: { 
        chatsByUser: ChatType[] 
    }; 
    loading: boolean; 
    error?: ApolloError | undefined;
};

type MarkReadParams = {
    variables: {
        notifications: number[],
    };
    optimisticResponse: {
        markAsRead: NotificationType[],
    };
};

export type NavbarLoggedProps = {
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
    t: (key:string) => string;
};

export type NotificationType = {
    id: number;
    link: string;
    type: "like" | "mention";
    read: boolean;
    originator: UserNotificationType;
    user: UserNotificationType;
};