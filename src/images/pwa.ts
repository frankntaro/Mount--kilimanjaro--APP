import { ImageAsset } from './types';

export const PWA_IMAGES: Record<string, ImageAsset> = {
  logoSvg: {
    id: 'pwa_logo_svg',
    url: new URL('./MM.LOGO.jpeg', import.meta.url).href,
    alt: 'Vamos Kilimanjaro Vector Logo',
    caption: 'Official Vamos Kilimanjaro Expedition Emblem',
    category: 'pwa',
    aspectRatio: '1:1',
    layoutTarget: 'Navbar, PWA Splash, Footer'
  },
  icon512: {
    id: 'pwa_icon_512',
    url: '/images/pwa-icon.svg',
    alt: 'Vamos Kilimanjaro PWA App Icon',
    caption: 'PWA Web App Icon for Homescreen',
    category: 'pwa',
    aspectRatio: '1:1',
    layoutTarget: 'PWA Install Prompt, Manifest'
  },
  offlineMap: {
    id: 'pwa_offline_map',
    url: '/images/offline-placeholder.svg',
    alt: 'Offline Cached Map Banner',
    caption: 'Offline Trail Map Cache Banner for Mountain Trekking',
    category: 'pwa',
    aspectRatio: '16:9',
    layoutTarget: 'Offline Mode Banner, Trail Checklist'
  }
};
