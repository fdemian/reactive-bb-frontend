interface UserType {
  id: number;
  username: string;
  avatar: string;
}

interface PostType {
  id: number;
  content: string;
  user: UserType;
}

interface RemoveBookmarkFnProps {
  variables: {
    user: number | null;
    post: number | null;
  };
  optimisticResponse: {
    removeBookmark: {
      id: number;
      ok: boolean;
      userId: number | null;
      postId: number;
    };
  };
}

export interface BookmarkType {
  __ref: string;
  id: number;
  post: PostType;
}

export interface BookmarkListProps {
  bookmarks: BookmarkType[];
  userId: number | null;
  removeBookmark: (props: RemoveBookmarkFnProps) => void;
  t: (key: string) => string;
}
