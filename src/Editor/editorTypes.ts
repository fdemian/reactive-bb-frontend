/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalliopeFormatTypes } from './toolbarUtils';
import { UserType } from '../User/userTypes';
import { InlineImageModalProps } from './InlineImageModal/InlineImageModal';
import { CalliopeContainerType } from 'kalliope';
import { MentionTypeUser } from '../ModerationPanel/moderationPanelTypes';
import { UserTypePost } from '../Posts/postTypes';

interface InsertImageProps {
  src: string;
  altText: string;
}

interface InsertImageInlineProps {
  altText: string;
  position: string;
  showCaption: boolean;
  src: string;
}

export interface EntryComponentTypes {
  option: {
    id: number;
    avatar?: string | null | undefined;
    name: string;
  };
}

export interface MentionType {
  id: number;
  name: string;
  link: string;
}

export interface EditorProps {
  initialState: string | undefined;
  containerRef: { current: CalliopeContainerType | null };
  user: UserType | MentionTypeUser | UserTypePost | null;
  mentions: MentionType[];
  setMentions: (mentions: MentionType[]) => void;
  isMobile: boolean;
}


export interface FooterProps {
  inlineModalUpdateVisible: boolean;
  setInlineModalUpdateVisible: (p: boolean) => void;
  inlineImagemodalProps: InlineImageModalProps | null;
  insertImage: (p: InsertImageProps) => void;
  insertInlineImage: (p: InsertImageInlineProps) => void;
  inlineImageModalVisible: boolean;
  setInlineImageModalVisible: (p: boolean) => void;
  editor: any;
  canUndo: boolean;
  canRedo: boolean;
  t: (key: string) => string;
}

export interface InsertEquationProps {
  equation: string;
  inline: boolean;
}

export interface MobileDrawerProps {
  isMobile: boolean;
  equationModalVisible: boolean;
  equation: string;
  setEquation: (val: string) => void;
  inline: boolean;
  setInline: (val: boolean) => void;
  editor: any;
  formats: CalliopeFormatTypes | null;
  insertEquation: (val: InsertEquationProps) => void;
  toggleEquationModal: (val: boolean) => void;
  imageModalVisible: boolean;
  toggleImageModal: () => void;
  tweetToolbarVisible: boolean;
  toggleTweetToolbar: () => void;
  tableToolbarVisible: boolean;
  toggleTableToolbar: () => void;
  videoToolbar: boolean;
  toggleVideoToolbar: () => void;
  insertImage: (val: InsertImageProps) => void;
  t: (key: string) => string;
}

export interface InlineImageProps {
  altText: string;
  position: string;
  showCaption: boolean;
  src: string;
}

export interface ImageProps {
  altText: string;
  caption?: any;
  height?: number;
  key?: any;
  maxWidth?: number;
  showCaption?: boolean;
  src: string;
  width?: number;
  captionsEnabled?: boolean;
}

export interface ToolbarProps {
  equationModalVisible: boolean;
  equation: string;
  setEquation: (val: string) => void;
  inline: boolean;
  setInline: (val: boolean) => void;
  editor: any;
  formats: CalliopeFormatTypes | null;
  bgColorModalVisible: boolean;
  fontColorModalVisible: boolean;
  insertEquation: (val: InsertEquationProps) => void;
  clearFormatting: () => void;
  toggleEquationModal: () => void;
  toggleBgColorModal: () => void;
  toggleFontColorModal: () => void;
  imageModalVisible: boolean;
  toggleImageModal: () => void;
  tweetToolbarVisible: boolean;
  toggleTweetToolbar: () => void;
  toggleExcalidrawModal: () => void;
  tableToolbarVisible: boolean;
  toggleTableToolbar: () => void;
  videoToolbar: boolean;
  toggleVideoToolbar: () => void;
  insertImage: (val: InsertImageProps) => void;
  t: (key: string) => string;
}
