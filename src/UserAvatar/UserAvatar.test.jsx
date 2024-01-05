import UserAvatar from './UserAvatar';
import { render } from '@testing-library/react';
import { screen, waitFor, within } from '../TestHelpers/testing-utils-standalone';
import { expect, test } from 'vitest';

test('User has an avatar image.', async () => {
    const props = {
        avatar: 'avatar.png',
        username: 'adminuser',
        size: 30,
        shape: 'circle'
    };

    render(<UserAvatar {...props} />, {});

    await waitFor(() => {
        expect(
            screen.getAllByRole('img', { name: `Avatar of ${props.username}` }).length
        ).toStrictEqual(2);
    });

    const avatarImgContainers = screen.getAllByRole('img', {
        name: `Avatar of ${props.username}`
    });
    const avatarImg = within(avatarImgContainers[0]).getByRole('img');

    expect(avatarImg).toHaveAttribute('alt', `Avatar of ${props.username}`);
    expect(avatarImg).toHaveAttribute('src', `/static/avatars/${props.avatar}`);
});

test('User does not have an image as avatar.', async () => {
    const props = {
        avatar: null,
        username: 'adminuser',
        size: 30,
        shape: 'circle'
    };

    render(<UserAvatar {...props} />, {});

    await waitFor(() => {
        expect(screen.getByText(props.username[0])).toBeInTheDocument();
    });
});
