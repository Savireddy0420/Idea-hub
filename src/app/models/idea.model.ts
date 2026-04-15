export interface Idea {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  likes: number;
  comments: string[];

  createdAt?: number;  // ✅ for latest idea logic
  isNew?: boolean;     // ✅ for NEW badge
}