interface Category {
  name: string;
}

type UserType = {
  id: number;
  avatar?: string | null | undefined;
  username: string;
};

interface BanStatus {
  banned: boolean;
  banReason: string | null;
}

export interface TopicsHeaderParams {
  isMobile: boolean;
  categories: Category[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  toggleCategoriesDrawer: () => void;
  tr: (key: string) => string;
  isLoggedIn: boolean;
  banStatus: BanStatus;
}

export interface CategoryType {
  id: number;
  name: string;
}

export interface TopicType {
   __typename?: "Topic" | undefined; 
   id: number; 
   name: string; 
   views: number; 
   replies: number; 
   created: string; 
   pinned: boolean; 
   closed: boolean; 
   user: UserType; 
   category?: CategoryType | undefined | null;
};

export interface TopicsListParams {
  topics: TopicType[];
  pinnedTopics: TopicType[];
  isMobile: boolean;
  userType: string;
  t: (key: string) => string;
}

export interface MobileCategoryDrawerProps {
  categoriesData: CategoryType[];
  categoriesDrawer: boolean;
  toggleCategoriesDrawer: () => void;
  selectCategoriesMobile: (name: string) => void;
  t: (key: string) => string;
}
