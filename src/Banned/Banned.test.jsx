import { expect, test, vi } from 'vitest';
import { render, screen } from '../TestHelpers/testing-utils';
const date = new Date();
const isoDate = date.toISOString();

vi.mock('../Login/authUtils', async () => {
    const actual = await vi.importActual("../Login/authUtils");
    return {
        ...actual,
        getBanStatus: ()=> ({
            banned: true,
            banExpires: isoDate,
            banReason: 'CALLIOPE_EDITOR_MOCK_CONTENT'
        }),
    }
});

vi.mock('../Editor/Renderer', () => ({
    default: ({ content }) => {
        return <div>{content}</div>;
    }
}));

test('<Banned /> > Renders correctly.', async () => {
    render({
        isLoggedIn: true,
        mocks: [],
        initialEntries: ['/banned'],
    });

    const noticeTexts = await screen.findAllByText('banned.banStatusNotice', {
        exact: false,
    });
    expect(noticeTexts.length).toStrictEqual(2);

    expect(
        screen.getByText('banned.banStatusNoticeText', { exact: false })
    ).toBeInTheDocument();
    expect(
        screen.getByText('banned.banStatusClick', { exact: false })
    ).toBeInTheDocument();

    expect(
        await screen.findByText('CALLIOPE_EDITOR_MOCK_CONTENT')
    ).toBeInTheDocument();

    expect(screen.getByText('banned.banReason')).toBeInTheDocument();
    expect(screen.getByText('banned.banActionTitle')).toBeInTheDocument();
    expect(screen.getByText('banned.unjustBanText')).toBeInTheDocument();
    expect(screen.getByText('banned.waitBanExpires')).toBeInTheDocument();
    expect(screen.getByText('banned.banExpires')).toBeInTheDocument();
    // TODO check and banExpiration renderer.
});
