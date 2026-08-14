import { ImageAsset } from './types';

export const GALLERY_IMAGES: ImageAsset[] = [
  {
    id: 'gal_1',
    url: new URL('./M8.jpeg', import.meta.url).href,
    alt: 'Trekkers on Machame Ridge with Kilimanjaro in background',
    caption: 'Trekkers on Machame Ridge with Kilimanjaro in background',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  },
  {
    id: 'gal_2',
    url: new URL('./M9.jpeg', import.meta.url).href,
    alt: 'Sunrise over Uhuru Peak from Stella Point 5756m',
    caption: 'Sunrise over Uhuru Peak from Stella Point 5756m',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  },
  {
    id: 'gal_3',
    url: new URL('./M10.jpeg', import.meta.url).href,
    alt: 'Barranco Camp yellow dome tents in snow',
    caption: 'Barranco Camp yellow dome tents in snow',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  },
  {
    id: 'gal_4',
    url: new URL('./M11.jpeg', import.meta.url).href,
    alt: 'Trekkers making final ascent through snow ice field',
    caption: 'Trekkers making final ascent through snow ice field',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  },
  {
    id: 'gal_5',
    url: new URL('./M12.jpeg', import.meta.url).href,
    alt: 'Serengeti Safari Wildlife Extension after successful climb',
    caption: 'Serengeti Safari Wildlife Extension after successful climb',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  },
  {
    id: 'gal_6',
    url: new URL('./M13.jpeg', import.meta.url).href,
    alt: 'Climber group celebration at Uhuru Peak 5895m',
    caption: 'Climber group celebration at Uhuru Peak 5895m',
    category: 'gallery',
    aspectRatio: '4:3',
    layoutTarget: 'Expedition Photo Gallery'
  }
];
