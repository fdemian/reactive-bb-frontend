interface PostTypeBookmark {
  __typename?: "Post" | undefined;
  id: number;
  content: string;
  user: {
    __typename?: "User" | undefined;
    id: number;
    username: string;
    avatar?: string | null | undefined;
  };
};

interface RemoveBookmarkFnProps {
  variables: {
    user: number;
    post: number;
  };
  optimisticResponse: {
    removeBookmark: {
      id: number;
      ok: boolean;
      userId: number;
      postId: number;
    };
  };
}

export interface BookmarkType {
  __typename?: "Bookmark" | undefined;
  __ref?: string;
  id: number;
  post: PostTypeBookmark | null | undefined;
}

export interface BookmarkListProps {
  bookmarks: BookmarkType[];
  userId: number | null;
  removeBookmark: (props: RemoveBookmarkFnProps) => void;
  t: (key: string) => string;
}
