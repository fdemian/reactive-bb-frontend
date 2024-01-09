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

export type EditorProps = {
  initialState: string;
  containerRef: any;
  user: UserType;
  mentions: UserType[];
  setMentions: (mentions:UserType[]) => void;
  isMobile: boolean;
};

export type FooterProps = {
  inlineModalUpdateVisible: boolean;
  setInlineModalUpdateVisible: (p:boolean) => void;
  inlineImagemodalProps: {
     activeEditor: any;
     nodeKey: string;
  };
  insertImage: (p:InsertImageProps) => void;
  insertInlineImage: (p:InsertImageInlineProps) => void;
  inlineImageModalVisible: boolean;
  setInlineImageModalVisible: (p:boolean) => void;
  editor: any;
  canUndo: boolean;
  canRedo: boolean;
  t:(key:string) => string;
};

type InsertEquationProps = {   
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
    insertEquation: (val:InsertEquationProps) => void;
    toggleEquationModal: (val:boolean) => void;
    imageModalVisible: boolean;
    toggleImageModal: (val:boolean) => void;
    tweetToolbarVisible: boolean;
    toggleTweetToolbar: (val:boolean) => void;
    tableToolbarVisible: boolean;
    toggleTableToolbar: (val:boolean) => void;
    videoToolbar: boolean;
    toggleVideoToolbar: (val:boolean) => void;
    insertImage: (val:string) => void;
    t:(key:string) => string;
};


export type ToolbarProps = {
    equationModalVisible: boolean;
    equation: string;
    setEquation: (val:string) => void;
    inline: boolean;
    setInline: (val:string) => void;
    editor: any;
    formats: {
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
    insertEquation: (val:InsertEquationProps) => void;
    clearFormatting: () => void;
    toggleEquationModal: (val:boolean) => void;
    toggleBgColorModal:  (val:boolean) => void;
    toggleFontColorModal:(val:boolean) => void;
    imageModalVisible: boolean;
    toggleImageModal:  (val:boolean) => void;
    tweetToolbarVisible: boolean;
    toggleTweetToolbar:  (val:boolean) => void;
    toggleExcalidrawModal: (val:boolean) => void;
    tableToolbarVisible: boolean;
    toggleTableToolbar: (val:boolean) => void;
    videoToolbar: boolean;
    toggleVideoToolbar:  (val:boolean) => void;
    insertImage: (val:string) => void;
    t:(key:string) => string;
};

/*
export type ToolbarProps = {

Toolbar.propTypes = {
  
};
}*/