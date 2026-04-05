
export enum CardType {
  SHOPPING = 'SHOPPING',
  RECIPE = 'RECIPE',
  READ_LATER = 'READ_LATER',
  VIDEO = 'VIDEO',
  TRAVEL = 'TRAVEL',
  RESTAURANT = 'RESTAURANT',
  HEALTH_FITNESS = 'HEALTH_FITNESS',
  EDUCATION = 'EDUCATION',
  DIY_CRAFTS = 'DIY_CRAFTS',
  PARENTING = 'PARENTING',
  FINANCE = 'FINANCE',
  OTHER = 'OTHER',
}

export enum Intent {
  TO_BUY = 'TO_BUY',
  TO_READ = 'TO_READ',
  TO_WATCH = 'TO_WATCH',
  TO_VISIT = 'TO_VISIT',
  TO_COOK = 'TO_COOK',
  TO_EAT = 'TO_EAT',
  TO_LEARN = 'TO_LEARN',
  TO_DO = 'TO_DO',
  INSPIRATION = 'INSPIRATION',
  REFERENCE = 'REFERENCE',
}

export type GroupByOption = 'none' | 'list' | 'topic' | 'date';

export interface ShoppingDetails {
  price: string;
  rating?: number;
  reviewsCount?: number;
  topPositiveReview?: string;
  topNegativeReview?: string;
}

export interface RecipeDetails {
  ingredients: string[];
  instructions: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;
  difficulty?: string;
  calories?: string;
}

export interface ReadLaterDetails {
  author?: string;
  readTime?: string;
  subject?: string;
}

export interface TravelDetails {
  address: string;
  googleMapsUrl?: string;
  category?: string;
  rating?: number;
  phoneNumber?: string;
  ticketPrice?: string;
  openingHours?: string[];
}

export interface RestaurantDetails {
  address: string;
  googleMapsUrl?: string;
  category?: string;
  rating?: number;
  phoneNumber?: string;
  reservationLink?: string;
  priceLevel?: string;
  cuisine?: string[];
  openingHours?: string[];
}

export interface HealthFitnessDetails {
  activityType?: string;
  duration?: string;
  difficulty?: string;
  caloriesBurned?: string;
  equipmentNeeded?: string[];
}

export interface EducationDetails {
  topic?: string;
  level?: string;
  provider?: string;
  duration?: string;
  certification?: boolean;
}

export interface DiyCraftsDetails {
  projectType?: string;
  materials?: string[];
  estimatedTime?: string;
  difficulty?: string;
}

export interface ParentingDetails {
  activityType?: string;
  ageGroup?: string;
  itemsNeeded?: string[];
}

export interface FinanceDetails {
  category?: string;
  promoCode?: string;
  expiryDate?: string;
  savings?: string;
}

export interface CardData {
  id: string;
  url: string;
  cardType: CardType;
  intent: Intent;
  title: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  userNote?: string;
  isFavorite?: boolean;
  source: string;
  tags: string[];
  date: string;
  shoppingDetails?: ShoppingDetails;
  recipeDetails?: RecipeDetails;
  readLaterDetails?: ReadLaterDetails;
  travelDetails?: TravelDetails;
  restaurantDetails?: RestaurantDetails;
  healthFitnessDetails?: HealthFitnessDetails;
  educationDetails?: EducationDetails;
  diyCraftsDetails?: DiyCraftsDetails;
  parentingDetails?: ParentingDetails;
  financeDetails?: FinanceDetails;
}

export interface SearchFilters {
  cardTypes?: CardType[];
  intents?: Intent[];
  tags?: string[];
  searchTerm?: string;
  dateRange?: { start?: string; end?: string };
  priceRange?: { min?: number; max?: number };
  rating?: { min?: number };
}

export interface User {
  email: string;
  name?: string;
  profilePictureUrl?: string;
}
