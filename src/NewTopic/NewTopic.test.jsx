import React from 'react';
import { render, screen, waitFor } from '../TestHelpers/testing-utils.jsx';
import { CREATE_POST } from './Mutations';
import { GET_CATEGORIES } from '../Categories/Queries';
import {
  GET_NOTIFICATIONS,
  NOTIFICATIONS_SUBSCRIPTION,
  CHATS_SUBSCRIPTION,
} from '../Navbar/Queries';
import userEvent from '@testing-library/user-event';
import { vi, test, expect } from 'vitest';

window.scrollTo = () => {};

vi.mock('../Login/authUtils', async () => {
  const actual = await vi.importActual('../Login/authUtils');
  return {
    ...actual,
    getUserId: () => 1,
  };
});

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
          elementFormatType: 'left',
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
        query: NOTIFICATIONS_SUBSCRIPTION,
        variables: { user: 1},
      },
      result: {
        loading: false,
        error: false,
        data: {
          notificationAdded: [],
        },
      },
    },
    {
      request: {
        query: GET_NOTIFICATIONS,
        variables: {
          user: 1,
        },
      },
      result: {
        loading: false,
        error: false,
        data: {
          notifications: [],
        },
      },
    },
    {
      request: {
        query: CHATS_SUBSCRIPTION,
        variables: {
          user: 1,
        },
      },
      result: {
        loading: true,
        error: false,
        data: {
          chatAdded: { chatNotification: []},
        },
      },
    },
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
    },
    {
      request: {
        query: CREATE_POST,
        variables:  {
          name: "Test",
          content: "\"CALLIOPE_EDITOR_MOCK_CONTENT\"",
          user: 1,
          category: null,
          tags:"Tag1"
        },
      },
      result: {
        loading: false,
        error: false,
        data: {
          createTopic: {
            id: 1,
            ok: true
          },
        },
      },
    }
];

test.skip('<NewTopic /> > Create topic', async () => {  
    const user = userEvent.setup();

    const mockNavigateComp = vi.fn();
    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        Navigate: (props) => {
          return mockNavigateComp(props);
        },
      };
     });

    render({
      mocks: newTopicMocks,
      isLoggedIn: true,
      isMobile: false,
      initialEntries: ['/topics/new'],
    });
    expect(screen.getByText('Loading')).toBeInTheDocument();    

    
    expect(await screen.findByRole("button", { name: "topicsComposer.cancel" })).toBeInTheDocument();

    
    expect(
      await screen.findByText("topicsComposer.chooseTags", { hidden: true})
    ).toBeInTheDocument();
    
    expect(
      await screen.findByRole("button", { name: "topicsComposer.createTopic"})
    ).toBeInTheDocument();


    expect(screen.getByRole("button", { name: "topicsComposer.createTopic"})).toBeInTheDocument();
    expect(await screen.findByTestId('calliope-editor')).toBeInTheDocument();
    
    expect(
      await screen.findByRole("button", { name: "topicsComposer.newTag"})
    ).toBeInTheDocument();
  
    await user.click(screen.getByRole("button", { name: "topicsComposer.newTag"}));

    expect(
      await screen.findByRole("textbox", { name: "topics-tag-input"})
    ).toBeInTheDocument();


    // Fill in the title.
    await user.click(screen.getByRole("textbox", { name: "topicsComposer.titlePlaceholder" }));
    await user.type(screen.getByRole("textbox", { name: "topicsComposer.titlePlaceholder" }), "Test");
    expect(
      await screen.findByRole("textbox", { name: "topicsComposer.titlePlaceholder" })
    ).toHaveAttribute("value", "Test");
    
    // Fill in the editor.
    await user.click(screen.getByTestId("calliope-editor"));
    await user.type(screen.getByTestId('calliope-editor'), "INPUT_FROM_TEST");

    // Check that the new tag composer exists.
    expect(
      await screen.findByRole("textbox", { name: "topics-tag-input"})
    ).toBeInTheDocument();

    // Type the first tag.
    await user.click(screen.getByRole("textbox", { name: "topics-tag-input"}));
    await user.type(screen.getByRole("textbox", { name: "topics-tag-input"}), "Tag1");
    await user.keyboard(`{Enter}`, screen.getByRole("textbox", { name: "topics-tag-input"}));
    
    //
    //expect(await screen.findByText("Tag", { exact: false })).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: "topicsComposer.createTopic"})
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "topicsComposer.createTopic"}));
   
    await waitFor(() => {
      expect(mockNavigateComp).toHaveBeenCalledWith({
        to: `/topics/1/test`,
      });
    });

});