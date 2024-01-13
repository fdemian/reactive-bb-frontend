type Category = {
    name: string;
};

type BanStatus = {
    banned: boolean;
    banReason: string | null;
};

export type TopicsHeaderParams = {
    isMobile: boolean;
    categories: Category[];
    categoryFilter: string;
    setCategoryFilter: (value: any) => void;
    toggleCategoriesDrawer: (value: any) => void;
    tr: (key: string) => string;
    isLoggedIn: boolean;
    banStatus: BanStatus;
};

type UserType = {
    id: number;
    avatar: string;
    username: string;
};

export type CategoryType = {
    id: number;
    name: string;
};

export type TopicType = {
    id: number;
    name: string;
    views: number;
    replies: number;
    created: string;
    closed: boolean;
    pinned: boolean;
    user: UserType;
    category: CategoryType;
};

export type TopicsListParams = {
    topics: TopicType[];
    pinnedTopics: TopicType[];
    isMobile: boolean;
    userType: string;
    t: (key: string) => string;
};

export type MobileCategoryDrawerProps = {
    categoriesData: CategoryType[];
    categoriesDrawer: boolean;
    toggleCategoriesDrawer: () => void;
    selectCategoriesMobile: (name: string) => void;
    t: (key: string) => string;
};
