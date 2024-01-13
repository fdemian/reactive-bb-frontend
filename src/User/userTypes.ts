export interface PostType {
  id: number;
  topicId: number;
  content: string;
}

export interface TopicType {
  id: number;
  name: string;
}

export interface LikeType {
  id: number;
  post: PostType;
}

export interface UserType {
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
  banExpires: string;
}
