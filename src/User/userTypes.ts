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
  avatar?: string | null | undefined;
  fullname: string;
  email: string;
  status?: string | null | undefined;
  about?: string | null | undefined;
  type: string;
  banned: boolean;
  banReason?: string | null | undefined;
  banExpires?: string;
  __typename?: "User" | undefined;
}