import { BanStatusReturn } from '../Login/authUtils';
import { MentionType } from '../Editor/editorTypes';
import { CalliopeContainerType } from 'kalliope';

interface CategoryType {
  id: number;
  name: string;
}

export interface UserTypePost { 
  __typename?: "User" | undefined; 
  id: number; 
  avatar?: string | null | undefined; 
  username: string; 
  status?: string | null | undefined; 
};

interface TopicType {
  __typename?: "Topic" | undefined;
  id: number;
  name: string;
  views: number;
  replies: number;
  created: Date;
  closed: boolean;
  tags?: string | null | undefined;
  user: UserTypePost;
  category?: CategoryType | null;
}

export interface PostToQuote {
  id: number;
  content: string;
  user: UserTypePost;
}

export interface LikeType {
  __typename?: "Like" | undefined;
  id: number;
  userId: number;
  postId: number;
}

export interface BookmarkType {
  id: number;
  userId: number;
  postId: number;
}

export interface PostType  {
   __typename?: "Post" | undefined; 
   id: number; content: string; 
   edited: boolean; 
   created: any;
   user: UserTypePost;
   likes?: LikeType[] | null;
   __ref?: string;
};

export interface TopicRepliesProps {
  userType: string;
  banStatus: BanStatusReturn;
  quotePost: (post: PostType) => void;
  removePost: (post: number) => void;
  topic: TopicType;
  replies: PostType[] | undefined | null;
  isLoggedIn: boolean;
  userId: number;
  selectedPost: string;
  isMobile: boolean;
  isClosed: boolean;
  openFlagPostDialog: (id: number) => void;
  editablePost: number | null;
  setEditablePost: (id: number | null) => void;
  editUserPost: (id: number) => void;
  containerRef: { current: CalliopeContainerType | null };
  user: UserTypePost | null;
  t: (key: string) => string;
}

export interface PostFooterProps {
  item: PostType;//
  userId: number;
  topic: TopicType;
  banStatus: BanStatusReturn;
  bookmarksByPostList: BookmarkType[];
  isLoggedIn: boolean;
  isMobile: boolean;
  quotePost: (id: PostType) => void;
  replyAsNewPost: (item: PostType) => void;
  openFlagPostDialog: (id: number) => void;
  t: (key: string) => string;
}

export interface TopicModifyButtonsProps {
  closed: boolean;
  reopenTopic: () => void;
  closeTopic: () => void;
  deleteTopic: () => void;
  userType: string;
  t: (key: string) => string;
}

export interface ReplyTitleProps {
  topic: TopicType;
  isMobile: boolean;
}

export interface ReplyDrawerProps {
  createPost: () => void;
  onClose: () => void;
  open: boolean;
  user: UserTypePost | null;
  topic: TopicType;
  containerRef: { current: CalliopeContainerType | null };
  isMobile: boolean;
  mentions: MentionType[];
  setMentions: (p: MentionType[]) => void;
}