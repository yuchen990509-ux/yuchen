export type Category = 
  | 'Text' 
  | 'Image' 
  | 'Video' 
  | 'Audio' 
  | 'Code' 
  | 'Productivity' 
  | 'Marketing' 
  | 'Other';

export interface AITool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: Category;
  tags: string[];
  url: string;
  imageUrl: string;
  isPopular?: boolean;
  pros?: string[];
  cons?: string[];
  bestFor?: string;
}
