import { SafariPackage } from '../types';
import { SAFARI_PACKAGES } from '../data/kilimanjaroData';
import { IMAGES } from '../data/images';

const SAFARI_STORAGE_KEY = 'vamos_custom_safari_packages';

export const DEFAULT_SAFARI_PACKAGES_COPY: SafariPackage[] = [
  {
    id: 'serengeti-ngorongoro',
    name: '4-Day Serengeti & Ngorongoro Crater Safari',
    days: 4,
    parks: ['Serengeti National Park', 'Ngorongoro Crater', 'Tarangire National Park'],
    description: 'Experience the ultimate African wildlife safari following your Kilimanjaro climb. Witness the Big Five, vast lion prides, and the Great Wildebeest Migration.',
    priceUSD: 1450,
    image: IMAGES.safariElephants,
    highlights: [
      'Ngorongoro Crater rim view',
      'Big Five wildlife spotting',
      '4x4 Land Cruiser with pop-up roof',
      'Luxury lodge/tent accommodation'
    ],
    bestSeason: 'Year-Round (Migration Jul-Oct & Jan-Mar)',
    category: 'safari'
  },
  {
    id: 'tarangire-manyara',
    name: '2-Day Tarangire & Lake Manyara Express Safari',
    days: 2,
    parks: ['Tarangire National Park', 'Lake Manyara'],
    description: 'Perfect short safari extension. See giant baobab trees, massive elephant herds, flamingos, and famous tree-climbing lions.',
    priceUSD: 680,
    image: IMAGES.safariElephants,
    highlights: [
      'Huge elephant herds in Tarangire',
      'Tree-climbing lions of Manyara',
      'Pink flamingo flocks',
      'Picnic lunch in wild bush'
    ],
    bestSeason: 'Year-Round',
    category: 'safari'
  },
  {
    id: 'zanzibar-beach',
    name: '4-Day Zanzibar Tropical Beach Relaxation',
    days: 4,
    parks: ['Stone Town UNESCO', 'Nungwi & Kendwa Beaches', 'Prison Island'],
    description: 'Relax your legs after 5,895m altitude on white sand beaches, turquoise Indian Ocean waters, and historic spice tours of Zanzibar.',
    priceUSD: 890,
    image: IMAGES.zanzibarBeach,
    highlights: [
      'White sandy beaches',
      'Sunset dhow boat cruise',
      'Stone Town historic walk',
      'Fresh seafood banquets'
    ],
    bestSeason: 'Year-Round',
    category: 'beach'
  },
  {
    id: 'chemka-hotsprings',
    name: 'Chemka (Kikuletwa) Hot Springs Day Trip',
    days: 1,
    parks: ['Moshi / Boma Ng\'ombe', 'Geothermal Oasis', 'Kikuletwa Springs'],
    description: 'Immerse yourself in crystal-clear turquoise geothermal waters sheltered by towering fig and palm trees. Enjoy natural fish pedicure nibbles, rope swinging into deep warm pools, and a delicious Tanzanian picnic lunch.',
    priceUSD: 95,
    image: new URL('../images/M26.jpeg', import.meta.url).href,
    highlights: [
      'Crystal-clear warm turquoise geothermal waters',
      'Rope swing jumping into natural spring pool',
      'Natural fish spa pedicure in mineral waters',
      'Fresh hot Tanzanian local picnic lunch & drinks'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'materuni-waterfalls',
    name: 'Materuni Waterfalls & Chagga Coffee Tour',
    days: 1,
    parks: ['Materuni Village', 'Chagga Foothills', 'Kilimanjaro Slopes'],
    description: 'Hike through lush Chagga farmland to the stunning 80-meter Materuni Waterfall. Take a refreshing swim in the mountain pool, then participate in a traditional coffee-making experience from bean picking and roasting to grinding and brewing fresh organic Kilimanjaro coffee.',
    priceUSD: 85,
    image: new URL('../images/M28.jpeg', import.meta.url).href,
    highlights: [
      '80m high dramatic Materuni Waterfall hike',
      'Swim in natural volcanic mountain pool',
      'Hands-on Chagga coffee roasting & brewing ceremony',
      'Traditional Chagga hot lunch & banana beer tasting'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'serval-wildlife',
    name: 'Serval Wildlife Sanctuary Experience',
    days: 1,
    parks: ['Siha District', 'Wildlife Sanctuary', 'Kilimanjaro Ecosystem'],
    description: 'An unforgettable ethical wildlife interaction in the foothills of Mount Kilimanjaro. Get up close with rescued African animals including majestic lions, serval cats, giraffes, zebras, and elands with breathtaking views of Mount Meru and Kilimanjaro.',
    priceUSD: 220,
    image: new URL('../images/M30.jpeg', import.meta.url).href,
    highlights: [
      'Close-up ethical wildlife interaction & feeding',
      'Rescued lions, serval cats, giraffes & zebras',
      'Spectacular panoramic views of Mt. Meru & Kibo',
      'VIP guided educational animal behavior tour'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'marangu-day-trip',
    name: 'Kilimanjaro 1-Day Trek (Marangu Gate to Mandara Hut)',
    days: 1,
    parks: ['Kilimanjaro National Park', 'Mandara Hut (2,700m)', 'Maundi Crater'],
    description: 'Experience Mount Kilimanjaro in a single day! Trek through the lush montane rainforest from Marangu Gate (1,870m) up to Mandara Hut (2,700m). Explore the volcanic Maundi Crater with breathtaking views into Kenya and spot blue monkeys and colobus monkeys along the trail.',
    priceUSD: 170,
    image: new URL('../images/M5.jpeg', import.meta.url).href,
    highlights: [
      'Experience climbing Kilimanjaro in 1 day',
      'Trek through lush rainforest to Mandara Hut (2,700m)',
      'Maundi Crater panoramic viewpoint into Kenya',
      'National Park entrance fees & picnic lunch included'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'moshi-town-tour',
    name: 'Moshi Cultural & Historical Town Tour',
    days: 1,
    parks: ['Moshi Town', 'Central Market', 'Old Railway Station'],
    description: 'Discover the vibrant heart of Moshi town nestled at the base of Mount Kilimanjaro. Visit the bustling Central Market with exotic spices and fruits, the historic German Old Railway Station with iconic mountain photo spots, local artisan crafts, and enjoy authentic Swahili street food.',
    priceUSD: 65,
    image: new URL('../images/M32.jpeg', import.meta.url).href,
    highlights: [
      'Vibrant Moshi Central Market & spice stalls',
      'Historic Old Railway Station with Kilimanjaro view',
      'Local Tanzanian artisan workshops & souvenir market',
      'Authentic Swahili street food & local coffee stop'
    ],
    bestSeason: 'Year-Round',
    category: 'cultural'
  },
  {
    id: 'rau-forest',
    name: 'Rau Forest Eco-Reserve & Colobus Monkey Walk',
    days: 1,
    parks: ['Rau Eco-Forest', 'Groundwater Reserve', 'Moshi Outskirts'],
    description: 'Explore the protected Rau Groundwater Forest on foot or by bicycle. Encounter troops of Black-and-White Colobus and Blue Monkeys, discover the 200-year-old sacred Mvule tree, enjoy peaceful rice paddy vistas, and participate in our active tree planting conservation initiative.',
    priceUSD: 70,
    image: new URL('../images/M14.jpeg', import.meta.url).href,
    highlights: [
      'Black-and-White Colobus monkey troop encounters',
      '200-year-old giant sacred Mvule tree',
      'Serene forest walking or cycling eco-trails',
      'Tree planting activity supporting forest conservation'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'lake-chala',
    name: 'Lake Chala Caldera & Kayaking Day Trip',
    days: 1,
    parks: ['Lake Chala Caldera', 'Taveta Border', 'Crater Lake'],
    description: 'Journey to Lake Chala, a stunning 100-meter deep volcanic crater lake on the border of Tanzania and Kenya. Hike down the steep crater rim, enjoy optional kayaking on emerald waters, observe diverse bird species, and enjoy a picnic lunch overlooking the caldera.',
    priceUSD: 115,
    image: new URL('../images/M19.jpeg', import.meta.url).href,
    highlights: [
      'Stunning emerald volcanic caldera lake',
      'Crater rim hike with 360-degree panoramas',
      'Optional kayaking and swimming in calm waters',
      'Picnic lunch overlooking the Kenya border'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  }
];

export function getStoredSafariPackages(): SafariPackage[] {
  try {
    const raw = localStorage.getItem(SAFARI_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load safari packages from storage', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_SAFARI_PACKAGES_COPY));
}

export function saveSafariPackages(packages: SafariPackage[]): void {
  try {
    localStorage.setItem(SAFARI_STORAGE_KEY, JSON.stringify(packages));
    applySafarisToData(packages);
  } catch (err) {
    console.error('Failed to save safari packages to storage', err);
  }
}

export function resetSafariPackages(): SafariPackage[] {
  try {
    localStorage.removeItem(SAFARI_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset safari packages in storage', err);
  }
  const defaults = JSON.parse(JSON.stringify(DEFAULT_SAFARI_PACKAGES_COPY));
  applySafarisToData(defaults);
  return defaults;
}

export function applySafarisToData(packages: SafariPackage[]): void {
  if (!packages || !Array.isArray(packages)) return;
  
  // Clear and mutate in-place so all references across the app stay in sync
  SAFARI_PACKAGES.length = 0;
  packages.forEach(p => {
    SAFARI_PACKAGES.push({ ...p });
  });
}
