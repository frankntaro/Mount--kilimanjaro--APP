import { ImageAsset } from './types';

export const ROUTE_IMAGES: Record<string, ImageAsset> = {
  machame: {
    id: 'route_machame',
    url: new URL('./M2.jpeg', import.meta.url).href,
    alt: 'Machame Whiskey Route climbers hiking through rainforest and moorland',
    caption: 'Machame 6-Day Route Trail',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'PopularRoutes, RoutesView, RouteDetailModal'
  },
  lemosho: {
    id: 'route_lemosho',
    url: new URL('./M3.jpeg', import.meta.url).href,
    alt: 'Lemosho Route scenic high ridge sunset',
    caption: 'Lemosho 6-Day Panoramic Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'PopularRoutes, RoutesView, RouteDetailModal'
  },
  shira: {
    id: 'route_shira',
    url: new URL('./M1.jpeg', import.meta.url).href,
    alt: 'Londorossi / Shira Route high volcanic plateau traverse',
    caption: 'Londorossi / Shira 6-Day Caldera Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'PopularRoutes, RoutesView, RouteDetailModal'
  },
  northernCircuit: {
    id: 'route_northern_circuit',
    url: new URL('./M4.jpeg', import.meta.url).href,
    alt: 'Vast northern slopes of Kilimanjaro under blue sky',
    caption: 'Northern Circuit 9-Day 360-Degree Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'PopularRoutes, RoutesView, RouteDetailModal'
  },
  marangu: {
    id: 'route_marangu',
    url: new URL('./M5.jpeg', import.meta.url).href,
    alt: 'Marangu Coca-Cola Route trail and mountain huts',
    caption: 'Marangu 5-Day Hut Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  },
  rongai: {
    id: 'route_rongai',
    url: new URL('./M6.jpeg', import.meta.url).href,
    alt: 'Rongai northern border wilderness trail',
    caption: 'Rongai 6-Day North Slope Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  },
  rongai5: {
    id: 'route_rongai5',
    url: new URL('./M6.jpeg', import.meta.url).href,
    alt: 'Rongai northern border express route',
    caption: 'Rongai 5-Day Direct Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  },
  umbwe: {
    id: 'route_umbwe',
    url: new URL('./M7.jpeg', import.meta.url).href,
    alt: 'Steep rocky ridge on Umbwe route',
    caption: 'Umbwe 5-Day Steep Ascent Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  }
};
