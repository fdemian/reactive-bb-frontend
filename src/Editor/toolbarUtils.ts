import { 
    faTrash,
    faBold, 
    faItalic, 
    faUnderline, 
    faStrikethrough, 
    faSuperscript, 
    faSubscript,
    faEye,
    faKeyboard,
    faAlignLeft,
    faAlignRight,
    faAlignCenter,
    faAlignJustify,
    faParagraph,
    faHeading,
    faListUl,
    faListOl,
    faSquareCheck,
    faQuoteLeft,
    faCode,
    faRulerHorizontal,
    faCaretRight,
    faCaretDown,
    faImage,
    faDiagramProject,
    faTable,
    faCalculator,
    faVideo,
    faOutdent,
    faIndent,
    faFill,
    faTextHeight
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { SIGN, getLinkIcon } from './utils';

export const recomendedColors = [
    '#000000',
    '#000000E0',
    '#000000A6',
    '#00000073',
    '#00000040',
    '#00000026',
    '#0000001A',
    '#00000012',
    '#0000000A',
    '#00000005',
    '#F5222D',
    '#FA8C16',
    '#FADB14',
    '#8BBB11',
    '#52C41A',
    '#13A8A8',
    '#1677FF',
    '#2F54EB',
    '#722ED1',
    '#EB2F96',
    '#F5222D4D',
    '#FA8C164D',
    '#FADB144D',
    '#8BBB114D',
    '#52C41A4D',
    '#13A8A84D',
    '#1677FF4D',
    '#2F54EB4D',
    '#722ED14D',
    '#EB2F964D'
];

type TranslationFn = (key:string) => string;

// TODO: .... formats should be typed  ....

const BOLD_ELEMENT = (t:TranslationFn, formats:any) => (
    {
        name: t('toolbar.bold'),
        text: `${t('toolbar.bold')} (${SIGN} + B)`,
        command: 'FORMAT',
        props: 'bold',
        icon:  faBold,
        isActive: formats.isBold,
});

const ITALIC_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.italic'),
    text: `${t('toolbar.italic')} (${SIGN} + I)`,
    command: 'FORMAT',
    props: 'italic',
    icon: faItalic,
    isActive: formats.isItalic,
});

const UNDERLINE_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.underline'),
    text: `${t('toolbar.underline')} (${SIGN} + U)`,
    command: 'FORMAT',
    props: 'underline',
    icon: faUnderline,
    isActive: formats.isUnderline,
});

const STRIKETHROUGH_ELEMENT = (t:TranslationFn, formats:any) => ({
        name: t('toolbar.strikethrough'),
        text: t('toolbar.strikethrough'),
        command: 'FORMAT',
        props: 'strikethrough',
        icon: faStrikethrough ,
        isActive: formats.isStrikethrough,
});

const SUPERSCRIPT_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.superscript'),
    text: t('toolbar.superscript'),
    command: 'FORMAT',
    props: 'superscript',
    icon: faSuperscript,
    isActive: formats.isSuperscript,
});


const SUBSCRIPT_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.subscript'),
    text: t('toolbar.subscript'),
    command: 'FORMAT',
    props: 'subscript',
    icon: faSubscript,
    isActive: formats.isSubscript,
});

const CODE_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.code'),
    text: t('toolbar.code'),
    command: 'FORMAT',
    props: 'code',
    icon: faCode,
    isActive: formats.isCode,
});

const SPOILER_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.spoiler'),
    text: t('toolbar.spoiler'),
    command: 'SPOILER',
    props: null,
    icon: faEye,
    isActive: formats.isSpoiler,
});

const KEYBOARD_ELEMENT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.keyboard'),
    text: t('toolbar.keyboard'),
    command: 'KEYBOARD',
    props: null,
    icon: faKeyboard,
    isActive: formats.isKeyboard,
});

const LINK_ELEMENT = (t:TranslationFn, formats:any) => ({
   name: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
   text: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
   command: 'LINK',
   icon: getLinkIcon(formats.isLink),
   props: formats.isLink ? null : 'https://',
   isActive: formats.isLink,
});

const ALIGN_LEFT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.alignLeft'),
    text: t('toolbar.alignLeft'),
    command: 'ALIGN',
    icon: faAlignLeft,
    props: 'left',
    directCommand: true,
});

const ALIGN_RIGHT = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.alignRight'),
    text: t('toolbar.alignRight'),
    command: 'ALIGN',
    icon: faAlignRight,
    props: 'right',
    directCommand: true,
});

const ALIGN_CENTER = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.alignCenter'),
    text: t('toolbar.alignCenter'),
    command: 'ALIGN',
    icon: faAlignCenter,
    props: 'center',
    directCommand: true
});

const ALIGN_JUSTIFY = (t:TranslationFn, formats:any) => ({
    name: t('toolbar.alignJustify'),
    text: t('toolbar.alignJustify'),
    command: 'ALIGN',
    icon: faAlignJustify,
    props: 'justify',
    directCommand: true,
});


//name: getProperty('isLink', formats) ? t('toolbar.removeLink') : t('toolbar.addLink'),

export const getButtonElementsToolbarDesktop = (t:(key:string)=>string, formats:any) => {
    return [
        BOLD_ELEMENT(t, formats),
        ITALIC_ELEMENT(t, formats),
        UNDERLINE_ELEMENT(t, formats),
        STRIKETHROUGH_ELEMENT(t, formats),
        SUPERSCRIPT_ELEMENT(t, formats),
        SUBSCRIPT_ELEMENT(t, formats),
        CODE_ELEMENT(t, formats),
        SPOILER_ELEMENT(t, formats),
        KEYBOARD_ELEMENT(t, formats),
        LINK_ELEMENT(t, formats),
        ALIGN_LEFT(t, formats),
        ALIGN_RIGHT(t, formats),
        ALIGN_CENTER(t, formats),
        ALIGN_JUSTIFY(t, formats),
    ];
}


export const getButtonElementsToolbarMobile = (t:(key:string)=>string, formats:any) => {
    return [
        BOLD_ELEMENT(t, formats),
        ITALIC_ELEMENT(t, formats),
        UNDERLINE_ELEMENT(t, formats),
        STRIKETHROUGH_ELEMENT(t, formats),
        SUPERSCRIPT_ELEMENT(t, formats),
        SUBSCRIPT_ELEMENT(t, formats),
        CODE_ELEMENT(t, formats),
        SPOILER_ELEMENT(t, formats),
        KEYBOARD_ELEMENT(t, formats),
        LINK_ELEMENT(t, formats)
    ]
}

export const FONT_FAMILIES = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
];

export const FONT_SIZES = [
    '10px',
    '11px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '17px',
    '18px',
    '19px',
    '20px',
];

/* 
const BOLD_ELEM = {
  name: t('toolbar.bold'),
  text: `${t('toolbar.bold')} (${SIGN} + B)`,
  command: 'FORMAT',
  props: 'bold',
  icon:  faBold,
  isActive: formats.isBold,
};

const BUTTON_ELEMENTS = [
   
    {
        name: t('toolbar.italic'),
        text: `${t('toolbar.italic')} (${SIGN} + I)`,
        command: 'FORMAT',
        props: 'italic',
        icon: faItalic,
        isActive: formats.isItalic,
    },
    {
        name: t('toolbar.underline'),
        text: `${t('toolbar.underline')} (${SIGN} + U)`,
        command: 'FORMAT',
        props: 'underline',
        icon: faUnderline,
        isActive: formats.isUnderline,
    },
    {
        name: t('toolbar.strikethrough'),
        text: t('toolbar.strikethrough'),
        command: 'FORMAT',
        props: 'strikethrough',
        icon: faStrikethrough ,
        isActive: formats.isStrikethrough,
    },
    {
        name: t('toolbar.superscript'),
        text: t('toolbar.superscript'),
        command: 'FORMAT',
        props: 'superscript',
        icon: faSuperscript,
        isActive: formats.isSuperscript,
    },
    {
        name: t('toolbar.subscript'),
        text: t('toolbar.subscript'),
        command: 'FORMAT',
        props: 'subscript',
        icon: faSubscript,
        isActive: formats.isSubscript,
    },
    {
        name: t('toolbar.code'),
        text: t('toolbar.code'),
        command: 'FORMAT',
        props: 'code',
        icon: faCode,
        isActive: formats.isCode,
    },
    {
        name: t('toolbar.spoiler'),
        text: t('toolbar.spoiler'),
        command: 'SPOILER',
        props: null,
        icon: faEye,
        isActive: formats.isSpoiler,
    },
    {
        name: t('toolbar.keyboard'),
        text: t('toolbar.keyboard'),
        command: 'KEYBOARD',
        props: null,
        icon: faKeyboard,
        isActive: formats.isKeyboard,
    },
    {
        name: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
        text: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
        command: 'LINK',
        icon: getLinkIcon(formats.isLink),
        props: formats.isLink ? null : 'https://',
        isActive: formats.isLink,
    },
    {
        name: t('toolbar.alignLeft'),
        text: t('toolbar.alignLeft'),
        command: 'ALIGN',
        icon: faAlignLeft,
        props: 'left',
        directCommand: true,
    },
    {
        name: t('toolbar.alignRight'),
        text: t('toolbar.alignRight'),
        command: 'ALIGN',
        icon: faAlignRight,
        props: 'right',
        directCommand: true,
    },
    {
        name: t('toolbar.alignCenter'),
        text: t('toolbar.alignCenter'),
        command: 'ALIGN',
        icon: faAlignCenter,
        props: 'center',
        directCommand: true,
    },
    {
        name: t('toolbar.alignJustify'),
        text: t('toolbar.alignJustify'),
        command: 'ALIGN',
        icon: faAlignJustify,
        props: 'justify',
        directCommand: true,
    }
];

const DROPDOWN_FORMATS = [
    {
        name: t('toolbar.normal'),
        icon: faParagraph,
        blockType: 'paragraph',
        value: 'PARAGRAPH',
    },
    {
        name: t('toolbar.heading1'),
        icon: faHeading,
        blockType: 'h1',
        value: 'H1',
    },
    {
        name: t('toolbar.heading2'),
        icon: faHeading,
        blockType: 'h2',
        value: 'H2',
    },
    {
        name: t('toolbar.heading3'),
        icon: faHeading,
        blockType: 'h3',
        value: 'H3',
    },
    {
        name: t('toolbar.bulletList'),
        icon: faListUl,
        blockType: 'bullet',
        value: 'BULLET_LIST',
    },
    {
        name: t('toolbar.numberedList'),
        icon: faListOl,
        blockType: 'number',
        value: 'NUMBERED_LIST',
    },
    {
        name: t('toolbar.checkList'),
        icon: faSquareCheck,
        blockType: 'check',
        value: 'CHECK',
    },
    {
        name: t('toolbar.quote'),
        icon: faQuoteLeft,
        blockType: 'quote',
        value: 'QUOTE',
    },
    {
        name: t('toolbar.codeBlock'),
        icon: faCode,
        blockType: 'code',
        value: 'CODE_BLOCK',
    },
];

const FONT_FAMILIES = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
];

const FONT_SIZES = [
    '10px',
    '11px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '17px',
    '18px',
    '19px',
    '20px',
];

const INSERT_ELEMENTS = [
    {
        text: t('toolbar.rule'),
        onClick: () => editor.executeCommand('INSERT_RULE', null),
        icon: faRulerHorizontal,
    },
    {
        text: t('toolbar.blockSpoiler'),
        onClick: () => editor.executeCommand('INSERT_BLOCK_SPOILER', null),
        icon: faCaretRight,
    },
    {
        text: t('toolbar.image'),
        onClick: toggleImageModal,
        icon: faImage,
    },
    {
        text: t('toolbar.insertTweet'),
        onClick: toggleTweetToolbar,
        icon: faTwitter,
    },
    {
        text: t('toolbar.excalidraw'),
        onClick: () => toggleExcalidrawModal(),
        icon: faDiagramProject,
    },
    {
        text: t('toolbar.table'),
        onClick: toggleTableToolbar,
        icon: faTable,
    },
    {
        text: t('toolbar.equation'),
        onClick: toggleEquationModal,
        icon: faCalculator,
    },
    {
        text: t('toolbar.video'),
        onClick: toggleVideoToolbar,
        icon: faVideo,
    },
];

*/