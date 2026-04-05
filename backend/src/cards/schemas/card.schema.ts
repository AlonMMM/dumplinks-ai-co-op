import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

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

@Schema({ _id: false })
class ShoppingDetails {
  @Prop() price: string;
  @Prop() rating?: number;
  @Prop() reviewsCount?: number;
  @Prop() topPositiveReview?: string;
  @Prop() topNegativeReview?: string;
}

@Schema({ _id: false })
class RecipeDetails {
  @Prop([String]) ingredients: string[];
  @Prop([String]) instructions: string[];
  @Prop() prepTime?: string;
  @Prop() cookTime?: string;
  @Prop() totalTime?: string;
  @Prop() servings?: string;
  @Prop() difficulty?: string;
  @Prop() calories?: string;
}

@Schema({ _id: false })
class ReadLaterDetails {
  @Prop() author?: string;
  @Prop() readTime?: string;
  @Prop() subject?: string;
}

@Schema({ _id: false })
class TravelDetails {
  @Prop() address: string;
  @Prop() googleMapsUrl?: string;
  @Prop() category?: string;
  @Prop() rating?: number;
  @Prop() phoneNumber?: string;
  @Prop() ticketPrice?: string;
  @Prop([String]) openingHours?: string[];
}

@Schema({ _id: false })
class RestaurantDetails {
  @Prop() address: string;
  @Prop() googleMapsUrl?: string;
  @Prop() category?: string;
  @Prop() rating?: number;
  @Prop() phoneNumber?: string;
  @Prop() reservationLink?: string;
  @Prop() priceLevel?: string;
  @Prop([String]) cuisine?: string[];
  @Prop([String]) openingHours?: string[];
}

@Schema({ _id: false })
class HealthFitnessDetails {
  @Prop() activityType?: string;
  @Prop() duration?: string;
  @Prop() difficulty?: string;
  @Prop() caloriesBurned?: string;
  @Prop([String]) equipmentNeeded?: string[];
}

@Schema({ _id: false })
class EducationDetails {
  @Prop() topic?: string;
  @Prop() level?: string;
  @Prop() provider?: string;
  @Prop() duration?: string;
  @Prop() certification?: boolean;
}

@Schema({ _id: false })
class DiyCraftsDetails {
  @Prop() projectType?: string;
  @Prop([String]) materials?: string[];
  @Prop() estimatedTime?: string;
  @Prop() difficulty?: string;
}

@Schema({ _id: false })
class ParentingDetails {
  @Prop() activityType?: string;
  @Prop() ageGroup?: string;
  @Prop([String]) itemsNeeded?: string[];
}

@Schema({ _id: false })
class FinanceDetails {
  @Prop() category?: string;
  @Prop() promoCode?: string;
  @Prop() expiryDate?: string;
  @Prop() savings?: string;
}

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, enum: CardType })
  cardType: CardType;

  @Prop({ required: true, enum: Intent })
  intent: Intent;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop([String])
  additionalImages: string[];

  @Prop({ default: '' })
  source: string;

  @Prop([String])
  tags: string[];

  @Prop({ required: true })
  date: string;

  @Prop({ default: '' })
  userNote: string;

  @Prop({ default: false })
  isFavorite: boolean;

  @Prop({ type: Object })
  shoppingDetails?: ShoppingDetails;

  @Prop({ type: Object })
  recipeDetails?: RecipeDetails;

  @Prop({ type: Object })
  readLaterDetails?: ReadLaterDetails;

  @Prop({ type: Object })
  travelDetails?: TravelDetails;

  @Prop({ type: Object })
  restaurantDetails?: RestaurantDetails;

  @Prop({ type: Object })
  healthFitnessDetails?: HealthFitnessDetails;

  @Prop({ type: Object })
  educationDetails?: EducationDetails;

  @Prop({ type: Object })
  diyCraftsDetails?: DiyCraftsDetails;

  @Prop({ type: Object })
  parentingDetails?: ParentingDetails;

  @Prop({ type: Object })
  financeDetails?: FinanceDetails;
}

export const CardSchema = SchemaFactory.createForClass(Card);
