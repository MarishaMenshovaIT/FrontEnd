export interface Recipe {
  id: number;
  name: string;
  instructions: string;
  ingredients: string;
  prep_time: number;
  img_url: string;
  serves: number;
  userId: number;
  comments: Comment[];
  category: Category[];
}

export interface Category {
  id: number;
  name: string;
  img_url: string;
}

export interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: number;
  rating: number;
  recipeId: number;
}
