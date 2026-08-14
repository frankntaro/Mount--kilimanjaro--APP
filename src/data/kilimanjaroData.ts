import { Route, SafariPackage, Testimonial, PackingItem } from '../types';
import { IMAGES } from './images';

export const KILIMANJARO_ROUTES: Route[] = [
  {
    id: 'machame',
    name: 'Machame Route',
    days: 7,
    difficulty: 'Moderate',
    successRate: 95,
    shortDescription: 'Scenic and rewarding route with high summit success.',
    fullDescription: 'Known as the "Whiskey Route", Machame is the most popular trail on Mount Kilimanjaro. It offers a stunning variety of ecosystems from tropical rainforest to alpine desert and glaciers. The 7-day variation includes an extra day at Karanga Camp for optimal "climb high, sleep low" acclimatization.',
    badgeText: 'MOST POPULAR',
    priceUSD: 2350,
    heroImage: IMAGES.machame,
    galleryImages: [IMAGES.machame, IMAGES.climbingSeason, IMAGES.conservationGroup],
    acclimatizationScore: 9,
    sceneryRating: 10,
    crowdLevel: 'High',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry & camping fees',
      'Professional KPAP-certified guides & porters',
      '3 fresh warm meals daily + drinking water',
      'Mountain Hardwear 4-season tents & mess tent',
      'Pulse oximeter daily health checks & emergency oxygen',
      'Private portable toilet tent',
      'Pre & post climb hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 1830, label: 'Machame Gate' },
      { day: 1, elevation: 3050, label: 'Machame Camp' },
      { day: 2, elevation: 3850, label: 'Shira Camp' },
      { day: 3, elevation: 4630, label: 'Lava Tower' },
      { day: 3, elevation: 3960, label: 'Barranco Camp' },
      { day: 4, elevation: 3995, label: 'Karanga Camp' },
      { day: 5, elevation: 4673, label: 'Barafu Camp' },
      { day: 6, elevation: 5895, label: 'Uhuru Peak' },
      { day: 6, elevation: 3100, label: 'Mweka Camp' },
      { day: 7, elevation: 1640, label: 'Mweka Gate' },
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Machame Gate (1,830m) to Machame Camp (3,050m)',
        startElevation: 1830,
        endElevation: 3050,
        distanceKm: 11,
        hikingHours: '5-7 hours',
        habitat: 'Rainforest',
        description: 'Trek through lush tropical rainforest accompanied by Colobus monkeys and exotic bird calls to Machame Camp.',
        highlights: ['Lush jungle canopy', 'Colobus monkey sightings', 'Welcome dinner at camp']
      },
      {
        day: 2,
        title: 'Machame Camp (3,050m) to Shira Camp (3,850m)',
        startElevation: 3050,
        endElevation: 3850,
        distanceKm: 5,
        hikingHours: '4-6 hours',
        habitat: 'Moorland',
        description: 'Ascend steep rocky ridges emerging into giant heather moorland with views of Shira Plateau and Kibo Peak.',
        highlights: ['Shira Cathedral rock', 'Wide panoramic moorland', 'Sunset over Mt. Meru']
      },
      {
        day: 3,
        title: 'Shira Camp (3,850m) via Lava Tower (4,630m) to Barranco Camp (3,960m)',
        startElevation: 3850,
        endElevation: 3960,
        distanceKm: 10,
        hikingHours: '6-8 hours',
        habitat: 'Alpine Desert',
        description: 'Key acclimatization day! Climb high to Lava Tower (4,630m) for lunch, then descend to Barranco Camp under the famous Wall.',
        highlights: ['Climb high, sleep low technique', 'Giant Senecio flora', 'Barranco Wall sunset']
      },
      {
        day: 4,
        title: 'Barranco Camp (3,960m) to Karanga Camp (3,995m)',
        startElevation: 3960,
        endElevation: 3995,
        distanceKm: 5,
        hikingHours: '4-5 hours',
        habitat: 'Alpine Desert',
        description: 'Conquer the fun Barranco Wall scrambles ("Kissing Rock"), leading up to high alpine desert valleys and Karanga Camp.',
        highlights: ['Scrambling Barranco Wall', 'Views of Heim Glacier', 'Acclimatization boost']
      },
      {
        day: 5,
        title: 'Karanga Camp (3,995m) to Barafu Base Camp (4,673m)',
        startElevation: 3995,
        endElevation: 4673,
        distanceKm: 4,
        hikingHours: '3-4 hours',
        habitat: 'Alpine Desert',
        description: 'Short steep hike to Barafu Camp on a windswept ridge. Early dinner and rest before midnight summit attempt.',
        highlights: ['Views of Mawenzi peak', 'Summit briefing & gear check', 'Early night sleep']
      },
      {
        day: 6,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4673,
        endElevation: 5895,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit to Forest',
        description: 'Depart at midnight under starry skies. Pass Rebmann Glacier to Stella Point (5,756m) at sunrise, continuing to Roof of Africa Uhuru Peak (5,895m)!',
        highlights: ['Sunrise over crater rim', 'Standing at 5,895m Uhuru Peak', 'Rebmann & Furtwängler Glaciers']
      },
      {
        day: 7,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m) & Hotel Transfer',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Final descent through misty forest. Collect official green/gold summit certificates at Mweka Gate and celebrate with your guide team!',
        highlights: ['Summit Certificate Ceremony', 'Tipping & Farewell songs with porters', 'Hot shower at hotel']
      }
    ]
  },
  {
    id: 'lemosho',
    name: 'Lemosho Route',
    days: 8,
    difficulty: 'Moderate',
    successRate: 96,
    shortDescription: 'Stunning views and excellent acclimatization profile.',
    fullDescription: 'Widely considered the most beautiful route on Mount Kilimanjaro. Starting on the western slopes near Londorossi Gate, Lemosho offers pristine wilderness, high wildlife sightings in early days, and incredible acclimatization profile leading to a 96%+ summit success rate.',
    badgeText: 'BEST FOR VIEWS',
    priceUSD: 2650,
    heroImage: IMAGES.lemosho,
    galleryImages: [IMAGES.lemosho, IMAGES.climbingSeason, IMAGES.heroBg],
    acclimatizationScore: 10,
    sceneryRating: 10,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry & camping fees',
      'KPAP-certified guides & porters',
      '3 fresh warm meals daily + snacks',
      '4-season expedition tents',
      'Pulse oximeter daily checks & emergency oxygen',
      'Private portable toilet',
      'Hotel transfers Moshi/Arusha'
    ],
    elevationProfile: [
      { day: 1, elevation: 2100, label: 'Londorossi Gate' },
      { day: 1, elevation: 2650, label: 'Mti Mkubwa' },
      { day: 2, elevation: 3610, label: 'Shira 1' },
      { day: 3, elevation: 3850, label: 'Shira 2' },
      { day: 4, elevation: 4630, label: 'Lava Tower' },
      { day: 4, elevation: 3960, label: 'Barranco' },
      { day: 5, elevation: 3995, label: 'Karanga' },
      { day: 6, elevation: 4673, label: 'Barafu' },
      { day: 7, elevation: 5895, label: 'Uhuru Peak' },
      { day: 8, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Londorossi Gate (2,100m) to Mti Mkubwa Big Tree Camp (2,650m)',
        startElevation: 2100,
        endElevation: 2650,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Drive to western gate. Walk through untouched forest trails with frequent sightings of buffalo, colobus monkeys, and exotic flora.',
        highlights: ['Untouched western jungle', 'Pristine trail conditions', 'Big Tree Camp']
      },
      {
        day: 2,
        title: 'Mti Mkubwa (2,650m) to Shira 1 Camp (3,610m)',
        startElevation: 2650,
        endElevation: 3610,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Moorland',
        description: 'Trek out of forest onto the expansive Shira Plateau, crossing old caldera ridges with dramatic mountain vistas.',
        highlights: ['Shira Plateau entry', 'Volcanic lava formations', 'Sunset over Mt. Meru']
      },
      {
        day: 3,
        title: 'Shira 1 Camp (3,610m) to Shira 2 Camp (3,850m)',
        startElevation: 3610,
        endElevation: 3850,
        distanceKm: 7,
        hikingHours: '3-4 hours',
        habitat: 'Moorland',
        description: 'Gentle hike across the plateau. Optional side trip to Shira Cathedral pinnacle for incredible photos.',
        highlights: ['Shira Cathedral scramble', 'Gentle acclimatization', 'Stargazing at night']
      },
      {
        day: 4,
        title: 'Shira 2 (3,850m) via Lava Tower (4,630m) to Barranco (3,960m)',
        startElevation: 3850,
        endElevation: 3960,
        distanceKm: 10,
        hikingHours: '6-8 hours',
        habitat: 'Alpine Desert',
        description: 'Ascend to 4,630m Lava Tower rock stack for lunch before descending into Barranco Valley.',
        highlights: ['High altitude exposure', 'Barranco giant groundsels', 'Camp under Barranco Wall']
      },
      {
        day: 5,
        title: 'Barranco Camp (3,960m) to Karanga Camp (3,995m)',
        startElevation: 3960,
        endElevation: 3995,
        distanceKm: 5,
        hikingHours: '4-5 hours',
        habitat: 'Alpine Desert',
        description: 'Climb the iconic Barranco Wall with your guide leading step-by-step. Traverse glacial valleys to Karanga.',
        highlights: ['Barranco Wall conquest', 'Glacier ice falls views', 'Relaxed afternoon']
      },
      {
        day: 6,
        title: 'Karanga Camp (3,995m) to Barafu Camp (4,673m)',
        startElevation: 3995,
        endElevation: 4673,
        distanceKm: 4,
        hikingHours: '3-4 hours',
        habitat: 'Alpine Desert',
        description: 'Short climb connecting to South Circuit trail. Prepare gear and rest at Barafu for midnight summit start.',
        highlights: ['Mawenzi Peak sunrise views', 'Gear preparation', 'Team motivation circle']
      },
      {
        day: 7,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka (3,100m)',
        startElevation: 4673,
        endElevation: 5895,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent up steep scree slopes. Reach Stella Point for sunrise and push the last hour to Uhuru Peak 5,895m summit!',
        highlights: ['Summit of Africa 5,895m', 'Glacier walls', 'Certificate celebration']
      },
      {
        day: 8,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m)',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Descend through green rainforest to Mweka Gate. Receive summit diploma and hotel transfer.',
        highlights: ['Official Gold Certificate', 'Guide team farewell', 'Victory toast']
      }
    ]
  },
  {
    id: 'northern-circuit',
    name: 'Northern Circuit',
    days: 9,
    difficulty: 'Challenging',
    successRate: 98,
    shortDescription: 'Highest success rate with the best acclimatization.',
    fullDescription: 'The newest and longest route on Kilimanjaro. It circles around the remote northern slopes near the Kenyan border, offering almost 360-degree scenery of the mountain with virtually no crowds until joining the summit push.',
    badgeText: 'BEST SUCCESS RATE',
    priceUSD: 2950,
    heroImage: IMAGES.northernCircuit,
    galleryImages: [IMAGES.northernCircuit, IMAGES.heroBg, IMAGES.lemosho],
    acclimatizationScore: 10,
    sceneryRating: 10,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry & camping fees',
      'KPAP-certified guides & porters',
      '3 fresh warm meals daily + snacks',
      '4-season expedition tents',
      'Pulse oximeter daily checks & emergency oxygen',
      'Private portable toilet',
      'Hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 2100, label: 'Londorossi Gate' },
      { day: 2, elevation: 3610, label: 'Shira 1' },
      { day: 3, elevation: 3850, label: 'Shira 2' },
      { day: 4, elevation: 4020, label: 'Moir Hut' },
      { day: 5, elevation: 3960, label: 'Buffalo Camp' },
      { day: 6, elevation: 3900, label: 'Third Cave' },
      { day: 7, elevation: 4700, label: 'School Hut' },
      { day: 8, elevation: 5895, label: 'Uhuru Peak' },
      { day: 9, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Londorossi Gate to Mti Mkubwa (2,650m)',
        startElevation: 2100,
        endElevation: 2650,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Start trek from Londorossi through forest with monkeys and birds.',
        highlights: ['Quiet forest trail', 'Rich wildlife']
      },
      {
        day: 2,
        title: 'Mti Mkubwa to Shira 1 Camp (3,610m)',
        startElevation: 2650,
        endElevation: 3610,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Moorland',
        description: 'Climb onto Shira plateau with open skyline.',
        highlights: ['Shira plateau', 'Sunset']
      },
      {
        day: 3,
        title: 'Shira 1 to Shira 2 Camp (3,850m)',
        startElevation: 3610,
        endElevation: 3850,
        distanceKm: 7,
        hikingHours: '3-4 hours',
        habitat: 'Moorland',
        description: 'Traverse eastern plateau for easy acclimatization.',
        highlights: ['Shira pinnacle', 'Giant lobelia']
      },
      {
        day: 4,
        title: 'Shira 2 to Moir Hut (4,020m)',
        startElevation: 3850,
        endElevation: 4020,
        distanceKm: 14,
        hikingHours: '5-7 hours',
        habitat: 'Alpine Desert',
        description: 'Turn north into Lent Hills area near Moir Hut.',
        highlights: ['Remote valley', 'Lent hills walk']
      },
      {
        day: 5,
        title: 'Moir Hut to Buffalo Camp (3,960m)',
        startElevation: 4020,
        endElevation: 3960,
        distanceKm: 12,
        hikingHours: '5-7 hours',
        habitat: 'Alpine Desert',
        description: 'Trek along remote northern circuit slopes facing Kenya Tsavo plains.',
        highlights: ['Kenya border views', 'Complete wilderness']
      },
      {
        day: 6,
        title: 'Buffalo Camp to Third Cave (3,900m)',
        startElevation: 3960,
        endElevation: 3900,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Alpine Desert',
        description: 'Hike through high desert valleys to Third Cave.',
        highlights: ['Kibo north face views', 'Quiet camps']
      },
      {
        day: 7,
        title: 'Third Cave to School Hut (4,700m)',
        startElevation: 3900,
        endElevation: 4700,
        distanceKm: 5,
        hikingHours: '4-5 hours',
        habitat: 'Alpine Desert',
        description: 'Ascend to School Hut base camp. Early rest for summit night.',
        highlights: ['High altitude prep', 'Summit briefing']
      },
      {
        day: 8,
        title: 'SUMMIT DAY: School Hut to Uhuru Peak (5,895m) to Mweka (3,100m)',
        startElevation: 4700,
        endElevation: 5895,
        distanceKm: 16,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent via Hans Meyer Cave to Gillman’s Point & Uhuru Peak 5,895m!',
        highlights: ['98% Summit success rate', 'Crater snowfields']
      },
      {
        day: 9,
        title: 'Mweka Camp to Mweka Gate (1,640m)',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Final forest walk, certificate collection, and victory meal.',
        highlights: ['Summit Certificate', 'Farewell celebrations']
      }
    ]
  },
  {
    id: 'marangu',
    name: 'Marangu Route',
    days: 6,
    difficulty: 'Moderate',
    successRate: 88,
    shortDescription: 'Coca-Cola route with hut accommodation.',
    fullDescription: 'The oldest and most established route on Kilimanjaro. It is the only route that provides comfortable A-frame sleeping huts with mattress beds instead of tents. Ideal for climbers who prefer covered shelter.',
    badgeText: 'SHORT & SCENIC',
    priceUSD: 1980,
    heroImage: IMAGES.marangu,
    galleryImages: [IMAGES.marangu, IMAGES.heroBg],
    acclimatizationScore: 7,
    sceneryRating: 8,
    crowdLevel: 'High',
    accommodation: 'Mountain Huts',
    includedItems: [
      'National Park entry & hut fees',
      'KPAP-certified guide team',
      '3 meals daily served in dining huts',
      'Sleeping mattresses in wooden huts',
      'Daily health checks',
      'Hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 1860, label: 'Marangu Gate' },
      { day: 1, elevation: 2700, label: 'Mandara Hut' },
      { day: 2, elevation: 3720, label: 'Horombo Hut' },
      { day: 3, elevation: 4700, label: 'Kibo Hut' },
      { day: 4, elevation: 5895, label: 'Uhuru Peak' },
      { day: 5, elevation: 3720, label: 'Horombo Hut' },
      { day: 6, elevation: 1860, label: 'Marangu Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Marangu Gate (1,860m) to Mandara Hut (2,700m)',
        startElevation: 1860,
        endElevation: 2700,
        distanceKm: 8,
        hikingHours: '4-5 hours',
        habitat: 'Rainforest',
        description: 'Hike through rainforest trails to Mandara Hut. Side trip to Maundi Crater.',
        highlights: ['Maundi Crater view', 'Wooden sleeping huts']
      },
      {
        day: 2,
        title: 'Mandara Hut (2,700m) to Horombo Hut (3,720m)',
        startElevation: 2700,
        endElevation: 3720,
        distanceKm: 12,
        hikingHours: '6-7 hours',
        habitat: 'Moorland',
        description: 'Trek into giant lobelia moorland with views of Mawenzi peak.',
        highlights: ['Mawenzi view', 'Horombo village huts']
      },
      {
        day: 3,
        title: 'Acclimatization Day at Horombo Hut (3,720m)',
        startElevation: 3720,
        endElevation: 3720,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Moorland',
        description: 'Hike to Zebra Rocks (4,100m) for acclimatization before returning to Horombo.',
        highlights: ['Zebra Rocks formation', 'Acclimatization walk']
      },
      {
        day: 4,
        title: 'Horombo Hut (3,720m) to Kibo Hut (4,703m)',
        startElevation: 3720,
        endElevation: 4703,
        distanceKm: 10,
        hikingHours: '6-7 hours',
        habitat: 'Alpine Desert',
        description: 'Cross the barren Saddle plateau between Kibo and Mawenzi to Kibo stone hut.',
        highlights: ['The Saddle desert', 'Stone hut base camp']
      },
      {
        day: 5,
        title: 'SUMMIT DAY: Kibo Hut to Uhuru Peak (5,895m) to Horombo (3,720m)',
        startElevation: 4703,
        endElevation: 5895,
        distanceKm: 16,
        hikingHours: '11-14 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight push to Gillman’s Point (5,685m) and Uhuru Peak summit!',
        highlights: ['Uhuru Peak summit', 'Return to Horombo Hut']
      },
      {
        day: 6,
        title: 'Horombo Hut to Marangu Gate (1,860m)',
        startElevation: 3720,
        endElevation: 1860,
        distanceKm: 20,
        hikingHours: '5-6 hours',
        habitat: 'Rainforest',
        description: 'Descend to Marangu Gate, collect certificates and hotel transfer.',
        highlights: ['Official certificate', 'Celebration']
      }
    ]
  }
];

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'serengeti-ngorongoro',
    name: '4-Day Serengeti & Ngorongoro Crater Safari',
    days: 4,
    parks: ['Serengeti National Park', 'Ngorongoro Crater', 'Tarangire National Park'],
    description: 'Experience the ultimate African wildlife safari following your Kilimanjaro climb. Witness the Big Five, vast lion prides, and the Great Wildebeest Migration.',
    priceUSD: 1450,
    image: IMAGES.safariElephants,
    highlights: ['Ngorongoro Crater rim view', 'Big Five wildlife spotting', '4x4 Land Cruiser with pop-up roof', 'Luxury lodge/tent accommodation'],
    bestSeason: 'Year-Round (Migration Jul-Oct & Jan-Mar)'
  },
  {
    id: 'tarangire-manyara',
    name: '2-Day Tarangire & Lake Manyara Express Safari',
    days: 2,
    parks: ['Tarangire National Park', 'Lake Manyara'],
    description: 'Perfect short safari extension. See giant baobab trees, massive elephant herds, flamingos, and famous tree-climbing lions.',
    priceUSD: 680,
    image: IMAGES.safariElephants,
    highlights: ['Huge elephant herds in Tarangire', 'Tree-climbing lions of Manyara', 'Pink flamingo flocks', 'Picnic lunch in wild bush'],
    bestSeason: 'Year-Round'
  },
  {
    id: 'zanzibar-beach',
    name: '4-Day Zanzibar Tropical Beach Relaxation',
    days: 4,
    parks: ['Stone Town UNESCO', 'Nungwi & Kendwa Beaches', 'Prison Island'],
    description: 'Relax your legs after 5,895m altitude on white sand beaches, turquoise Indian Ocean waters, and historic spice tours of Zanzibar.',
    priceUSD: 890,
    image: IMAGES.zanzibarBeach,
    highlights: ['White sandy beaches', 'Sunset dhow boat cruise', 'Stone Town historic walk', 'Fresh seafood banquets'],
    bestSeason: 'Year-Round'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah J.',
    country: 'USA',
    route: 'Machame 7-Day',
    quote: 'An unforgettable experience! The guides were incredible, the support was outstanding, and reaching the summit at sunrise was a dream come true. Vamos Kilimanjaro handled every single detail flawlessly.',
    rating: 5,
    avatar: new URL('../images/M16.jpeg', import.meta.url).href,
    date: 'July 2026',
    verifiedSummit: true
  },
  {
    id: '2',
    author: 'Markus & Elena V.',
    country: 'Germany',
    route: 'Lemosho 8-Day',
    quote: 'Choosing the 8-day Lemosho route with Vamos was the best decision we made. The food was hot and delicious every night, our oxygen levels were checked daily, and our guide Emanuel was a true hero.',
    rating: 5,
    avatar: new URL('../images/M17.jpeg', import.meta.url).href,
    date: 'June 2026',
    verifiedSummit: true
  },
  {
    id: '3',
    author: 'David K.',
    country: 'United Kingdom',
    route: 'Northern Circuit 9-Day',
    quote: 'We had 100% summit success in our group of 8! The porters sang songs every morning, kept our tents spotless, and carried our bags with a smile. KPAP certification matters, and Vamos lives up to it!',
    rating: 5,
    avatar: new URL('../images/M18.jpeg', import.meta.url).href,
    date: 'May 2026',
    verifiedSummit: true
  }
];

export const PACKING_ITEMS: PackingItem[] = [
  { id: '1', name: 'Waterproof Gore-Tex Jacket & Pants', category: 'Clothing', required: true, description: 'Breathable waterproof hard-shell outer layer for rain, snow, and summit wind.' },
  { id: '2', name: 'Insulated Down Jacket (-15°C rating)', category: 'Clothing', required: true, description: 'Heavy down parka for freezing summit night conditions.' },
  { id: '3', name: 'Broken-in Waterproof Hiking Boots', category: 'Footwear', required: true, description: 'Ankle-support trekking boots broken in at least 1 month prior to climb.' },
  { id: '4', name: 'Thermal Base Layers (Merino Wool x2)', category: 'Clothing', required: true, description: 'Top and bottom moisture-wicking thermal undergarments.' },
  { id: '5', name: '-15°C / 0°F Sleeping Bag', category: 'Technical Gear', required: true, description: 'Expedition sleeping bag. Available for rental if needed.' },
  { id: '6', name: 'Trekking Poles (Pair)', category: 'Technical Gear', required: true, description: 'Adjustable shock-absorbing poles for steep descent knee protection.' },
  { id: '7', name: 'Headlamp with Extra Batteries', category: 'Technical Gear', required: true, description: 'Bright LED headlamp essential for midnight summit push.' },
  { id: '8', name: '30-40L Daypack with Rain Cover', category: 'Technical Gear', required: true, description: 'Backpack carried by you for water, extra layers, camera, and snacks.' },
  { id: '9', name: 'SPF 50+ Sunscreen & Polarized Sunglasses', category: 'Medical & Hygiene', required: true, description: 'High altitude UV protection is extreme near equator snowfields.' },
  { id: '10', name: 'Personal First Aid & Diamox (Altitude)', category: 'Medical & Hygiene', required: false, description: 'Acetazolamide for acclimatization support after doctor consultation.' }
];

export const KILIMANJARO_STATS = [
  { icon: '5895m', number: '5,895m', label: 'Above Sea Level' },
  { icon: '4-9 Days', number: '4–9 Days', label: 'Typical Climb' },
  { icon: '7 Routes', number: '7 Main Routes', label: 'To The Summit' },
  { icon: 'All Year', number: 'All Year Round', label: 'Climbing Season' },
  { icon: '98%', number: '98% Success Rate', label: 'With Proper Prep' }
];
