import { TopicType } from './topicTypes';

export const getFilteredTopics = (
    topics: TopicType[],
    categoryFilter: string
) => {
    if (categoryFilter === 'all') return topics;

    if (categoryFilter.toLowerCase() === 'uncategorized')
        return topics.filter((t) => t.category === null);

    return topics.filter(
        (t) => t.category && t.category.name === categoryFilter
    );
};
