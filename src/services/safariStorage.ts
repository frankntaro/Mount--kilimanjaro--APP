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
    bestSeason: 'Year-Round (Migration Jul-Oct & Jan-Mar)'
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
    bestSeason: 'Year-Round'
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
    bestSeason: 'Year-Round'
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
