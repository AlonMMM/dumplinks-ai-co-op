import { GoogleGenAI, Type } from '@google/genai';
import { type CardData, CardType, Intent, type SearchFilters } from '../types';

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn('GEMINI_API_KEY not set. AI features disabled.');
}

const searchResponseSchema = {
  type: Type.OBJECT,
  properties: {
    cardTypes: { type: Type.ARRAY, items: { type: Type.STRING, enum: Object.values(CardType) } },
    intents: { type: Type.ARRAY, items: { type: Type.STRING, enum: Object.values(Intent) } },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    searchTerm: { type: Type.STRING, description: 'Keywords for general text search.' },
    dateRange: {
      type: Type.OBJECT,
      properties: {
        start: { type: Type.STRING, description: 'Start date YYYY-MM-DD.' },
        end: { type: Type.STRING, description: 'End date YYYY-MM-DD.' },
      },
    },
    priceRange: {
      type: Type.OBJECT,
      properties: { min: { type: Type.NUMBER }, max: { type: Type.NUMBER } },
    },
    rating: { type: Type.OBJECT, properties: { min: { type: Type.NUMBER } } },
  },
};

const cardAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    description: { type: Type.STRING },
    cardType: { type: Type.STRING, enum: Object.values(CardType) },
    intent: { type: Type.STRING, enum: Object.values(Intent) },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    source: { type: Type.STRING },
    shoppingDetails: {
      type: Type.OBJECT,
      properties: {
        price: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        reviewsCount: { type: Type.NUMBER },
        topPositiveReview: { type: Type.STRING },
        topNegativeReview: { type: Type.STRING },
      },
      nullable: true,
    },
    recipeDetails: {
      type: Type.OBJECT,
      properties: {
        ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
        instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
        prepTime: { type: Type.STRING },
        cookTime: { type: Type.STRING },
        totalTime: { type: Type.STRING },
        servings: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        calories: { type: Type.STRING },
      },
      nullable: true,
    },
    readLaterDetails: {
      type: Type.OBJECT,
      properties: { author: { type: Type.STRING }, readTime: { type: Type.STRING }, subject: { type: Type.STRING } },
      nullable: true,
    },
    travelDetails: {
      type: Type.OBJECT,
      properties: {
        address: { type: Type.STRING },
        googleMapsUrl: { type: Type.STRING },
        category: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        phoneNumber: { type: Type.STRING },
        ticketPrice: { type: Type.STRING },
        openingHours: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      nullable: true,
    },
    restaurantDetails: {
      type: Type.OBJECT,
      properties: {
        address: { type: Type.STRING },
        googleMapsUrl: { type: Type.STRING },
        category: { type: Type.STRING },
        rating: { type: Type.NUMBER },
        phoneNumber: { type: Type.STRING },
        reservationLink: { type: Type.STRING },
        priceLevel: { type: Type.STRING },
        cuisine: { type: Type.ARRAY, items: { type: Type.STRING } },
        openingHours: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      nullable: true,
    },
    healthFitnessDetails: {
      type: Type.OBJECT,
      properties: {
        activityType: { type: Type.STRING },
        duration: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        caloriesBurned: { type: Type.STRING },
        equipmentNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      nullable: true,
    },
    educationDetails: {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING },
        level: { type: Type.STRING },
        provider: { type: Type.STRING },
        duration: { type: Type.STRING },
        certification: { type: Type.BOOLEAN },
      },
      nullable: true,
    },
    diyCraftsDetails: {
      type: Type.OBJECT,
      properties: {
        projectType: { type: Type.STRING },
        materials: { type: Type.ARRAY, items: { type: Type.STRING } },
        estimatedTime: { type: Type.STRING },
        difficulty: { type: Type.STRING },
      },
      nullable: true,
    },
    parentingDetails: {
      type: Type.OBJECT,
      properties: {
        activityType: { type: Type.STRING },
        ageGroup: { type: Type.STRING },
        itemsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      nullable: true,
    },
    financeDetails: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING },
        promoCode: { type: Type.STRING },
        expiryDate: { type: Type.STRING },
        savings: { type: Type.STRING },
      },
      nullable: true,
    },
  },
  required: ['description', 'cardType', 'intent', 'tags', 'source'],
};

async function fetchLinkMetadata(url: string) {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) return null;

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const getMeta = (selectors: string[]) => {
      for (const selector of selectors) {
        const el = doc.querySelector(selector);
        if (el) { const c = el.getAttribute('content'); if (c) return c; }
      }
      return null;
    };

    const title = getMeta(['meta[property="og:title"]', 'meta[name="twitter:title"]']) || doc.title;
    const description = getMeta(['meta[property="og:description"]', 'meta[name="twitter:description"]', 'meta[name="description"]']);
    const image = getMeta(['meta[property="og:image:secure_url"]', 'meta[property="og:image"]', 'meta[name="twitter:image"]']);
    const siteName = getMeta(['meta[property="og:site_name"]']);

    let resolvedImage: string | null = null;
    if (image) {
      try { resolvedImage = new URL(image, url).href; } catch { /* ignore */ }
    }

    const additionalImages: string[] = [];
    const seenImages = new Set<string>();
    if (resolvedImage) seenImages.add(resolvedImage);

    doc.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && additionalImages.length < 5) {
        try {
          const fullUrl = new URL(src, url).href;
          if (!seenImages.has(fullUrl) && !fullUrl.endsWith('.svg') && !fullUrl.includes('logo') && !fullUrl.includes('icon') && !fullUrl.includes('pixel')) {
            additionalImages.push(fullUrl);
            seenImages.add(fullUrl);
          }
        } catch { /* ignore */ }
      }
    });

    doc.querySelectorAll('script, style, noscript, iframe, svg').forEach(el => el.remove());
    const rawText = doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';

    return { title, description, image: resolvedImage, additionalImages, siteName, rawText: rawText.substring(0, 8000) };
  } catch {
    return null;
  }
}

export async function processLink(url: string): Promise<Omit<CardData, 'id' | 'date'>> {
  const metadata = await fetchLinkMetadata(url);
  const hostname = new URL(url).hostname.replace('www.', '');

  if (!ai) {
    return {
      url,
      cardType: CardType.OTHER,
      intent: Intent.REFERENCE,
      title: metadata?.title || hostname,
      description: metadata?.description || 'No description available.',
      imageUrl: metadata?.image || `https://picsum.photos/seed/${Date.now()}/600/400`,
      additionalImages: metadata?.additionalImages || [],
      source: metadata?.siteName || hostname,
      tags: [hostname.split('.')[0]],
    };
  }

  const prompt = `Analyze this URL and page content, then return a structured JSON response.
URL: ${url}
Page Title: ${metadata?.title || 'N/A'}
Page Description: ${metadata?.description || 'N/A'}
Site Name: ${metadata?.siteName || hostname}
Page Text Excerpt: ${metadata?.rawText?.substring(0, 3000) || 'N/A'}`;

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json', responseSchema: cardAnalysisSchema },
  });

  const parsed = JSON.parse(result.text || '{}');

  return {
    url,
    cardType: parsed.cardType || CardType.OTHER,
    intent: parsed.intent || Intent.REFERENCE,
    title: metadata?.title || parsed.title || hostname,
    description: parsed.description || metadata?.description || '',
    imageUrl: metadata?.image || `https://picsum.photos/seed/${Date.now()}/600/400`,
    additionalImages: metadata?.additionalImages || [],
    source: parsed.source || metadata?.siteName || hostname,
    tags: parsed.tags || [],
    shoppingDetails: parsed.shoppingDetails || undefined,
    recipeDetails: parsed.recipeDetails || undefined,
    readLaterDetails: parsed.readLaterDetails || undefined,
    travelDetails: parsed.travelDetails || undefined,
    restaurantDetails: parsed.restaurantDetails || undefined,
    healthFitnessDetails: parsed.healthFitnessDetails || undefined,
    educationDetails: parsed.educationDetails || undefined,
    diyCraftsDetails: parsed.diyCraftsDetails || undefined,
    parentingDetails: parsed.parentingDetails || undefined,
    financeDetails: parsed.financeDetails || undefined,
  };
}

export async function processSearchQuery(query: string): Promise<SearchFilters> {
  if (!ai) return { searchTerm: query };

  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Parse this search query into structured filters for a link-saving app. Today's date: ${new Date().toISOString().split('T')[0]}. Query: "${query}"`,
    config: { responseMimeType: 'application/json', responseSchema: searchResponseSchema },
  });

  return JSON.parse(result.text || '{}');
}
