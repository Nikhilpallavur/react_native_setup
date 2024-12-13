export interface ArticleType {
  id: number;
  title: string;
  url: string;
  source: string;
  category: string;
  created_at: string; // Use string for ISO dates
  image_url: string;
  totalLikeCount?: number;
  totalBookmarkCount?: number;
  userLiked?: boolean;
  userBookmarked?: boolean;
}
