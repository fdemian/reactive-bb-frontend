import Editor from './Editor';
import { UPLOAD_IMAGE } from './Queries';
import { render, screen } from '../TestHelpers/testing-utils-standalone';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';

const mocks = [];
const i18t = (x) => 'editor.' + x;

window.SpeechRecognition = true;

vi.mock('kalliope', () => ({
  default: ({ containerRef }) => {
    /* eslint-disable */
    const react = require('react');

    react.useState(() => {
      const currentContainerRef = {
        getContent: () => {
          return 'CALLIOPE_EDITOR_MOCK_CONTENT';
        },
        clear: vi.fn(),
        focus: vi.fn(),
        executeCommand: containerRef.current.executeCommand,
      };
      containerRef.current = currentContainerRef;
    }, []);

    const updateRef = (evt) => console.log(evt.target.value);

    return <input data-testid="calliope-editor" onChange={updateRef} />;
  },
  getCodeLanguageOptions: () => [],
}));

test('<Editor /> (MOBILE) > Toolbar and buttons render correctly', async () => {
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: i18t('toolbar.undo') })
  ).toBeInTheDocument();

  /*
    expect(
      await screen.findByTestId("toolbar-spin")
    ).toBeInTheDocument();
    */

  expect(
    await screen.findByRole('toolbar', { name: 'Toolbar' })
  ).toBeInTheDocument();

  // Bottom bar.
  const buttonNames = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'superscript',
    'subscript',
    'code',
    'spoiler',
    'keyboard',
    'addLink',
    'uploadImage',
    'clearEditor',
    'undo',
    'redo',
    'speechToText',
  ];

  const insertButtonNames = [
    'alignLeft',
    'alignRight',
    'alignCenter',
    'alignJustify',
    'rule',
    'image',
    'insertTweet',
    'excalidraw',
    'table',
    'equation',
    'video',
  ];

  expect(screen.getByRole('button', { name: 'FONT_SIZE' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Arial' })).toBeInTheDocument();

  for (const buttonName of buttonNames) {
    expect(
      screen.getByRole('button', { name: i18t(`toolbar.${buttonName}`) })
    ).toBeInTheDocument();
  }

  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  for (const buttonName of insertButtonNames) {
    expect(
      screen.getByRole('button', { name: i18t(`toolbar.${buttonName}`) })
    ).toBeInTheDocument();
  }

  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  // Click on the formats dropdown.
  await user.click(screen.getByText(i18t('toolbar.normal')));
  expect(await screen.findByText(i18t('toolbar.heading1'))).toBeInTheDocument();
  const availableFormats = [
    'heading1',
    'heading2',
    'heading3',
    'bulletList',
    'numberedList',
    'checkList',
    'quote',
    'codeBlock',
  ];
  for (const formatName of availableFormats) {
    expect(screen.getByText(i18t(`toolbar.${formatName}`))).toBeInTheDocument();
  }

  // Click on the font size dropdown
  await user.click(screen.getByRole('button', { name: 'FONT_SIZE' }));
  const fontSizes = [
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

  expect(await screen.findByText('11px')).toBeInTheDocument();

  for (const fontSize of fontSizes) {
    expect(screen.getByText(fontSize)).toBeInTheDocument();
  }

  expect(
    screen.getByRole('button', { name: i18t('toolbar.bgColor') })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: i18t('toolbar.fontColor') })
  ).toBeInTheDocument();
  expect(screen.getByText('OFF')).toBeInTheDocument();
});

test('Change block format', async () => {
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: i18t('toolbar.undo') })
  ).toBeInTheDocument();

  expect(await screen.findByText(i18t('toolbar.normal'))).toBeInTheDocument();

  // Click on the formats dropdown.
  await user.click(screen.getByText(i18t('toolbar.normal')));
  expect(await screen.findByText(i18t('toolbar.heading1'))).toBeInTheDocument();
  await user.click(screen.getByText(i18t('toolbar.heading1')));
  expect(executeCommandFn).toHaveBeenCalledWith('H1');
});

test('Code toolbar', async () => {
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: i18t('toolbar.undo') })
  ).toBeInTheDocument();

  // Click on the code dropdown.
  await user.click(screen.getByText(i18t('toolbar.normal')));

  expect(
    await screen.findByText(i18t('toolbar.codeBlock'))
  ).toBeInTheDocument();
  await user.click(screen.getByText(i18t('toolbar.codeBlock')));
  expect(executeCommandFn).toHaveBeenCalledWith('CODE_BLOCK');
});

test('<Editor /> (MOBILE) > Video toolbar', async () => {
  const VIDEO_URL = 'https://video.com';
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: i18t('toolbar.undo') })
  ).toBeInTheDocument();

  // Click on the video button.
  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  expect(
    screen.getByRole('button', { name: i18t('toolbar.video') })
  ).toBeInTheDocument();
  user.click(screen.getByRole('button', { name: i18t('toolbar.video') }));

  expect(
    await screen.findByRole('textbox', { name: i18t('toolbar.videoURL') })
  ).toBeInTheDocument();

  await user.type(
    screen.getByRole('textbox', { name: i18t('toolbar.videoURL') }),
    VIDEO_URL
  );
  await user.click(
    await screen.findByRole('button', { name: i18t('toolbar.confirm') })
  );
  expect(
    screen.queryByRole('textbox', { name: i18t('toolbar.videoURL') })
  ).not.toBeInTheDocument();

  expect(executeCommandFn).toHaveBeenCalledWith('INSERT_VIDEO', VIDEO_URL);
});

test('<Editor /> (MOBILE) > Tweet toolbar', async () => {
  const TWEET_STATUS = 1115;
  const TWEET_URL = `https://tweet.com/status/${TWEET_STATUS}`;
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: i18t('toolbar.undo') })
  ).toBeInTheDocument();

  // Click on the video button.

  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  expect(
    await screen.findByRole('button', { name: i18t('toolbar.insertTweet') })
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', { name: i18t('toolbar.insertTweet') })
  );

  expect(
    await screen.findByRole('textbox', { name: 'Tweet URL' })
  ).toBeInTheDocument();

  await user.type(
    screen.getByRole('textbox', { name: 'Tweet URL' }),
    TWEET_URL
  );
  await user.click(
    await screen.findByRole('button', { name: i18t('toolbar.confirm') })
  );
  expect(
    screen.queryByRole('textbox', { name: 'Tweet URL' })
  ).not.toBeInTheDocument();

  expect(executeCommandFn).toHaveBeenCalledWith(
    'INSERT_TWEET',
    TWEET_STATUS.toString()
  );
});

test('<Editor /> (MOBILE) > Image toolbar', async () => {
  const IMAGE_URL = 'www.site.com/image.png';
  const ALT_TEXT = 'ALT_TEXT';
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  expect(
    await screen.findByRole('button', { name: i18t('toolbar.image') })
  ).toBeInTheDocument();

  // Click on the video button.
  await user.click(screen.getByRole('button', { name: i18t('toolbar.image') }));

  expect(
    await screen.findByRole('textbox', { name: 'URL' })
  ).toBeInTheDocument();
  expect(await screen.findByRole('form')).toBeInTheDocument();

  expect(screen.getByRole('form')).toHaveFormValues({
    url: '',
    alttext: '',
  });

  await user.type(screen.getByRole('textbox', { name: 'URL' }), IMAGE_URL);
  await user.type(
    screen.getByRole('textbox', { name: 'editor.imageModal.altText' }),
    ALT_TEXT
  );

  expect(screen.getByRole('form')).toHaveFormValues({
    url: IMAGE_URL,
    alttext: ALT_TEXT,
  });

  await user.click(
    await screen.findByRole('button', { name: i18t('toolbar.confirm') })
  );
  expect(
    screen.queryByRole('textbox', { name: 'URL' })
  ).not.toBeInTheDocument();

  const imageParams = { src: IMAGE_URL, altText: ALT_TEXT };
  expect(executeCommandFn).toHaveBeenCalledWith('INSERT_IMAGE', imageParams);
});

test('<Editor /> (MOBILE) > Upload image modal', async () => {
  const IMAGE_URL = 'image.png';
  const ALT_TEXT = 'ALT_TEXT';
  const RESPONSE = { src: IMAGE_URL };
  const imageFile = new File(['(⌐□_□)'], IMAGE_URL, { type: 'image/png' });
  const uploadMocks = [
    {
      request: {
        query: UPLOAD_IMAGE,
        variables: {
          image: imageFile,
        },
      },
      result: {
        loading: false,
        error: false,
        data: { uploadImage: RESPONSE },
      },
    },
  ];

  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
      focus: vi.fn(),
      clear: vi.fn(),
      getContent: vi.fn(),
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: uploadMocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: i18t('toolbar.uploadImage') })
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', { name: i18t('toolbar.uploadImage') })
  );

  expect(
    await screen.findByText('editor.imageModal.upload')
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('textbox', {
      name: 'editor.imageModal.altText',
    })
  ).toBeInTheDocument();
  expect(await screen.findByTestId('upload-image')).toBeInTheDocument();

  //Upload test image.
  await user.upload(screen.getByTestId('upload-image'), imageFile);

  expect(
    await screen.findByRole('img', {
      name: 'editor.imageModal.imagePreview',
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('img', { name: 'editor.imageModal.imagePreview' })
  ).toHaveAttribute('src', `/static/uploads/${IMAGE_URL}`);

  await user.type(
    screen.getByRole('textbox', { name: 'editor.imageModal.altText' }),
    ALT_TEXT
  );
  await user.click(await screen.findByText('editor.ok'));
  const imageParams = {
    src: `/static/uploads/${IMAGE_URL}`,
    altText: ALT_TEXT,
  };
  expect(executeCommandFn).toHaveBeenCalledWith('INSERT_IMAGE', imageParams);
});

test('<Editor /> (MOBILE) > Equation toolbar', async () => {
  const EQUATION = 'f(x)=3x';
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();

  expect(
    await screen.findByRole('toolbar', { name: 'Toolbar' })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  expect(
    screen.getByRole('button', { name: i18t('toolbar.equation') })
  ).toBeInTheDocument();

  // Click on the video button.
  await user.click(
    screen.getByRole('button', { name: i18t('toolbar.equation') })
  );

  expect(
    await screen.findByRole('textbox', { name: 'Equation input' })
  ).toBeInTheDocument();
  await user.clear(screen.getByRole('textbox', { name: 'Equation input' }));
  await user.type(
    screen.getByRole('textbox', { name: 'Equation input' }),
    EQUATION
  );

  await user.click(
    await screen.findByRole('button', {
      name: i18t('equationModal.insertEquationText'),
    })
  );
  expect(
    screen.queryByRole('textbox', { name: 'Equation input' })
  ).not.toBeInTheDocument();

  const equationProps = { equation: EQUATION, inline: true };
  expect(executeCommandFn).toHaveBeenCalledWith(
    'INSERT_EQUATION',
    equationProps
  );
});

test('<Editor /> (MOBILE) > Table toolbar', async () => {
  const ROWS = 5;
  const COLS = 5;
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('toolbar', { name: 'Toolbar' })
  ).toBeInTheDocument();

  //
  await user.click(screen.getByRole('button', { name: 'more-options-button' }));

  expect(
    await screen.findByRole('button', { name: i18t('toolbar.table') })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: i18t('toolbar.table') }));

  expect(
    await screen.findByRole('spinbutton', { name: 'ROWS INPUT' })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('spinbutton', { name: 'COLS INPUT' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: i18t('toolbar.cancel') })
  ).toBeInTheDocument();

  await user.clear(screen.getByRole('spinbutton', { name: 'ROWS INPUT' }));
  await user.clear(screen.getByRole('spinbutton', { name: 'COLS INPUT' }));

  await user.type(
    screen.getByRole('spinbutton', { name: 'ROWS INPUT' }),
    ROWS.toString()
  );

  await user.type(
    screen.getByRole('spinbutton', { name: 'COLS INPUT' }),
    COLS.toString()
  );

  await user.click(
    await screen.findByRole('button', { name: i18t('toolbar.confirm') })
  );

  expect(executeCommandFn).toHaveBeenCalledWith('INSERT_TABLE', {
    rows: ROWS,
    columns: COLS,
  });
});

test('<Editor /> (MOBILE) > Color picker', async () => {
  const user = userEvent.setup();
  const executeCommandFn = vi.fn();
  const containerRef = {
    current: {
      executeCommand: executeCommandFn,
    },
  };

  const props = {
    isMobile: true,
    initialState: undefined,
    containerRef: containerRef,
    user: null,
    mentions: [],
    setMentions: () => {},
  };

  render(<Editor {...props} />, {
    mocks: mocks,
    isLoggedIn: true,
    isMobile: true,
  });

  expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
  expect(
    await screen.findByRole('toolbar', { name: 'Toolbar' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: i18t('toolbar.bgColor') })
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', { name: i18t('toolbar.bgColor') })
  );
});
