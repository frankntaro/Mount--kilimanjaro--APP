export interface DailyItineraryItem {
  day: number;
  title: string;
  startElevation: number;
  endElevation: number;
  distanceKm: number;
  hikingHours: string;
  habitat: string;
  description: string;
  highlights: string[];
}

export interface Route {
  id: string;
  name: string;
  days: number;
  difficulty: 'Easy-Moderate' | 'Moderate' | 'Challenging' | 'Strenuous';
  successRate: number;
  shortDescription: string;
  fullDescription: string;
  badgeText?: string;
  priceUSD: number;
  heroImage: string;
  galleryImages: string[];
  acclimatizationScore: number; // 1-10
  sceneryRating: number; // 1-10
  crowdLevel: 'Low' | 'Medium' | 'High';
  accommodation: 'Camping' | 'Mountain Huts';
  elevationProfile: { day: number; elevation: number; label: string }[];
  dailyItinerary: DailyItineraryItem[];
  includedItems: string[];
}

export interface SafariPackage {
  id: string;
  name: string;
  days: number;
  parks: string[];
  description: string;
  priceUSD: number;
  image: string;
  highlights: string[];
  bestSeason: string;
}

export interface Testimonial {
  id: string;
  author: string;
  country: string;
  route: string;
  quote: string;
  rating: number;
  avatar: string;
  date: string;
  verifiedSummit: boolean;
}

export interface BookingFormData {
  routeName: string;
  startDate: string;
  climbersCount: number;
  safariAddon?: string;
  fullName: string;
  email: string;
  phone: string;
  gearRentalNeeded: boolean;
  notes?: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'Clothing' | 'Footwear' | 'Technical Gear' | 'Medical & Hygiene' | 'Personal & Electronics';
  required: boolean;
  description: string;
}

export type ActiveTab = 'home' | 'about' | 'routes' | 'safaris' | 'plan' | 'conservation' | 'blog' | 'contact' | 'admin';
