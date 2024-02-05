import { UserType } from '../User/userTypes';
import { BanStatusReturn } from '../Login/authUtils';
import { MentionType } from '../Editor/editorTypes';
import { CalliopeContainerType } from 'kalliope';

interface CategoryType {
  id: number;
  name: string;
}

interface TopicType {
  id: number;
  name: string;
  views: number;
  replies: number;
  created: Date;
  closed: boolean;
  tags: string;
  user: UserType;
  category: CategoryType;
}

export interface PostToQuote {
  id: number;
  content: string;
  user: UserType;
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
   user: UserType;
   likes?: LikeType[];
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
  user: UserType | null;
  t: (key: string) => string;
}

export interface PostFooterProps {
  item: PostType;
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
  user: UserType | null;
  topic: TopicType;
  containerRef: { current: CalliopeContainerType | null };
  isMobile: boolean;
  mentions: MentionType[];
  setMentions: (p: MentionType[]) => void;
}