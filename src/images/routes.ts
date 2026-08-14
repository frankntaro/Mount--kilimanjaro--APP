import { ImageAsset } from './types';

export const ROUTE_IMAGES: Record<string, ImageAsset> = {
  machame: {
    id: 'route_machame',
    url: new URL('./M2.jpeg', import.meta.url).href,
    alt: 'Machame Whiskey Route climbers hiking through rainforest and moorland',
    caption: 'Machame 7-Day Route Trail',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'PopularRoutes, RoutesView, RouteDetailModal'
  },
  lemosho: {
    id: 'route_lemosho',
    url: new URL('./M3.jpeg', import.meta.url).href,
    alt: 'Lemosho Route scenic high ridge sunset',
    caption: 'Lemosho 8-Day Panoramic Route',
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
    caption: 'Marangu 6-Day Hut Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  },
  rongai: {
    id: 'route_rongai',
    url: new URL('./M6.jpeg', import.meta.url).href,
    alt: 'Rongai northern border wilderness trail',
    caption: 'Rongai 7-Day North Slope Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  },
  umbwe: {
    id: 'route_umbwe',
    url: new URL('./M7.jpeg', import.meta.url).href,
    alt: 'Steep rocky ridge on Umbwe route',
    caption: 'Umbwe 6-Day Extreme Ascent Route',
    category: 'route',
    aspectRatio: '4:3',
    layoutTarget: 'RoutesView, RouteDetailModal'
  }
};
