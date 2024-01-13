type QuoteStateProps = {
    content: string | undefined;
    user: string | null;
    userId: string | null;
    comment: string | null;
};

export const getQuoteStateFromProps = (
    props: QuoteStateProps
): string | undefined => {
    const { content, user, userId, comment } = props;

    if (content === null || content === undefined) return undefined;

    const quotedContent = {
        root: {
            children: [
                {
                    children: [
                        {
                            authorName: `@${user}`,
                            authorLink: `/users/${userId}/${user}`,
                            authorAvatar: '',
                            sourceContent: JSON.parse(content),
                            sourceLink: comment,
                            type: 'cite-node',
                            version: 1,
                        },
                    ],
                    direction: null,
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                },
            ],
            direction: null,
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
        },
    };

    return JSON.stringify(quotedContent);
};
