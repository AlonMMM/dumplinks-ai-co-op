
import type { CardData } from './types';
import { CardType, Intent } from './types';

export const MOCK_CARDS: CardData[] = [
  {
    id: '0',
    url: 'https://github.com/google/labs-prototyping-frontend-interview-challenge',
    cardType: CardType.READ_LATER,
    intent: Intent.REFERENCE,
    title: 'Welcome to DumpLinks!',
    description: 'This is your intelligent internet memory. Save any link and it will be automatically categorized and summarized for you. Click on this card to see more details, edit, or delete it!',
    imageUrl: 'https://picsum.photos/seed/welcome/600/600',
    additionalImages: ['https://picsum.photos/seed/welcome2/600/600', 'https://picsum.photos/seed/welcome3/600/600'],
    userNote: 'Remember to show this to the team next Monday!',
    isFavorite: true,
    source: 'DumpLinks',
    tags: ['welcome', 'getting-started'],
    date: new Date().toISOString(),
    readLaterDetails: { author: 'DumpLinks Team', readTime: '1 min read', subject: 'Onboarding' }
  },
  {
    id: '1',
    url: 'https://www.amazon.com/dp/B09B2SB32J',
    cardType: CardType.SHOPPING,
    intent: Intent.TO_BUY,
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    description: 'Industry-leading noise canceling with two processors controlling 8 microphones.',
    imageUrl: 'https://picsum.photos/seed/headphones/600/800',
    additionalImages: ['https://picsum.photos/seed/headphones2/600/800', 'https://picsum.photos/seed/headphones3/600/800'],
    source: 'Amazon',
    tags: ['electronics', 'audio', 'headphones', 'sony'],
    date: '2024-07-26T10:00:00Z',
    userNote: 'Wait for Black Friday sale. Target price: $300.',
    shoppingDetails: { price: '$398.00', rating: 4.6, reviewsCount: 12543, topPositiveReview: 'The noise cancellation is mind-blowing.', topNegativeReview: 'The new design is not as portable as the previous model.' }
  },
  {
    id: '2',
    url: 'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
    cardType: CardType.RECIPE,
    intent: Intent.TO_COOK,
    title: 'Giant Crinkled Chocolate Chip Cookies',
    description: 'These cookies are big, bendy, and deeply flavored with a crinkly, crispy top.',
    imageUrl: 'https://picsum.photos/seed/cookies/600/750',
    source: 'NYT Cooking',
    tags: ['baking', 'dessert', 'cookies', 'chocolate'],
    date: '2024-07-25T14:30:00Z',
    isFavorite: true,
    recipeDetails: {
      ingredients: ['2 cups all-purpose flour', '1/2 teaspoon baking soda', '3/4 teaspoon salt', '1/2 cup unsalted butter', '1 1/2 cups packed dark brown sugar'],
      instructions: ['Whisk flour, baking soda, and salt.', 'Cream butter and sugars.', 'Add egg and vanilla.', 'Mix in dry ingredients and chocolate chips.', 'Bake at 350°F for 12-14 minutes.'],
      prepTime: '20 minutes', cookTime: '15 minutes', totalTime: '35 minutes', servings: '10 cookies', difficulty: 'Medium', calories: '320 kcal'
    }
  },
  {
    id: '3',
    url: 'https://www.theverge.com/23929426/apple-macbook-pro-14-16-inch-m3-pro-max-review',
    cardType: CardType.READ_LATER,
    intent: Intent.TO_READ,
    title: 'Apple MacBook Pro (M3 Max) review: a powerful step forward',
    description: "Apple's new M3 Max chip makes the MacBook Pro an incredibly powerful machine for creative professionals.",
    imageUrl: 'https://picsum.photos/seed/macbook/600/600',
    source: 'The Verge',
    tags: ['tech', 'review', 'apple', 'laptop'],
    date: '2024-06-24T09:00:00Z',
    readLaterDetails: { author: 'Nilay Patel', readTime: '15 min read', subject: 'Technology Review' }
  },
  {
    id: '17',
    url: 'https://www.yogajournal.com/practice/yoga-sequences/morning-yoga-routine/',
    cardType: CardType.HEALTH_FITNESS,
    intent: Intent.TO_DO,
    title: '15-Minute Morning Yoga Routine',
    description: 'Wake up your body and mind with this energizing flow.',
    imageUrl: 'https://picsum.photos/seed/yoga/600/400',
    source: 'Yoga Journal',
    tags: ['yoga', 'morning', 'wellness'],
    date: '2024-08-15T07:00:00Z',
    healthFitnessDetails: { activityType: 'Yoga', duration: '15 mins', difficulty: 'Beginner', equipmentNeeded: ['Yoga Mat'] }
  },
  {
    id: '18',
    url: 'https://www.coursera.org/learn/python',
    cardType: CardType.EDUCATION,
    intent: Intent.TO_LEARN,
    title: 'Python for Everybody',
    description: 'This course aims to teach everyone the basics of programming computers using Python.',
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    source: 'Coursera',
    tags: ['coding', 'python', 'education'],
    date: '2024-08-14T14:00:00Z',
    educationDetails: { topic: 'Python Programming', provider: 'University of Michigan', level: 'Beginner', duration: 'Approx. 8 months', certification: true }
  },
];
