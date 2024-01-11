import { UserType } from "../User/userTypes";

type InsertImageProps = {
    src: string; 
    altText: string; 
};

type InsertImageInlineProps = {
   altText: string; 
   position: string;
   showCaption: boolean;
   src: string;
};

export type EntryComponentTypes = {
  option: { 
    id: number;
    avatar?:string | null | undefined; 
    name:string;
  }
};

export type MentionType = {
  id: number;
  name: string;
  link: string;
};

export type EditorProps = {
  initialState: string;
  containerRef: any;
  user: UserType;
  mentions: MentionType[];
  setMentions: (mentions:MentionType[]) => void;
  isMobile: boolean;
};

export type FooterProps = {
  inlineModalUpdateVisible: boolean;
  setInlineModalUpdateVisible: (p:boolean) => void;
  inlineImagemodalProps: {
     activeEditor: any;
     nodeKey: string;
  } | {};
  insertImage: (p:InsertImageProps) => void;
  insertInlineImage: (p:InsertImageInlineProps) => void;
  inlineImageModalVisible: boolean;
  setInlineImageModalVisible: (p:boolean) => void;
  editor: any;
  canUndo: boolean;
  canRedo: boolean;
  t:(key:string) => string;
};

export type InsertEquationProps = {   
 equation: string;
 inline: boolean;
}

export type MobileDrawerProps = {
    isMobile: boolean;
    equationModalVisible: boolean;
    equation: string;
    setEquation: (val:string) => void;
    inline: boolean;
    setInline: (val:boolean) => void;
    editor: any;
    formats: FormatsType | {};
    insertEquation: (val:InsertEquationProps) => void;
    toggleEquationModal: (val:boolean) => void;
    imageModalVisible: boolean;
    toggleImageModal: () => void;
    tweetToolbarVisible: boolean;
    toggleTweetToolbar: () => void;
    tableToolbarVisible: boolean;
    toggleTableToolbar: () => void;
    videoToolbar: boolean;
    toggleVideoToolbar: () => void;
    insertImage: (val:InsertImageProps) => void;
    t:(key:string) => string;
};

type FormatsType = {
    blockType: string;
    selectedElementKey: string;
    isLink: boolean;
    isBold: boolean;
    isSpoiler: boolean;
    isKeyboard: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isStrikethrough: boolean;
    isSubscript: boolean;
    isSuperscript: boolean;
    isCode: boolean;
    canUndo: boolean;
    canRedo: boolean;
    isRTL: boolean;
    codeLanguage: string;
    fontSize: string;
    fontColor: string;
    bgColor: string;
    fontFamily: string;
};

export type InlineImageProps = {
  altText: string;
  position: string;
  showCaption: boolean;
  src: string;
 };
 
 export type ImageProps = {
   altText: string;
   caption?: any;
   height?: number;
   key?: any;
   maxWidth?: number;
   showCaption?: boolean;
   src: string;
   width?: number;
   captionsEnabled?: boolean;
 };
 
export type ToolbarProps = {
    equationModalVisible: boolean;
    equation: string;
    setEquation: (val:string) => void;
    inline: boolean;
    setInline: (val:boolean) => void;
    editor: any;
    formats: FormatsType | {};
    bgColorModalVisible: boolean;
    fontColorModalVisible: boolean;
    insertEquation: (val:InsertEquationProps) => void;
    clearFormatting: () => void;
    toggleEquationModal: () => void;
    toggleBgColorModal:  () => void;
    toggleFontColorModal:() => void;
    imageModalVisible: boolean;
    toggleImageModal:  () => void;
    tweetToolbarVisible: boolean;
    toggleTweetToolbar:  () => void;
    toggleExcalidrawModal: () => void;
    tableToolbarVisible: boolean;
    toggleTableToolbar: () => void;
    videoToolbar: boolean;
    toggleVideoToolbar:  () => void;
    insertImage: (val:InsertImageProps) => void;
    t:(key:string) => string;
};