import { GET_CATEGORIES } from './Queries';
import { CREATE_CATEGORY } from './Mutations';
import { render, fireEvent, screen, waitFor } from '../TestHelpers/testing-utils';
import { test, expect} from 'vitest';
import userEvent from '@testing-library/user-event';

test('<Categories /> > Renders correctly', async () => {
    const mocks = [
        {
            request: {
                query: GET_CATEGORIES,
                variables: {}
            },
            result: {
                loading: false,
                error: false,
                data: {
                    categories: [
                        {
                            id: 1,
                            name: 'Test',
                            description: 'A test'
                        }
                    ]
                }
            }
        }
    ];

    render({
        isLoggedIn: true,
        isMobile: false,
        mocks: mocks,
        initialEntries: ['/categories']
    });

    expect(screen.getByText('Loading')).toBeInTheDocument();

    expect(await screen.findByText('categories.categories')).toBeInTheDocument();

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('A test')).toBeInTheDocument();
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();

    expect(
        await screen.findByRole('button', { hidden: true, name: 'categories.newCategory' })
    ).toBeInTheDocument();
});

test('<Categories /> > New category > Create category.', async () => {
    const _user = userEvent.setup();
    const newCategory = {
        name: 'New Category',
        description: 'New Description'
    };

    const mocks = [
        {
            request: {
                query: GET_CATEGORIES,
                variables: {}
            },
            result: {
                loading: false,
                error: false,
                data: {
                    categories: [
                        {
                            id: 1,
                            name: 'Test',
                            description: 'A test'
                        }
                    ]
                }
            }
        },
        {
            request: {
                query: CREATE_CATEGORY,
                variables: {
                    name: newCategory.name,
                    description: newCategory.description
                }
            },
            result: {
                loading: false,
                error: false,
                data: {
                    createCategory: {
                        id: 1,
                        name: newCategory.name,
                        description: newCategory.description
                    }
                }
            }
        }
    ];

    render({
        isLoggedIn: true,
        mocks: mocks,
        initialEntries: ['/categories']
    });

    await waitFor(() => {
        expect(screen.getByText('categories.categories')).toBeInTheDocument();
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('A test')).toBeInTheDocument();
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();

    await waitFor(() => {
        expect(
            screen.getByRole('button', { hidden: true, name: 'categories.newCategory' })
        ).toBeInTheDocument();
    });

    await _user.click(screen.getByRole('button', { name: 'categories.newCategory' }));

    expect(
       await screen.findByText("categories.create")
    ).toBeInTheDocument();

    expect(screen.getByText('categories.create')).toBeInTheDocument();
    expect(screen.getByText('categories.discard')).toBeInTheDocument();

    expect(screen.getByRole('form')).toHaveFormValues({
        name: '',
        description: ''
    });

    await _user.type(
        screen.getByRole("textbox", { name: "categories.namePlaceholder"}),
        newCategory.name
    );
    await _user.type(
        screen.getByRole("textbox", { name: "categories.descriptionPlaceholder"}),
        newCategory.description
    );

    expect(
        await screen.findByText('categories.create')
    ).toBeInTheDocument();

    expect(screen.getByRole('form')).toHaveFormValues({
        name: newCategory.name,
        description: newCategory.description
    });

    await _user.click(screen.getByText('categories.create'));
    expect(
      await screen.findByText(newCategory.name)
    ).toBeInTheDocument();
    expect(screen.getByText(newCategory.description)).toBeInTheDocument();
});

test('<Categories /> > New category > Create category. > Discard', async () => {
    const mocks = [
        {
            request: {
                query: GET_CATEGORIES,
                variables: {}
            },
            result: {
                loading: false,
                error: false,
                data: {
                    categories: [
                        {
                            id: 1,
                            name: 'Test',
                            description: 'A test'
                        }
                    ]
                }
            }
        }
    ];

    render({
        isLoggedIn: true,
        mocks: mocks,
        initialEntries: ['/categories']
    });

    await waitFor(() => {
        expect(screen.getByText('categories.categories')).toBeInTheDocument();
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('A test')).toBeInTheDocument();
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'categories.newCategory' }));

    await waitFor(() => {
        expect(screen.getByText('categories.create')).toBeInTheDocument();
    });

    expect(screen.getByText('categories.create')).toBeInTheDocument();
    expect(screen.getByText('categories.discard')).toBeInTheDocument();
    expect(screen.getByRole('form')).toHaveFormValues({
        name: '',
        description: ''
    });

    fireEvent.click(screen.getByText('categories.discard'));

    await waitFor(() => {
        expect(screen.getByText('categories.categories')).toBeInTheDocument();
    });

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('A test')).toBeInTheDocument();
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();

    await waitFor(() => {
        expect(
            screen.getByRole('button', { hidden: true, name: 'categories.newCategory' })
        ).toBeInTheDocument();
    });
});
