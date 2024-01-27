/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Suspense, lazy } from 'react';
import { Button, Tooltip, Dropdown, Select, Spin, ColorPicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
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
  faTextHeight,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Toolbar.css';
import { ToolbarProps } from './editorTypes';
import { recomendedColors } from './toolbarUtils';
import { getCodeLanguageOptions } from 'kalliope';
import {
  getButtonElementsToolbarDesktop,
  getToolbarDropdownDesktop,
  FONT_FAMILIES,
  FONT_SIZES,
} from './toolbarUtils';

import {
  blockFormatChangeFn,
  onCodeLanguageSelect,
  insertTweet,
  insertTable,
  insertVideo,
  onFontSizeChange,
  onFontFamilyChange,
  onFontColorChange,
  onBGColorChange,
} from './toolbarUtils';

const { Option } = Select;

const EquationModal = lazy(() => import('./EquationModal/EquationModal'));
const TweetToolbar = lazy(() => import('./TweetToolbar'));
const TableToolbar = lazy(() => import('./TableToolbar'));
const VideoToolbar = lazy(() => import('./VideoToolbar'));
const InsertImageToolbar = lazy(
  () => import('./ImageModal/InsertImageToolbar')
);

const Toolbar = (props: ToolbarProps) => {
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

  const CODE_LANGUAGE_OPTIONS: [string, string][] = getCodeLanguageOptions();

  //
  const BUTTON_ELEMENTS = getButtonElementsToolbarDesktop(t, formats);
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
      onClick: () => { toggleExcalidrawModal(); },
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

  const selectedBlock = DROPDOWN_FORMATS.find(
    b => b.blockType === formats?.blockType
  );
  const currentBlock =
    selectedBlock ?? DROPDOWN_FORMATS[0];

  const formatItemsForMenu = DROPDOWN_FORMATS.map((s) => ({
    key: s.name,
    label: (
      <span onClick={() => { blockFormatChangeFn(s.value, editor); }}>
        <FontAwesomeIcon icon={s.icon} size="lg" />
        {'  '}
        &nbsp; {s.name}
      </span>
    ),
  }));

  const fontSizeMenuItems = FONT_SIZES.map((fs) => ({
    key: fs,
    label: <span onClick={() => { onFontSizeChange(fs, editor); }}>{fs}</span>,
  }));

  const fontFamilyItems = FONT_FAMILIES.map((ff) => ({
    key: ff,
    label: <span onClick={() => { onFontFamilyChange(ff, editor); }}>{ff}</span>,
  }));

  if (tweetToolbarVisible) {
    return (
      <Suspense fallback={<Spin />}>
        <TweetToolbar
          insertTweet={(t) => { insertTweet(t, editor); }}
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
          insertTable={(t) => { insertTable(t, editor); }}
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
          insertVideo={(val) => { insertVideo(val, editor); }}
          toggleToolbar={toggleVideoToolbar}
          t={t}
        />
      </Suspense>
    );
  }

  if (imageModalVisible) {
    return (
      <Suspense fallback={<Spin />}>
        <InsertImageToolbar
          okFn={insertImage}
          cancelFn={toggleImageModal}
          t={t}
        />
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

  if (formats?.blockType === 'code') {
    return (
      <div
        className="toolbar-code"
        role="presentation"
        aria-label="TOOLBAR-CODE"
      >
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
          onChange={(val) => { onCodeLanguageSelect(val, editor); }}
          value={formats.codeLanguage}
        >
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
            <Option key={value} value={value}>
              {name}
            </Option>
          ))}
        </Select>
        <>
          <Tooltip
            placement="bottom"
            title={t('toolbar.outdent')}
            key="Outdent"
          >
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
        <Dropdown
          key="dropdown-menu-font-family"
          menu={{ items: fontFamilyItems }}
        >
          <Button
            key="dropdown-font-family-button"
            style={{ width: '160px' }}
            onClick={undefined}
            type="default"
            className="dropdown-menu-toolbar"
          >
            {formats?.fontFamily
              ? formats.fontFamily
              : FONT_FAMILIES[0]}{' '}
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
            key="dropdown-menu-font-size"
            aria-label="FONT_SIZE"
            onClick={undefined}
            type="default"
            className="dropdown-menu-toolbar"
          >
            {formats?.fontSize
              ? formats.fontSize
              : FONT_SIZES[0]}{' '}
            &nbsp;
            <FontAwesomeIcon icon={faCaretDown} />
          </Button>
        </Dropdown>
        &nbsp;
        <Tooltip title={t('toolbar.fontColor')} placement="bottom">
          <ColorPicker
            presets={[
              {
                label: 'Recommended',
                colors: recomendedColors,
              },
            ]}
            value={formats?.fontColor}
            onChange={val => { onFontColorChange(val, editor); }}
          >
            <Button
              role="button"
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
            presets={[
              {
                label: 'Recommended',
                colors: recomendedColors,
              },
            ]}
            value={formats?.bgColor}
            onChange={(val) => { onBGColorChange(val, editor); }}
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
