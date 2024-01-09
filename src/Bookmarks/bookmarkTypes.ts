type UserType = {
  id: number;
  username: string;
  avatar: string;
};

type PostType = {
    id: number;
    content: string;
    user: UserType;
}

type RemoveBookmarkFnProps = {
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
};

export type BookmarkType = {
    __ref: string;
    id: number;
    post: PostType;
};

export type BookmarkListProps = { 
    bookmarks: BookmarkType[];
    userId: number | null ;
    removeBookmark: (props:RemoveBookmarkFnProps) => void; 
    t: (key:string) => string;
};