import React from 'react';
import UserAvatar from './UserAvatar';
import { render } from '@testing-library/react';
import {
    screen,
    waitFor,
    within,
} from '../TestHelpers/testing-utils-standalone';
import { expect, test } from 'vitest';

test('User has an avatar image.', async () => {
    const props = {
        avatar: 'avatar.png',
        username: 'adminuser',
        size: 30,
        shape: 'circle',
    };

    render(<UserAvatar {...props} />, {});

    await waitFor(() => {
        expect(
            screen.getByRole('img', {
                name: `Avatar of ${props.username}`,
                hidden: true,
            })
        ).toBeInTheDocument();
    });

    const avatarImgContainer = screen.getByRole('img', {
        name: `Avatar of ${props.username}`,
        hidden: true,
    });
    expect(avatarImgContainer).toHaveAttribute(
        'alt',
        `Avatar of ${props.username}`
    );
    expect(avatarImgContainer).toHaveAttribute(
        'src',
        `/static/avatars/${props.avatar}`
    );
});

test('User does not have an image as avatar.', async () => {
    const props = {
        avatar: null,
        username: 'adminuser',
        size: 30,
        shape: 'circle',
    };

    render(<UserAvatar {...props} />, {});

    await waitFor(() => {
        expect(screen.getByText(props.username[0])).toBeInTheDocument();
    });
});
