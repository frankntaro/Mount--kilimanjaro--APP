# Local Image Import & Management Guide

This directory contains the image asset architecture for **Vamos Kilimanjaro PWA**.

You can use your own custom images from your computer in two easy ways:

---

## Method 1: Uploading Images to the Project Directory (Code / File Explorer)

You can place any image files (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`) directly into the project's `/public/images/` directory using the file explorer:

1. **Upload your image file** into `/public/images/` (e.g. `my-kilimanjaro-hero.jpg`).
2. **Reference your file** anywhere in the code or inside `/src/images/index.ts` or `/src/images/heroes.ts`:

```typescript
export const HERO_IMAGES = {
  mainHeroBg: {
    id: 'hero_main_bg',
    url: '/images/my-kilimanjaro-hero.jpg', // <--- Your custom local file!
    alt: 'My Custom Expedition Photo',
    category: 'hero',
    layoutTarget: 'HeroSection'
  }
};
```

---

## Method 2: Live In-App Image Uploader (Directly in Browser)

Click the **"Upload Computer Images"** button in the header navbar or floating tool menu:

1. Click **"Upload Computer Images"**.
2. Pick any image file from your PC or Mac for any layout section (Hero, Machame Route, Safari, Logo).
3. The application instantly updates the UI with your local photo and saves it locally in your browser!
