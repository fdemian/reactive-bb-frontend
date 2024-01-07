import { UserType } from '../User/userTypes';

type UserNotificationType = {
    id: number;
    avatar: string;
    username: string;
};

type ChatNotificationType = {
    data: UserNotificationType[];
    loading: boolean;
    error: boolean;
};


export type NavbarLoggedProps = { 
    loading: boolean;
    userType: string;
    user: UserType;
    t: (key:string) => string;
    chats: ChatNotificationType;
    chatSubscription: () => void;
    notifications: NotificationType[];
    newSubscription: () => void;
    logoutFn: () => void;
    markAsRead: (n: number[]) => void; 
};


export type NotificationType = {
    id: number;
    link: string;
    type: "like" | "mention";
    read: boolean;
    originator: UserNotificationType;
    user: UserNotificationType;
};