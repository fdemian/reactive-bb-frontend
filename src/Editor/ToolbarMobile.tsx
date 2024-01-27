/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useState } from 'react';
import { Button, Tooltip, Dropdown, Select, ColorPicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
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
  faFill,
  faTextHeight,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ToolbarProps } from './editorTypes';
import { getCodeLanguageOptions } from 'kalliope';
import type { ColorVal } from './utils';
import {
  getButtonElementsToolbarMobile,
  getToolbarDropdownDesktop,
  FONT_FAMILIES,
  FONT_SIZES,
} from './toolbarUtils';

import './Toolbar.css';

const { Option } = Select;

const Toolbar = (props: ToolbarProps) => {
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
  const blockFormatChangeFn = (val: string) => {
    editor.executeCommand(val);
  };

  const onCodeLanguageSelect = (val: string) => {
    editor.executeCommand('CODE_LANGUAGE_CHANGE', val);
  };

  const onFontSizeChange = (fs: string) => {
    editor.executeCommand('CHANGE_FONT_SIZE', fs);
  };

  const onFontFamilyChange = (ff: string) => {
    editor.executeCommand('CHANGE_FONT', ff);
  };

  const onFontColorChange = (val: ColorVal) => {
    editor.executeCommand('CHANGE_FONT_COLOR', val.toHexString());
  };

  const onBGColorChange = (val: ColorVal) => {
    editor.executeCommand('CHANGE_FONT_BG_COLOR', val.toHexString());
  };

  const CODE_LANGUAGE_OPTIONS: [string, string][] = getCodeLanguageOptions();

  //
  const BUTTON_ELEMENTS = getButtonElementsToolbarMobile(t, formats);
  const DROPDOWN_FORMATS = getToolbarDropdownDesktop(t);
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
    },
  ];

  const selectedBlock = DROPDOWN_FORMATS.find(
    (b) => b.blockType === formats?.blockType
  );
  const currentBlock =
    selectedBlock === undefined ? DROPDOWN_FORMATS[0] : selectedBlock;

  const formatItemsForMenu = DROPDOWN_FORMATS.map((s) => ({
    key: s.name,
    label: (
      <span
        onClick={() => {
          blockFormatChangeFn(s.value);
        }}
      >
        <FontAwesomeIcon icon={s.icon} size="lg" />
        {'  '}
        &nbsp; {s.name}
      </span>
    ),
  }));

  const fontSizeMenuItems = FONT_SIZES.map((fs) => ({
    key: fs,
    label: (
      <span
        onClick={() => {
          onFontSizeChange(fs);
        }}
      >
        {fs}
      </span>
    ),
  }));

  const fontFamilyItems = FONT_FAMILIES.map((ff) => ({
    key: ff,
    label: (
      <span
        onClick={() => {
          onFontFamilyChange(ff);
        }}
      >
        {ff}
      </span>
    ),
  }));

  if (formats?.blockType === 'code') {
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
            <Option key={value} value={value}>
              {name}
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
        <Dropdown
          key="dropdown-menu-font-family"
          menu={{ items: fontFamilyItems }}
        >
          <Button
            role="button"
            key="dropdown-font-family-button"
            style={{ width: '160px' }}
            onClick={undefined}
            type="default"
            className="dropdown-menu-toolbar"
          >
            {formats?.fontFamily ? formats.fontFamily : FONT_FAMILIES[0]}{' '}
            &nbsp;
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
            onClick={undefined}
            type="default"
            className="dropdown-menu-toolbar"
          >
            {formats?.fontSize ? formats.fontSize : FONT_SIZES[0]} &nbsp;
            <FontAwesomeIcon icon={faCaretDown} />
          </Button>
        </Dropdown>
        &nbsp;
        <Tooltip title={t('toolbar.fontColor')} placement="bottom">
          <ColorPicker value={formats?.fontColor} onChange={onFontColorChange}>
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
          <ColorPicker value={formats?.bgColor} onChange={onBGColorChange}>
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
          onClick={() => {
            setToolbarMode(toolbarMode === 'insert' ? 'format' : 'insert');
          }}
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
                    <FontAwesomeIcon
                      icon={b.icon}
                      size="lg"
                      color="gainsboro"
                    />
                  </button>
                </Tooltip>
              </>
            ))
          : null}
      </div>
    </div>
  );
};

export default Toolbar;
