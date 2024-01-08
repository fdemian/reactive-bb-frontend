
export type PostType = {
    id: number;
    topicId: number;
    content: string;
};

export type TopicType = {
    id: number;
    name: string;
};

export type LikeType = {
   id: number;
   post:PostType;
};

export type UserType = {
    id: number;
    username: string;
    avatar: string;
    fullname: string;
    email: string;
    status: string;
    about: string;
    type: string;
    banned: boolean;
    banReason: string;
};