import { ImageAsset } from './types';

export const CONSERVATION_IMAGES: Record<string, ImageAsset> = {
  conservationGroup: {
    id: 'conservation_group',
    url: new URL('./M14.jpeg', import.meta.url).href,
    alt: 'Tanzanian mountain guide crew and porters at camp',
    caption: 'KPAP Certified Ethical Porter Protection Program',
    category: 'conservation',
    aspectRatio: '16:9',
    layoutTarget: 'ImpactStatsBanner, ConservationView'
  },
  teamPorters: {
    id: 'team_porters',
    url: new URL('./M15.jpeg', import.meta.url).href,
    alt: 'Mountain porters carrying expedition equipment safely up Uhuru Peak',
    caption: 'Fair wages, gear, and nutrition guaranteed',
    category: 'conservation',
    aspectRatio: '4:3',
    layoutTarget: 'ConservationView, AboutView'
  }
};
