import {
  /*faTrash,*/
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
} from '@fortawesome/free-solid-svg-icons';
import type { ColorVal, TableType } from './utils';
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
  '#EB2F964D',
];

type TranslationFn = (key: string) => string;

export interface CalliopeFormatTypes {
  blockType: string | null;
  selectedElementKey: string | null;
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
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface EditorType {
  executeCommand: (command: string, params?: any) => void;
}

const BOLD_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.bold'),
  text: `${t('toolbar.bold')} (${SIGN} + B)`,
  command: 'FORMAT',
  props: 'bold',
  icon: faBold,
  isActive: formats.isBold,
});

const ITALIC_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.italic'),
  text: `${t('toolbar.italic')} (${SIGN} + I)`,
  command: 'FORMAT',
  props: 'italic',
  icon: faItalic,
  isActive: formats.isItalic,
});

const UNDERLINE_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.underline'),
  text: `${t('toolbar.underline')} (${SIGN} + U)`,
  command: 'FORMAT',
  props: 'underline',
  icon: faUnderline,
  isActive: formats.isUnderline,
});

const STRIKETHROUGH_ELEMENT = (
  t: TranslationFn,
  formats: CalliopeFormatTypes
) => ({
  name: t('toolbar.strikethrough'),
  text: t('toolbar.strikethrough'),
  command: 'FORMAT',
  props: 'strikethrough',
  icon: faStrikethrough,
  isActive: formats.isStrikethrough,
});

const SUPERSCRIPT_ELEMENT = (
  t: TranslationFn,
  formats: CalliopeFormatTypes
) => ({
  name: t('toolbar.superscript'),
  text: t('toolbar.superscript'),
  command: 'FORMAT',
  props: 'superscript',
  icon: faSuperscript,
  isActive: formats.isSuperscript,
});

const SUBSCRIPT_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.subscript'),
  text: t('toolbar.subscript'),
  command: 'FORMAT',
  props: 'subscript',
  icon: faSubscript,
  isActive: formats.isSubscript,
});

const CODE_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.code'),
  text: t('toolbar.code'),
  command: 'FORMAT',
  props: 'code',
  icon: faCode,
  isActive: formats.isCode,
});

const SPOILER_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.spoiler'),
  text: t('toolbar.spoiler'),
  command: 'SPOILER',
  props: null,
  icon: faEye,
  isActive: formats.isSpoiler,
});

const KEYBOARD_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: t('toolbar.keyboard'),
  text: t('toolbar.keyboard'),
  command: 'KEYBOARD',
  props: null,
  icon: faKeyboard,
  isActive: formats.isKeyboard,
});

const LINK_ELEMENT = (t: TranslationFn, formats: CalliopeFormatTypes) => ({
  name: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
  text: formats.isLink ? t('toolbar.removeLink') : t('toolbar.addLink'),
  command: 'LINK',
  icon: getLinkIcon(formats.isLink),
  props: formats.isLink ? null : 'https://',
  isActive: formats.isLink,
});

const ALIGN_LEFT = (t: TranslationFn) => ({
  name: t('toolbar.alignLeft'),
  text: t('toolbar.alignLeft'),
  command: 'ALIGN',
  icon: faAlignLeft,
  props: 'left',
  directCommand: true,
  isActive: true,
});

const ALIGN_RIGHT = (t: TranslationFn) => ({
  name: t('toolbar.alignRight'),
  text: t('toolbar.alignRight'),
  command: 'ALIGN',
  icon: faAlignRight,
  props: 'right',
  directCommand: true,
  isActive: true,
});

const ALIGN_CENTER = (t: TranslationFn) => ({
  name: t('toolbar.alignCenter'),
  text: t('toolbar.alignCenter'),
  command: 'ALIGN',
  icon: faAlignCenter,
  props: 'center',
  directCommand: true,
  isActive: true,
});

const ALIGN_JUSTIFY = (t: TranslationFn) => ({
  name: t('toolbar.alignJustify'),
  text: t('toolbar.alignJustify'),
  command: 'ALIGN',
  icon: faAlignJustify,
  props: 'justify',
  directCommand: true,
  isActive: true,
});

const FORMAT_TOOLBAR_NORMAL = (t: TranslationFn) => ({
  name: t('toolbar.normal'),
  icon: faParagraph,
  blockType: 'paragraph',
  value: 'PARAGRAPH',
});

const FORMAT_TOOLBAR_HEADING = (t: TranslationFn) => ({
  name: t('toolbar.heading1'),
  icon: faHeading,
  blockType: 'h1',
  value: 'H1',
});

const FROMAT_HEADING_2 = (t: TranslationFn) => ({
  name: t('toolbar.heading2'),
  icon: faHeading,
  blockType: 'h2',
  value: 'H2',
});

const FROMAT_HEADING_3 = (t: TranslationFn) => ({
  name: t('toolbar.heading3'),
  icon: faHeading,
  blockType: 'h3',
  value: 'H3',
});

const FORMAT_BULLET_LIST = (t: TranslationFn) => ({
  name: t('toolbar.bulletList'),
  icon: faListUl,
  blockType: 'bullet',
  value: 'BULLET_LIST',
});

const FORMAT_NUMBERED_LIST = (t: TranslationFn) => ({
  name: t('toolbar.numberedList'),
  icon: faListOl,
  blockType: 'number',
  value: 'NUMBERED_LIST',
});

const FORMAT_CHECK_LIST = (t: TranslationFn) => ({
  name: t('toolbar.checkList'),
  icon: faSquareCheck,
  blockType: 'check',
  value: 'CHECK',
});

const FORMAT_QUOTE = (t: TranslationFn) => ({
  name: t('toolbar.quote'),
  icon: faQuoteLeft,
  blockType: 'quote',
  value: 'QUOTE',
});

const FORMAT_CODE_BLOCK = (t: TranslationFn) => ({
  name: t('toolbar.codeBlock'),
  icon: faCode,
  blockType: 'code',
  value: 'CODE_BLOCK',
});

export const getToolbarDropdownDesktop = (t: TranslationFn) => {
  return [
    FORMAT_TOOLBAR_NORMAL(t),
    FORMAT_TOOLBAR_HEADING(t),
    FROMAT_HEADING_2(t),
    FROMAT_HEADING_3(t),
    FORMAT_BULLET_LIST(t),
    FORMAT_NUMBERED_LIST(t),
    FORMAT_CHECK_LIST(t),
    FORMAT_QUOTE(t),
    FORMAT_CODE_BLOCK(t),
  ];
};

export const getButtonElementsToolbarDesktop = (
  t: TranslationFn,
  formats: CalliopeFormatTypes | null
) => {
  if (!formats) return [];

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
    ALIGN_LEFT(t),
    ALIGN_RIGHT(t),
    ALIGN_CENTER(t),
    ALIGN_JUSTIFY(t),
  ];
};

export const getButtonElementsToolbarMobile = (
  t: (key: string) => string,
  formats: CalliopeFormatTypes | null
) => {

  if(!formats)
    return [];

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
  ];
};

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

export const blockFormatChangeFn = (val: string, editor: EditorType) => {
  editor.executeCommand(val);
};

export const onCodeLanguageSelect = (val: string, editor: EditorType) => {
  editor.executeCommand('CODE_LANGUAGE_CHANGE', val);
};

export const onFontSizeChange = (fs: string, editor: EditorType) => {
  editor.executeCommand('CHANGE_FONT_SIZE', fs);
};

export const onFontFamilyChange = (ff: string, editor: EditorType) => {
  editor.executeCommand('CHANGE_FONT', ff);
};

export const onFontColorChange = (val: ColorVal, editor: EditorType) => {
  editor.executeCommand('CHANGE_FONT_COLOR', val.toHexString());
};

export const onBGColorChange = (val: ColorVal, editor: EditorType) => {
  editor.executeCommand('CHANGE_FONT_BG_COLOR', val.toHexString());
};

export const insertTweet = (url: string, editor: EditorType) => {
  const tweetId = url.split('status/')[1]?.split('?')?.[0];
  editor.executeCommand('INSERT_TWEET', tweetId);
};

export const insertTable = (
  { columns, rows }: TableType,
  editor: EditorType
) => {
  editor.executeCommand('INSERT_TABLE', { columns, rows });
};

export const insertVideo = (videoURL: string, editor: EditorType) => {
  editor.executeCommand('INSERT_VIDEO', videoURL);
};
