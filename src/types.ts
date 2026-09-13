export interface FoodItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Pizza' | 'Pasta' | 'Healthy Bowls' | 'Salad' | 'Drinks' | 'Desserts';
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  isSpecial?: boolean;
  isVegetarian?: boolean;
  badge?: string;
  calories?: number;
  prepTime?: string;
  ingredients?: string[];
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
  selectedOption?: string;
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  categoryKey: 'Burgers' | 'Pizza' | 'Pasta' | 'Healthy Bowls' | 'Desserts';
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  specialty: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  orderFavorite?: string;
}
