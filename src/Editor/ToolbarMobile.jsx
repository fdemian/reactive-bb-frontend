import PropTypes from "prop-types";
import { useState } from 'react';
import {
    Button,
    Tooltip,
    Dropdown,
    Select,
    ColorPicker
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUnlink, 
    faLink, 
    faBold, 
    faTrash,
    faItalic, 
    faUnderline, 
    faStrikethrough, 
    faSuperscript, 
    faSubscript, 
    faCode,
    faEye,
    faKeyboard,
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faAlignJustify,
    faRulerHorizontal,
    faCaretRight,
    faImage,
    faDiagramProject,
    faTable,
    faCalculator,
    faVideo,
    faCaretDown,
    faPlus,
    faParagraph,
    faHeading,
    faListUl,
    faListOl,
    faQuoteLeft,
    faSquareCheck,
    faFill,
    faTextHeight
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


import './Toolbar.css';

const { Option } = Select;

const getLinkIcon = (isLink) => {
    if (isLink) return faUnlink;

    return faLink;
};

const CAN_USE_DOM =
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined';
const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const SIGN = IS_APPLE ? '⌘' : 'Ctrl';

const Toolbar = (props) => {
    const {
        editor,
        formats,
        clearFormatting,
        toggleEquationModal,
        toggleBgColorModal,
        toggleFontColorModal,
        toggleImageModal,
        toggleTweetToolbar,
        toggleTableToolbar,
        toggleVideoToolbar,
        t,
    } = props;

    const [toolbarMode, setToolbarMode] = useState('format');

    //
    const blockFormatChangeFn = (val) => {
        editor.executeCommand(val);
    };

    const onCodeLanguageSelect = (val) => {
        editor.executeCommand('CODE_LANGUAGE_CHANGE', val);
    };

    const onFontSizeChange = (fs) => {
        editor.executeCommand('CHANGE_FONT_SIZE', fs);
    };

    const onFontFamilyChange = (ff) => {
        editor.executeCommand('CHANGE_FONT', ff);
    };

    const onFontColorChange = (val) => {
        editor.executeCommand('CHANGE_FONT_COLOR', val.toHexString());
    };

    const onBGColorChange = (val) => {
        editor.executeCommand('CHANGE_FONT_BG_COLOR', val.toHexString());
    };

    const CODE_LANGUAGE_OPTIONS = [
        { value: 'c', name: 'C' },
        { value: 'cpp', name: 'C++' },
        { value: 'clike', name: 'C-like' },
        { value: 'css', name: 'CSS' },
        { value: 'html', name: 'HTML' },
        { value: 'java', name: 'Java' },
        { value: 'js', name: 'JavaScript' },
        { value: 'markdown', name: 'Markdown' },
        { value: 'objc', name: 'Objective-C' },
        { value: 'plain', name: 'Plain Text' },
        { value: 'py', name: 'Python' },
        { value: 'rust', name: 'Rust' },
        { value: 'sql', name: 'SQL' },
        { value: 'swift', name: 'Swift' },
        { value: 'xml', name: 'XML' },
        { value: 'ts', name: 'Typescript' },
    ];

    //
    const BUTTON_ELEMENTS = [
        {
            name: t('toolbar.bold'),
            text: `${t('toolbar.bold')} (${SIGN} + B)`,
            command: 'FORMAT',
            props: 'bold',
            icon: faBold,
            isActive: formats.isBold,
        },
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
            icon: faStrikethrough,
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
            onClick: () => editor.executeCommand('INSERT_EXCALIDRAW'),
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

    const selectedBlock = DROPDOWN_FORMATS.find((b) => b.blockType === formats.blockType);
    const currentBlock = selectedBlock === undefined ? DROPDOWN_FORMATS[0] : selectedBlock;

    const formatItemsForMenu = DROPDOWN_FORMATS.map((s) => ({
        key: s.name,
        label: (
        <span onClick={() => blockFormatChangeFn(s.value)}>
        <FontAwesomeIcon icon={s.icon} size="lg" />
        {'  '}
        &nbsp; {s.name}
        </span>
        ),
    }));

    const fontSizeMenuItems = FONT_SIZES.map((fs) => ({
        key: fs,
        label: <span onClick={() => onFontSizeChange(fs)}>{fs}</span>,
    }));

    const fontFamilyItems = FONT_FAMILIES.map((ff) => ({
        key: ff,
        label: <span onClick={() => onFontFamilyChange(ff)}>{ff}</span>,
    }));

    if (formats.blockType === 'code') {
        return (
            <div className="toolbar-code" aria-label="TOOLBAR">
                <div className="toolbar-single"></div>
                <Dropdown
                    key="dropdown-menu-toolbar"
                    menu={{ items: formatItemsForMenu }}
                    className="dropdown-menu-toolbar"
                >
                    <Button
                        aria-label="dropdown-formats"
                        role="button"
                        style={{
                            minWidth: '160px',
                            maxWidth: '250px',
                        }}
                        onClick={null}
                        type="default"
                        className="dropdown-menu-toolbar"
                        block
                    >
                        <FontAwesomeIcon icon={currentBlock.icon} />
                        &nbsp; {currentBlock.name} &nbsp;
                        <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                </Dropdown>
                <Select
                    key="code-language-select"
                    className="code-language-select"
                    onChange={onCodeLanguageSelect}
                    value={formats.codeLanguage}
                >
                    {CODE_LANGUAGE_OPTIONS.map((l) => (
                        <Option key={l.name} value={l.value}>
                            {l.name}
                        </Option>
                    ))}
                </Select>
            </div>
        );
    }

    return (
        <div className="toolbar" role="toolbar" aria-label="Toolbar">
            <div className="font-format-menues">
                <Dropdown
                    key="dropdown-menu-toolbar"
                    menu={{ items: formatItemsForMenu }}
                    className="dropdown-menu-toolbar"
                >
                    <Button
                        aria-label="dropdown-formats"
                        role="button"
                        style={{ width: '160px' }}
                        onClick={null}
                        type="default"
                        className="dropdown-menu-toolbar"
                        block
                    >
                        <FontAwesomeIcon icon={currentBlock.icon} />
                        &nbsp; {currentBlock.name} &nbsp;
                        <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                </Dropdown>
                &nbsp;
                <Dropdown key="dropdown-menu-font-family" menu={{ items: fontFamilyItems }}>
                    <Button
                        role="button"
                        key="dropdown-font-family-button"
                        style={{ width: '160px' }}
                        onClick={null}
                        type="default"
                        className="dropdown-menu-toolbar"
                    >
                        {formats.fontFamily ? formats.fontFamily : FONT_FAMILIES[0]} &nbsp;
                        <FontAwesomeIcon icon={faCaretDown} size="lg" />
                    </Button>
                </Dropdown>
                &nbsp;
                <Dropdown
                    key="dropdown-menu-font-size"
                    menu={{ items: fontSizeMenuItems }}
                    className="dropdown-menu-toolbar"
                >
                    <Button
                        role="button"
                        style={{ width: '70px', marginTop: '4px' }}
                        key="dropdown-menu-font-size"
                        aria-label="FONT_SIZE"
                        onClick={null}
                        type="default"
                        className="dropdown-menu-toolbar"
                    >
                        {formats.fontSize ? formats.fontSize : FONT_SIZES[0]} &nbsp;
                        <FontAwesomeIcon icon={faCaretDown} />
                    </Button>
                </Dropdown>
                &nbsp;
                <Tooltip title={t('toolbar.fontColor')} placement="bottom">
                    <ColorPicker
                        value={formats.fontColor}
                        onChange={onFontColorChange}
                    >
                        <Button
                            key={t('toolbar.fontColor')}
                            aria-label={t('toolbar.fontColor')}
                            onClick={toggleFontColorModal}
                            type="default"
                            className="dropdown-menu-toolbar"
                        >
                            <FontAwesomeIcon icon={faTextHeight} />
                        </Button>
                    </ColorPicker>
                </Tooltip>
                &nbsp;
                <Tooltip title={t('toolbar.bgColor')} placement="bottom">
                    <ColorPicker
                        value={formats.bgColor}
                        onChange={onBGColorChange}
                    >
                        <Button
                            key={t('toolbar.bgColor')}
                            aria-label={t('toolbar.bgColor')}
                            onClick={toggleBgColorModal}
                            type="default"
                            className="dropdown-menu-toolbar"
                        >
                            <FontAwesomeIcon icon={faFill} />
                        </Button>
                    </ColorPicker>
                </Tooltip>
                &nbsp;
                <Tooltip title={t('toolbar.clearFormatting')} placement="bottom">
                    <Button
                        role="button"
                        key={t('toolbar.clearFormatting')}
                        aria-label={t('toolbar.deleteFormatting')}
                        onClick={clearFormatting}
                        type="default"
                        className="dropdown-menu-toolbar"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Tooltip>
                &nbsp;
                <Button
                    aria-label="more-options-button"
                    role="button"
                    type="primary"
                    onClick={() => setToolbarMode(toolbarMode === 'insert' ? 'format' : 'insert')}
                >
                    <FontAwesomeIcon icon={faPlus} size="lg" color="gainsboro" />
                </Button>
            </div>
            <div>
                {toolbarMode === 'format' ? (
                    <>
                        {BUTTON_ELEMENTS.map((b) => (
                            <>
                                <Tooltip placement="bottom" title={b.text} key={b.text}>
                                    <button
                                        className="toolbar-style-button"
                                        key={b.name}
                                        onClick={() => {
                                            editor.executeCommand(b.command, b.props);
                                        }}
                                        aria-label={b.name}
                                    >
                                        <FontAwesomeIcon
                                            icon={b.icon}
                                            size="lg"
                                            color={b.isActive ? 'black' : 'gainsboro'}
                                        />
                                    </button>
                                </Tooltip>
                            </>
                        ))}
                    </>
                ) : null}
                {toolbarMode === 'insert'
                    ? INSERT_ELEMENTS.map((b) => (
                        <>
                            <Tooltip placement="bottom" title={b.text} key={b.text}>
                                <button
                                    className="toolbar-style-button"
                                    key={b.text}
                                    onClick={b.onClick}
                                    aria-label={b.text}
                                >
                                    <FontAwesomeIcon icon={b.icon} size="lg" color="gainsboro" />
                                </button>
                            </Tooltip>
                        </>
                    ))
                    : null}
            </div>
        </div>
    );
};

Toolbar.propTypes = {
    editor: PropTypes.any.isRequired,
    formats: PropTypes.shape({
        blockType: PropTypes.string.isRequired,
        selectedElementKey: PropTypes.string,
        isLink: PropTypes.bool.isRequired,
        isBold: PropTypes.bool.isRequired,
        isSpoiler: PropTypes.bool.isRequired,
        isKeyboard: PropTypes.bool.isRequired,
        isItalic: PropTypes.bool.isRequired,
        isUnderline: PropTypes.bool.isRequired,
        isStrikethrough: PropTypes.bool.isRequired,
        isSubscript: PropTypes.bool.isRequired,
        isSuperscript: PropTypes.bool.isRequired,
        isCode: PropTypes.bool.isRequired,
        canUndo: PropTypes.bool.isRequired,
        canRedo: PropTypes.bool.isRequired,
        isRTL: PropTypes.bool.isRequired,
        codeLanguage: PropTypes.string.isRequired,
        fontSize: PropTypes.string.isRequired,
        fontColor: PropTypes.string.isRequired,
        bgColor: PropTypes.string.isRequired,
        fontFamily: PropTypes.string.isRequired
    }),
    clearFormatting: PropTypes.func.isRequired,
    toggleEquationModal: PropTypes.func.isRequired,
    toggleBgColorModal: PropTypes.func.isRequired,
    toggleFontColorModal: PropTypes.func.isRequired,
    toggleImageModal: PropTypes.func.isRequired,
    toggleTweetToolbar: PropTypes.func.isRequired,
    toggleTableToolbar: PropTypes.func.isRequired,
    toggleVideoToolbar: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
};

export default Toolbar;
