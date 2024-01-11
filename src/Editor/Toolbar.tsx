import { Suspense, lazy } from 'react';
import {
    Button,
    Tooltip,
    Dropdown,
    Select,
    Spin,
    ColorPicker
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import './Toolbar.css';
import { ToolbarProps } from './editorTypes';
import { SIGN, getLinkIcon } from './utils';
import { recomendedColors } from './toolbarUtils';
import { getCodeLanguageOptions } from "kalliope";

const { Option } = Select;

const EquationModal = lazy(() => import('./EquationModal/EquationModal'));
const TweetToolbar = lazy(() => import('./TweetToolbar'));
const TableToolbar = lazy(() => import('./TableToolbar'));
const VideoToolbar = lazy(() => import('./VideoToolbar'));
const InsertImageToolbar = lazy(() => import('./ImageModal/InsertImageToolbar'));

const Toolbar = (props:ToolbarProps) => {
    const {
        equationModalVisible,
        equation,
        setEquation,
        inline,
        setInline,
        editor,
        formats,
        insertEquation,
        clearFormatting,
        toggleEquationModal,
        toggleBgColorModal,
        toggleFontColorModal,
        imageModalVisible,
        toggleImageModal,
        tweetToolbarVisible,
        toggleTweetToolbar,
        toggleExcalidrawModal,
        tableToolbarVisible,
        toggleTableToolbar,
        videoToolbar,
        toggleVideoToolbar,
        insertImage,
        t,
    } = props;

    //
    const blockFormatChangeFn = (val) => {
        editor.executeCommand(val);
    };

    const onCodeLanguageSelect = (val) => {
        editor.executeCommand('CODE_LANGUAGE_CHANGE', val);
    };

    const insertTweet = (url) => {
        const tweetId = url.split('status/')?.[1]?.split('?')?.[0];
        editor.executeCommand('INSERT_TWEET', tweetId);
    };

    const insertTable = ({ columns, rows } ) => {
        editor.executeCommand('INSERT_TABLE', { columns, rows });
    };

    const insertVideo = (props) => {
        editor.executeCommand('INSERT_VIDEO', props);
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

    const CODE_LANGUAGE_OPTIONS:[[number, number]] = getCodeLanguageOptions();
    
    //
    const BUTTON_ELEMENTS = [
        {
            name: t('toolbar.bold'),
            text: `${t('toolbar.bold')} (${SIGN} + B)`,
            command: 'FORMAT',
            props: 'bold',
            icon:  faBold,
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

    if (tweetToolbarVisible) {
        return (
            <Suspense fallback={<Spin />}>
                <TweetToolbar
                    insertTweet={insertTweet}
                    toggleToolbar={toggleTweetToolbar}
                    t={t}
                />
            </Suspense>
        );
    }

    if (tableToolbarVisible) {
        return (
            <Suspense fallback={<Spin />}>
                <TableToolbar
                    insertTable={insertTable}
                    toggleToolbar={toggleTableToolbar}
                    t={t}
                />
            </Suspense>
        );
    }

    if (videoToolbar) {
        return (
            <Suspense fallback={<Spin />}>
                <VideoToolbar
                    insertVideo={insertVideo}
                    toggleToolbar={toggleVideoToolbar}
                    t={t}
                />
            </Suspense>
        );
    }

    if (imageModalVisible) {
        return (
            <Suspense fallback={<Spin />}>
                <InsertImageToolbar okFn={insertImage} cancelFn={toggleImageModal} t={t} />
            </Suspense>
        );
    }

    if (equationModalVisible) {
        return (
            <Suspense fallback={<Spin />}>
                <EquationModal
                    equation={equation}
                    setEquation={setEquation}
                    okFunction={insertEquation}
                    cancelFn={toggleEquationModal}
                    inline={inline}
                    setInline={setInline}
                    t={t}
                />
            </Suspense>
        );
    }

    if (formats.blockType === 'code') {
        return (
            <div className="toolbar-code" role="presentation" aria-label="TOOLBAR-CODE">
                <div className="toolbar-single"></div>
                <Dropdown
                    key="dropdown-menu-toolbar"
                    menu={{ items: formatItemsForMenu }}
                    className="dropdown-menu-toolbar"
                >
                    <Button
                        style={{
                            minWidth: '160px',
                            maxWidth: '250px',
                        }}
                        onClick={undefined}
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
                    {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
                        <Option key={value} value={value}>{name}</Option>
                    ))}
                </Select>
                <>
                    <Tooltip placement="bottom" title={t('toolbar.outdent')} key="Outdent">
                        <button
                            className="toolbar-style-button"
                            key="OUTDENT"
                            onClick={() => editor.executeCommand('OUTDENT', null)}
                            aria-label={t('toolbar.outdent')}
                        >
                            <FontAwesomeIcon
                                key="OUTDENT-ICON"
                                icon={faOutdent}
                                size="lg"
                                color="black"
                            />
                        </button>
                    </Tooltip>
                    <Tooltip placement="bottom" title={t('toolbar.indent')} key="Indent">
                        <button
                            className="toolbar-style-button"
                            key="INDENT"
                            onClick={() => editor.executeCommand('INDENT', null)}
                            aria-label={t('toolbar.indent')}
                        >
                            <FontAwesomeIcon
                                key="INDENT-ICON"
                                icon={faIndent}
                                size="lg"
                                color="black"
                            />
                        </button>
                    </Tooltip>
                </>
            </div>
        );
    }

    return (
        <div role="toolbar" aria-label="Toolbar" className="toolbar">
            <div>
                <Dropdown
                    key="dropdown-menu-toolbar"
                    menu={{ items: formatItemsForMenu }}
                    className="dropdown-menu-toolbar"
                >
                    <Button
                        style={{ minWidth: '160px', maxWidth: '250px' }}
                        onClick={undefined}
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
                        key="dropdown-font-family-button"
                        style={{ width: '160px' }}
                        onClick={undefined}
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
                        key="dropdown-menu-font-size"
                        aria-label="FONT_SIZE"
                        onClick={undefined}
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
                        presets={[{
                            label: 'Recommended',
                            colors: recomendedColors
                        }]}
                        value={formats.fontColor}
                        onChange={onFontColorChange}
                    >
                        <Button
                            role="button"
                            key={t('toolbar.fontColor')}
                            aria-label={t('toolbar.fontColor')}
                            onClick={toggleFontColorModal}
                            type="default"
                            className="dropdown-menu-toolbar"
                        >
                            <FontAwesomeIcon
                                icon={faTextHeight}
                            />
                        </Button>
                    </ColorPicker>
                </Tooltip>
                &nbsp;
                <Tooltip title={t('toolbar.bgColor')} placement="bottom">
                    <ColorPicker
                        presets={[{
                            label: 'Recommended',
                            colors: recomendedColors
                        }]}
                        value={formats.bgColor}
                        onChange={onBGColorChange}
                    >
                        <Button
                            role="button"
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
                        aria-label={t('toolbar.clearFormatting')}
                        onClick={clearFormatting}
                        type="default"
                        className="dropdown-menu-toolbar"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Tooltip>
            </div>
            <div>
                {
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
                }
                {INSERT_ELEMENTS.map((b) => (
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
                ))}
            </div>
        </div>
    );
};

export default Toolbar;