import { ImageAsset, ImageLayoutCategory } from './types';
import { PWA_IMAGES } from './pwa';
import { HERO_IMAGES } from './heroes';
import { ROUTE_IMAGES } from './routes';
import { SAFARI_IMAGES } from './safaris';
import { CONSERVATION_IMAGES } from './conservation';
import { GALLERY_IMAGES } from './gallery';

export * from './types';
export * from './pwa';
export * from './heroes';
export * from './routes';
export * from './safaris';
export * from './conservation';
export * from './gallery';

/**
 * All Image Assets structured by layout key for easy component consumption
 */
export const IMAGE_ASSETS = {
  pwa: PWA_IMAGES,
  hero: HERO_IMAGES,
  routes: ROUTE_IMAGES,
  safari: SAFARI_IMAGES,
  conservation: CONSERVATION_IMAGES,
  gallery: GALLERY_IMAGES
};

/**
 * Helper to fetch image asset by target layout name or fallback
 */
export function getImageByLayout(target: string): ImageAsset | undefined {
  const all = [
    ...Object.values(PWA_IMAGES),
    ...Object.values(HERO_IMAGES),
    ...Object.values(ROUTE_IMAGES),
    ...Object.values(SAFARI_IMAGES),
    ...Object.values(CONSERVATION_IMAGES),
    ...GALLERY_IMAGES
  ];
  return all.find(item => item.layoutTarget.toLowerCase().includes(target.toLowerCase()));
}

/**
 * Legacy IMAGES object mapping for seamless integration across all app views
 */
function categorizeGalleryItem(caption: string, alt: string): 'Summit' | 'Trek' | 'Camp' | 'Safari' {
  const text = `${caption} ${alt}`.toLowerCase();
  if (text.includes('safari') || text.includes('serengeti') || text.includes('wildlife')) return 'Safari';
  if (text.includes('camp') || text.includes('tent') || text.includes('hut')) return 'Camp';
  if (
    text.includes('summit') ||
    text.includes('uhuru') ||
    text.includes('stella') ||
    text.includes('peak') ||
    text.includes('ice field') ||
    text.includes('ascent')
  ) {
    return 'Summit';
  }
  return 'Trek';
}

const IMAGES_BASE = {
  heroBg: HERO_IMAGES.mainHeroBg.url,
  heroAlt: HERO_IMAGES.heroAltBg.url,

  machame: ROUTE_IMAGES.machame.url,
  lemosho: ROUTE_IMAGES.lemosho.url,
  shira: ROUTE_IMAGES.shira.url,
  northernCircuit: ROUTE_IMAGES.northernCircuit.url,
  marangu: ROUTE_IMAGES.marangu.url,
  rongai: ROUTE_IMAGES.rongai.url,
  rongai5: ROUTE_IMAGES.rongai5.url,
  umbwe: ROUTE_IMAGES.umbwe.url,

  safariElephants: SAFARI_IMAGES.serengetiElephants.url,
  climbingSeason: SAFARI_IMAGES.climbingSeason.url,
  zanzibarBeach: SAFARI_IMAGES.zanzibarBeach.url,

  conservationGroup: CONSERVATION_IMAGES.conservationGroup.url,
  teamPorters: CONSERVATION_IMAGES.teamPorters.url,

  logoSvg: PWA_IMAGES.logoSvg.url,
  pwaIcon: PWA_IMAGES.icon512.url,
  offlinePlaceholder: PWA_IMAGES.offlineMap.url,

  gallery: GALLERY_IMAGES.map((g) => ({
    url: g.url,
    caption: g.caption || g.alt,
    category: categorizeGalleryItem(g.caption || '', g.alt || ''),
  })),
};

/** Immutable defaults used when resetting local image overrides */
export const DEFAULT_IMAGES = {
  ...IMAGES_BASE,
  gallery: IMAGES_BASE.gallery.map((g) => ({ ...g })),
};

/** Mutable runtime image map (may receive local overrides) */
export const IMAGES = {
  ...IMAGES_BASE,
  gallery: IMAGES_BASE.gallery.map((g) => ({ ...g })),
};
