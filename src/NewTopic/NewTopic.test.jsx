import { render, screen, waitFor } from '../TestHelpers/testing-utils.jsx';
//import { CREATE_POST } from './Mutations.js';
import { GET_CATEGORIES } from '../Categories/Queries.js';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';

window.scrollTo = () => {};

vi.mock('kalliope', () => ({
    default: ({ containerRef, setFormats }) => {
      /* eslint-disable */
      const react = require('react');
  
      react.useState(() => {
        const currentContainerRef = {
          getContent: () => {
            return 'CALLIOPE_EDITOR_MOCK_CONTENT';
          },
          clear: vi.fn(),
          focus: vi.fn(),
          executeCommand: containerRef.current ? containerRef.current.executeCommand : () => {},
        };
        containerRef.current = currentContainerRef;
        const _formats = {
          isLink: false,
          blockType: "normal",
          selectedElementKey: "",
          codeLanguage: "",
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isStrikethrough: false,
          isSubscript: false,
          isSuperscript: false,
          isCode: false,
          isRTL: false,
          fontSize: '',
          fontColor: '',
          bgColor: '',
          fontFamily: ''
        };
        setFormats(_formats);
      }, []);
  
      const updateRef = (evt) => console.log(evt.target.value);
  
      return <input data-testid="calliope-editor" onChange={updateRef} />;
    },
    getCodeLanguageOptions: () => [],
}));  

const newTopicMocks = [
    {
      request: {
        query: GET_CATEGORIES,
        variables: {},
      },
      result: {
        loading: false,
        error: false,
        data: {
          categories: [],
        },
      },
    }
];


test('<NewTopic /> > Renders correctly', async () => {
    render({
      mocks: newTopicMocks,
      isLoggedIn: true,
      isMobile: false,
      initialEntries: ['/topics/new'],
    });
    expect(screen.getByText('Loading')).toBeInTheDocument();    

    await waitFor(() => {
      const createTopicTexts = screen.getAllByText('topicsComposer.createTopic')
      expect(createTopicTexts.length).toStrictEqual(2);
    });
    expect(
      await screen.findByText("topicsComposer.chooseTags", { hidden: true})
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", { name: "topicsComposer.createTopic" })
    ).toBeInTheDocument();


    expect(
        await screen.findByRole("textbox", { name: "Title Input" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "topicsComposer.cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "topicsComposer.createTopic"})).toBeInTheDocument();
    expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
});


test('<NewTopic /> > Create topic', async () => {
    const user = userEvent.setup();

    render({
      mocks: newTopicMocks,
      isLoggedIn: true,
      isMobile: false,
      initialEntries: ['/topics/new'],
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(
        await screen.findByRole("textbox", { name: "Title Input" })
    ).toBeInTheDocument();
    expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();

    // Fill in title and editor.
    await user.type(screen.getByRole("textbox", { name: "Title Input" }), "Test");
    expect(await screen.findByRole("textbox", { name: "Title Input" })).toHaveAttribute("value", "Test");
    
    //
    //await user.type(screen.getByTestId('calliope-editor'), "INPUT_FROM_TEST");
    //expect(screen.getByTestId('calliope-editor')).toHaveValue("INPUT_FROM_TEST");
});