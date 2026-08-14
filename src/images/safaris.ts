import { ImageAsset } from './types';

export const SAFARI_IMAGES: Record<string, ImageAsset> = {
  serengetiElephants: {
    id: 'safari_elephants',
    url: new URL('./M23.jpeg', import.meta.url).href,
    alt: 'Elephant herd in Serengeti National Park Tanzania',
    caption: 'Serengeti & Ngorongoro Big 5 Safari',
    category: 'safari',
    aspectRatio: '4:3',
    layoutTarget: 'SafariAndSeason, SafariView'
  },
  climbingSeason: {
    id: 'safari_climbing_season',
    url: new URL('./M24.jpeg', import.meta.url).href,
    alt: 'Snow capped Kilimanjaro peak at golden hour',
    caption: 'Best Climbing Months: Jan-Mar & Jul-Oct',
    category: 'safari',
    aspectRatio: '4:3',
    layoutTarget: 'SafariAndSeason, AboutView'
  },
  zanzibarBeach: {
    id: 'safari_zanzibar',
    url: new URL('./M25.jpeg', import.meta.url).href,
    alt: 'Zanzibar turquoise ocean waters and white sand beach',
    caption: 'Zanzibar Island Beach Relaxation Extension',
    category: 'safari',
    aspectRatio: '4:3',
    layoutTarget: 'SafariView'
  }
};
