interface PostTypeBookmark {
  __typename?: "Post" | undefined;
  id: number;
  content: string;
  user: {
      __typename?: "User" | undefined;
      id: number;
      username: string;
      avatar?: string | null| undefined;
  }
};


export interface BookmarkType {
  __typename?: "Bookmark" | undefined;
  id: number;
  post?: PostTypeBookmark | undefined | null;
  __ref?: string;
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

export interface BookmarkListProps {
  bookmarks: BookmarkType[];
  userId: number | null;
  removeBookmark: (props: RemoveBookmarkFnProps) => void;
  t: (key: string) => string;
}
