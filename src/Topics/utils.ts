import { TopicType } from './topicTypes';

export const getFilteredTopics = (
  topics: TopicType[],
  categoryFilter: string
): TopicType[] => {
  const _categoryFilter = categoryFilter.toLocaleLowerCase();
  
  if (_categoryFilter === 'all') return topics;

  if (_categoryFilter === 'uncategorized')
    return topics.filter((t) => t.category === null);

  return topics.filter((t) => t.category && t.category.name === categoryFilter);
};
