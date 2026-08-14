import { ImageAsset } from './types';

export const HERO_IMAGES: Record<string, ImageAsset> = {
  mainHeroBg: {
    id: 'hero_main_bg',
    url: new URL('./M1.jpeg', import.meta.url).href,
    alt: 'Majestic Mount Kilimanjaro snow peak above acacia savanna',
    caption: 'Mount Kilimanjaro 5,895m Uhuru Peak view',
    category: 'hero',
    aspectRatio: '16:9',
    layoutTarget: 'HeroSection'
  },
  heroAltBg: {
    id: 'hero_alt_bg',
    url: new URL('./M2.jpeg', import.meta.url).href,
    alt: 'Sunrise above the clouds over Uhuru Peak summit',
    caption: 'Stella Point Summit Sunrise',
    category: 'hero',
    aspectRatio: '16:9',
    layoutTarget: 'HeroSection Mobile Fallback'
  },
  aboutBanner: {
    id: 'hero_about_banner',
    url: new URL('./M3.jpeg', import.meta.url).href,
    alt: 'Expedition team trekking along ridge line',
    caption: '100% Local Moshi Expedition Team',
    category: 'hero',
    aspectRatio: '16:9',
    layoutTarget: 'AboutView Banner'
  }
};
