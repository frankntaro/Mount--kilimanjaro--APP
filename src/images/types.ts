export type ImageLayoutCategory =
  | 'hero'
  | 'route'
  | 'safari'
  | 'gallery'
  | 'conservation'
  | 'pwa'
  | 'team'
  | 'blog';

export interface ImageAsset {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  category: ImageLayoutCategory;
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4' | '9:16';
  layoutTarget: string; // e.g. "HeroSection", "RouteCard", "SafariView", "PwaHeader", etc.
  width?: number;
  height?: number;
}
