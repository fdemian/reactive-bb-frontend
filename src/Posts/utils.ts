import { CategoryType } from '../Topics/topicTypes';
import { UserType } from '../User/userTypes';
import format_title_string from '../utils/formats';
import { format, formatDistance, parseISO } from 'date-fns';

const REPLYING_POST_CONTENT = 'REPLYING_POST_CONTENT';
const REPLYING_POST_USER = 'REPLYING_POST_USER';
const REPLYING_POST_COMMENT_LINK = 'REPLYING_POST_COMMENT_LINK';
const REPLYING_POST_USER_ID = 'REPLYING_POST_USER_ID';

export const getPostReplyContent = () => {
  return {
    content: localStorage.getItem(REPLYING_POST_CONTENT) ?? undefined,
    user: localStorage.getItem(REPLYING_POST_USER),
    userId: localStorage.getItem(REPLYING_POST_USER_ID),
    comment: localStorage.getItem(REPLYING_POST_COMMENT_LINK),
  };
};

export const clearPostReplyContent = () => {
  localStorage.removeItem(REPLYING_POST_CONTENT);
  localStorage.removeItem(REPLYING_POST_USER);
  localStorage.removeItem(REPLYING_POST_USER_ID);
  localStorage.removeItem(REPLYING_POST_COMMENT_LINK);
};

export const savePostReplyContent = (
  content: string,
  user: UserType,
  commentLink: string
) => {
  localStorage.setItem(REPLYING_POST_CONTENT, content);
  localStorage.setItem(REPLYING_POST_USER, user.username);
  localStorage.setItem(REPLYING_POST_USER_ID, user.id.toString());
  localStorage.setItem(REPLYING_POST_COMMENT_LINK, commentLink);
};

export const getCategoryURL = (category: CategoryType) => {
  if (category.id === -1) return '/categories/-1/uncategorized';

  return `/categories/${category.id}/${format_title_string(category.name)}`;
};

export const getCategoryName = (category: CategoryType) =>
  category.id > -1 ? category.name : 'Uncategorized';

export const getDate = (date: string) =>
  format(new Date(date), 'MMM d yyyy, h:mm');
export const getDateRelative = (date: string) =>
  formatDistance(parseISO(date), new Date(), { addSuffix: true });
