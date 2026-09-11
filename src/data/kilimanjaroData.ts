import { Route, SafariPackage, Testimonial, PackingItem } from '../types';
import { IMAGES } from './images';

export const KILIMANJARO_ROUTES: Route[] = [
  {
    id: 'machame',
    name: 'Machame Route',
    days: 6,
    difficulty: 'Moderate',
    successRate: 92,
    shortDescription: 'Scenic and rewarding 6-day route with high summit success.',
    fullDescription: 'Known as the "Whiskey Route", Machame is the most celebrated trail on Mount Kilimanjaro. It offers a stunning progression through lush rainforest, giant heather moorlands, and high alpine desert. The 6-day itinerary combines Barranco and Karanga to push directly to Barafu Base Camp before the midnight summit ascent to Uhuru Peak (5,895m).',
    badgeText: 'MOST POPULAR',
    priceUSD: 2150,
    heroImage: IMAGES.machame,
    galleryImages: [IMAGES.machame, IMAGES.climbingSeason, IMAGES.conservationGroup],
    acclimatizationScore: 8,
    sceneryRating: 10,
    crowdLevel: 'High',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry, rescue & camping fees',
      'Professional mountain guides & porters',
      '3 fresh warm meals daily + boiled drinking water',
      'Mountain Hardwear 4-season tents & mess tent',
      'Pulse oximeter daily health checks & emergency oxygen',
      'Pre & post climb hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 1640, label: 'Machame Gate' },
      { day: 1, elevation: 2835, label: 'Machame Camp' },
      { day: 2, elevation: 3750, label: 'Shira Camp' },
      { day: 3, elevation: 4600, label: 'Lava Tower' },
      { day: 3, elevation: 3900, label: 'Barranco Camp' },
      { day: 4, elevation: 3960, label: 'Karanga Camp' },
      { day: 4, elevation: 4673, label: 'Barafu Camp' },
      { day: 5, elevation: 5895, label: 'Uhuru Peak' },
      { day: 5, elevation: 3100, label: 'Mweka Camp' },
      { day: 6, elevation: 1640, label: 'Mweka Gate' },
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Machame Gate (1,640m) to Machame Camp (2,835m)',
        startElevation: 1640,
        endElevation: 2835,
        distanceKm: 11,
        hikingHours: '5-7 hours',
        habitat: 'Rainforest',
        description: 'Trek through lush montane rainforest teeming with Colobus monkeys, exotic birds, and ancient mossy trees to reach Machame Camp (2,835m).',
        highlights: ['Lush jungle canopy', 'Colobus monkey sightings', 'Welcome dinner at camp']
      },
      {
        day: 2,
        title: 'Machame Camp (2,835m) to Shira Camp (3,750m)',
        startElevation: 2835,
        endElevation: 3750,
        distanceKm: 5,
        hikingHours: '4-6 hours',
        habitat: 'Moorland',
        description: 'Ascend steep rocky ridges emerging into giant heather moorland with panoramic vistas of Shira Plateau and Kibo Peak.',
        highlights: ['Shira volcanic plateau views', 'Wide moorland ridges', 'Sunset over Mt. Meru']
      },
      {
        day: 3,
        title: 'Shira Camp (3,750m) via Lava Tower (4,600m) to Barranco Camp (3,900m)',
        startElevation: 3750,
        endElevation: 3900,
        distanceKm: 10,
        hikingHours: '6-8 hours',
        habitat: 'Alpine Desert',
        description: 'Crucial acclimatization day! Climb up to the volcanic Lava Tower (4,600m) for high-altitude acclimatization lunch, then descend to Barranco Camp (3,900m).',
        highlights: ['Climb high, sleep low technique', 'Lava Tower 4,600m lunch', 'Giant Senecio valley']
      },
      {
        day: 4,
        title: 'Barranco Camp (3,900m) via Karanga (3,960m) to Barafu Base Camp (4,673m)',
        startElevation: 3900,
        endElevation: 4673,
        distanceKm: 9,
        hikingHours: '7-9 hours',
        habitat: 'Alpine Desert',
        description: 'Conquer the famous Barranco Wall ("Kissing Rock"), cross Karanga Valley (3,960m), and ascend the alpine ridge to Barafu Base Camp (4,673m). Early dinner and rest for summit night.',
        highlights: ['Scrambling Barranco Wall', 'Karanga Valley traverse', 'Barafu base camp sunset']
      },
      {
        day: 5,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4673,
        endElevation: 3100,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit to Forest',
        description: 'Midnight summit push past Rebmann Glacier to Stella Point (5,756m) at dawn, crowning your achievement at Uhuru Peak (5,895m) before descending to Mweka Camp (3,100m).',
        highlights: ['Sunrise over crater rim', 'Standing at 5,895m Uhuru Peak summit', 'Rebmann & Furtwängler Glaciers']
      },
      {
        day: 6,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m) & Celebration',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Final descent through lush rainforest to Mweka Gate (1,640m). Receive official gold summit certificates, farewell celebration with the crew, and hotel transfer.',
        highlights: ['Official Summit Certificate', 'Tipping & Farewell songs with porters', 'Hot shower & celebration']
      }
    ]
  },
  {
    id: 'lemosho',
    name: 'Lemosho Route',
    days: 6,
    difficulty: 'Moderate',
    successRate: 94,
    shortDescription: 'Scenic 6-day western trail with stunning vistas and alpine ridges.',
    fullDescription: 'Lemosho is widely regarded as one of the most scenic approaches on Mount Kilimanjaro. Beginning at Londorossi Gate (2,360m) on the western slopes, it traverses untouched rainforest and climbs onto the dramatic Shira Plateau before joining the southern circuit across Lava Tower (4,600m), Barranco (3,900m), and Barafu (4,673m) to the summit.',
    badgeText: 'BEST FOR VIEWS',
    priceUSD: 2350,
    heroImage: IMAGES.lemosho,
    galleryImages: [IMAGES.lemosho, IMAGES.climbingSeason, IMAGES.heroBg],
    acclimatizationScore: 9,
    sceneryRating: 10,
    crowdLevel: 'Medium',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry, rescue & camping fees',
      'Professional mountain guides & porters',
      '3 fresh warm meals daily + trail snacks',
      '4-season expedition tents & private mess tent',
      'Pulse oximeter daily checks & emergency oxygen',
      'Hotel transfers Moshi / Arusha'
    ],
    elevationProfile: [
      { day: 1, elevation: 2360, label: 'Londorossi Gate' },
      { day: 1, elevation: 2650, label: 'Forest Camp' },
      { day: 2, elevation: 3610, label: 'Shira 1' },
      { day: 2, elevation: 3850, label: 'Shira 2' },
      { day: 3, elevation: 4600, label: 'Lava Tower' },
      { day: 3, elevation: 3900, label: 'Barranco Camp' },
      { day: 4, elevation: 3960, label: 'Karanga Camp' },
      { day: 4, elevation: 4673, label: 'Barafu Camp' },
      { day: 5, elevation: 5895, label: 'Uhuru Peak' },
      { day: 5, elevation: 3100, label: 'Mweka Camp' },
      { day: 6, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Londorossi Gate (2,360m) to Forest Camp / Mti Mkubwa (2,650m)',
        startElevation: 2360,
        endElevation: 2650,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Drive from Moshi to Londorossi Gate (2,360m) for registration, then trek through tranquil western rainforest to Forest Camp (2,650m).',
        highlights: ['Pristine western jungle', 'Wildlife & Colobus monkeys', 'Forest Camp']
      },
      {
        day: 2,
        title: 'Forest Camp (2,650m) via Shira 1 (3,610m) to Shira 2 Camp (3,850m)',
        startElevation: 2650,
        endElevation: 3850,
        distanceKm: 13,
        hikingHours: '7-8 hours',
        habitat: 'Moorland',
        description: 'Ascend out of the forest onto the vast volcanic Shira Plateau, crossing past Shira 1 (3,610m) to establish camp at Shira 2 (3,850m).',
        highlights: ['Shira Caldera entrance', 'Views of Kibo Peak', 'Sunset over Mt. Meru']
      },
      {
        day: 3,
        title: 'Shira 2 Camp (3,850m) via Lava Tower (4,600m) to Barranco Camp (3,900m)',
        startElevation: 3850,
        endElevation: 3900,
        distanceKm: 10,
        hikingHours: '6-8 hours',
        habitat: 'Alpine Desert',
        description: 'Trek east across the high desert up to Lava Tower (4,600m) for acclimatization before dropping down into scenic Barranco Valley (3,900m).',
        highlights: ['Lava Tower 4,600m acclimatization', 'Giant Dendrosenecio forest', 'Under Barranco Wall']
      },
      {
        day: 4,
        title: 'Barranco Camp (3,900m) via Karanga (3,960m) to Barafu Base Camp (4,673m)',
        startElevation: 3900,
        endElevation: 4673,
        distanceKm: 9,
        hikingHours: '7-9 hours',
        habitat: 'Alpine Desert',
        description: 'Scramble up the majestic Barranco Wall, traverse across Karanga Valley (3,960m), and climb to Barafu Camp (4,673m). Prepare gear for the midnight summit bid.',
        highlights: ['Barranco Wall conquest', 'Southern Glaciers panorama', 'Barafu summit staging']
      },
      {
        day: 5,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4673,
        endElevation: 3100,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent up steep volcanic scree slopes to Stella Point at dawn. Push along the crater rim to Uhuru Peak (5,895m) before descending to Mweka Camp (3,100m).',
        highlights: ['Uhuru Peak summit 5,895m', 'Glacial ice fields', 'Dawn over Africa']
      },
      {
        day: 6,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m) & Departure',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Descend through dense lush rainforest to Mweka Gate (1,640m). Receive your official Kilimanjaro National Park summit certificate.',
        highlights: ['Summit Diploma', 'Guide & porter farewell songs', 'Return hotel transfer']
      }
    ]
  },
  {
    id: 'shira',
    name: 'Londorossi / Shira Route',
    days: 6,
    difficulty: 'Challenging',
    successRate: 90,
    shortDescription: 'High-altitude 6-day caldera traverse starting at Londorossi Gate & Morum Barrier.',
    fullDescription: 'The Londorossi / Shira Route enters Kilimanjaro from the west at Londorossi Gate (2,360m), driving through the rainforest to Morum Barrier Gate to start trekking high on the dramatic Shira Plateau. Passing Simba Camp (3,630m), Shira 2 (3,850m), Lava Tower (4,600m), and Barranco (3,900m), this route delivers expansive wilderness vistas and unmatched high-altitude plateau trekking.',
    badgeText: 'CALDERA EXPEDITION',
    priceUSD: 2250,
    heroImage: IMAGES.shira,
    galleryImages: [IMAGES.shira, IMAGES.heroBg, IMAGES.machame],
    acclimatizationScore: 8,
    sceneryRating: 10,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park fees, rescue & camping fees',
      'Professional mountain guides & crew',
      '3 fresh hot meals daily + mountain snacks',
      'Mountain Hardwear expedition tents',
      'Daily medical checkups with pulse oximeter & oxygen',
      '4x4 vehicle transfers to Morum Barrier / Londorossi'
    ],
    elevationProfile: [
      { day: 1, elevation: 2360, label: 'Londorossi Gate' },
      { day: 1, elevation: 3630, label: 'Simba Camp' },
      { day: 2, elevation: 3850, label: 'Shira 2' },
      { day: 3, elevation: 4600, label: 'Lava Tower' },
      { day: 3, elevation: 3900, label: 'Barranco Camp' },
      { day: 4, elevation: 3960, label: 'Karanga Camp' },
      { day: 4, elevation: 4673, label: 'Barafu Camp' },
      { day: 5, elevation: 5895, label: 'Uhuru Peak' },
      { day: 5, elevation: 3100, label: 'Mweka Camp' },
      { day: 6, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Londorossi Gate (2,360m) / Morum Barrier to Simba Camp (3,630m)',
        startElevation: 2360,
        endElevation: 3630,
        distanceKm: 4,
        hikingHours: '2-3 hours',
        habitat: 'Moorland',
        description: 'Drive via Londorossi Gate (2,360m) to Morum Barrier Gate on the Shira Plateau. Start trekking across heather moorland to Simba Camp (3,630m).',
        highlights: ['4x4 scenic drive to high plateau', 'Open moorland wilderness', 'Simba Camp sunset']
      },
      {
        day: 2,
        title: 'Simba Camp (3,630m) to Shira 2 Camp (3,850m)',
        startElevation: 3630,
        endElevation: 3850,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Moorland / Alpine',
        description: 'Gentle hike across the expansive caldera with optional exploration towards Shira Cathedral rock pinnacles, camping at Shira 2 (3,850m).',
        highlights: ['Shira Cathedral pinnacle', 'Kibo Western Breach views', 'Acclimatization walk']
      },
      {
        day: 3,
        title: 'Shira 2 Camp (3,850m) via Lava Tower (4,600m) to Barranco Camp (3,900m)',
        startElevation: 3850,
        endElevation: 3900,
        distanceKm: 10,
        hikingHours: '6-8 hours',
        habitat: 'Alpine Desert',
        description: 'Climb east towards Kibo, reaching Lava Tower (4,600m) for acclimatization lunch before descending into Barranco Valley (3,900m).',
        highlights: ['Lava Tower 4,600m exposure', 'Barranco Valley waterfalls', 'Camp beneath Barranco Wall']
      },
      {
        day: 4,
        title: 'Barranco Camp (3,900m) via Karanga (3,960m) to Barafu Base Camp (4,673m)',
        startElevation: 3900,
        endElevation: 4673,
        distanceKm: 9,
        hikingHours: '7-9 hours',
        habitat: 'Alpine Desert',
        description: 'Scale the thrilling Barranco Wall, cross Karanga Valley (3,960m), and make the final climb up the alpine ridge to Barafu Base Camp (4,673m).',
        highlights: ['Barranco Wall scramble', 'Heim Glacier views', 'High alpine ridge camp']
      },
      {
        day: 5,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4673,
        endElevation: 3100,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight summit assault via Stella Point to Uhuru Peak (5,895m) at sunrise. Celebrate at the Roof of Africa and descend to Mweka Camp (3,100m).',
        highlights: ['Roof of Africa 5,895m', 'Sunrise over the clouds', 'Summit photo triumph']
      },
      {
        day: 6,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m)',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Trek down through the lush lower rainforest canopy to Mweka Gate (1,640m) for certificate presentation and hotel return.',
        highlights: ['Certificate Ceremony', 'Porters celebration dance', 'Hotel return transfer']
      }
    ]
  },
  {
    id: 'rongai',
    name: 'Rongai Route (6-Day)',
    days: 6,
    difficulty: 'Moderate',
    successRate: 93,
    shortDescription: 'Peaceful 6-day northern trail along the Kenyan border with Mawenzi Tarn views.',
    fullDescription: 'The Rongai Route is the only trail that approaches Mount Kilimanjaro from the north, near the Kenyan border. Experiencing lower rainfall and true wilderness solitude, the 6-day itinerary features stunning camps beneath the jagged spires of Mawenzi Tarn (4,315m), crosses the barren lunar Saddle to School Hut (4,800m), and summits via Gillmans Point (5,685m) to Uhuru Peak (5,895m).',
    badgeText: 'NORTHERN WILDERNESS',
    priceUSD: 2250,
    heroImage: IMAGES.rongai,
    galleryImages: [IMAGES.rongai, IMAGES.heroBg, IMAGES.climbingSeason],
    acclimatizationScore: 9,
    sceneryRating: 9,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry & camping fees',
      'Professional mountain guides & porter crew',
      '3 hot nutritious meals daily + drinking water',
      '4-season expedition tents & dining tent',
      'Daily health monitoring with pulse oximeter & oxygen',
      'Transfers to Rongai Gate and from Marangu Gate'
    ],
    elevationProfile: [
      { day: 1, elevation: 1950, label: 'Rongai Gate' },
      { day: 1, elevation: 3450, label: 'Remote Cave' },
      { day: 2, elevation: 3600, label: 'Kikelewa Cave' },
      { day: 3, elevation: 4315, label: 'Mawenzi Tarn' },
      { day: 4, elevation: 4800, label: 'School Hut' },
      { day: 5, elevation: 5685, label: 'Gillmans Point' },
      { day: 5, elevation: 5895, label: 'Uhuru Peak' },
      { day: 5, elevation: 3720, label: 'Horombo Hut' },
      { day: 6, elevation: 1870, label: 'Marangu Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Rongai Gate (1,950m) to Remote Cave / Simba Camp (3,450m)',
        startElevation: 1950,
        endElevation: 3450,
        distanceKm: 7,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest & Moorland',
        description: 'Drive to Rongai Gate (1,950m) near the Kenyan border. Trek through pine plantations and montane forest to First Remote Cave / Simba Camp (3,450m).',
        highlights: ['Quiet northern approach', 'Kenyan plains vistas', 'Simba Camp']
      },
      {
        day: 2,
        title: 'Remote Cave (3,450m) via 2nd Cave (3,800m) to Kikelewa Cave (3,600m)',
        startElevation: 3450,
        endElevation: 3600,
        distanceKm: 9,
        hikingHours: '5-6 hours',
        habitat: 'Moorland',
        description: 'Steady ascent past Second Remote Cave (3,800m) with sweeping views of the northern plains, turning east towards Kikelewa Cave (3,600m).',
        highlights: ['Moorland ridges', 'View of Mawenzi spires', 'Kikelewa Cave camp']
      },
      {
        day: 3,
        title: 'Kikelewa Cave (3,600m) to Mawenzi Tarn Camp (4,315m)',
        startElevation: 3600,
        endElevation: 4315,
        distanceKm: 5,
        hikingHours: '3-4 hours',
        habitat: 'Alpine Desert',
        description: 'Short, steep climb out of the moorland onto the rocky slopes beneath the dramatic volcanic spires of Mawenzi, establishing camp beside Mawenzi Tarn (4,315m).',
        highlights: ['Mawenzi Tarn glacial lake', 'Dramatic rock pinnacles', 'Acclimatization rest']
      },
      {
        day: 4,
        title: 'Mawenzi Tarn (4,315m) across The Saddle to School Hut (4,800m)',
        startElevation: 4315,
        endElevation: 4800,
        distanceKm: 9,
        hikingHours: '4-5 hours',
        habitat: 'Alpine Desert',
        description: 'Cross the lunar alpine desert of The Saddle between Mawenzi and Kibo. Arrive at School Hut (4,800m) for early dinner and summit briefing.',
        highlights: ['The Saddle desert traverse', 'School Hut base camp', 'Early summit rest']
      },
      {
        day: 5,
        title: 'SUMMIT DAY: School Hut (4,800m) to Gillmans Point (5,685m) to Uhuru Peak (5,895m) to Horombo Hut (3,720m)',
        startElevation: 4800,
        endElevation: 3720,
        distanceKm: 16,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit to Moorland',
        description: 'Midnight climb up loose scree to Gillmans Point (5,685m) on the crater rim at sunrise. Continue along the snowy rim to Uhuru Peak (5,895m) before descending to Horombo Hut (3,720m).',
        highlights: ['Gillmans Point sunrise', 'Uhuru Peak summit 5,895m', 'Descent to Horombo Hut']
      },
      {
        day: 6,
        title: 'Horombo Hut (3,720m) via Mandara (2,700m) to Marangu Gate (1,870m)',
        startElevation: 3720,
        endElevation: 1870,
        distanceKm: 20,
        hikingHours: '5-7 hours',
        habitat: 'Rainforest',
        description: 'Descend through giant heather and lush rainforest past Mandara Hut (2,700m) to Marangu Gate (1,870m) to receive official summit certificates.',
        highlights: ['Summit Certificate Ceremony', 'Lush Mandara forest', 'Return hotel celebration']
      }
    ]
  },
  {
    id: 'rongai-5',
    name: 'Rongai Route (5-Day Express)',
    days: 5,
    difficulty: 'Challenging',
    successRate: 87,
    shortDescription: 'Fast-paced 5-day northern border approach directly to School Hut and Uhuru Peak.',
    fullDescription: 'A direct 5-day variation of the northern Rongai Route designed for fit climbers. Starting at Rongai Gate (1,950m), it ascends via Remote Caves (3,450m & 3,800m) and Kikelewa (3,600m) straight across the Saddle to School Hut (4,800m) for the summit assault via Gillmans Point (5,685m) to Uhuru Peak (5,895m).',
    badgeText: 'NORTHERN EXPRESS',
    priceUSD: 1980,
    heroImage: IMAGES.rongai5 || IMAGES.rongai,
    galleryImages: [IMAGES.rongai, IMAGES.heroBg],
    acclimatizationScore: 7,
    sceneryRating: 9,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry & camping fees',
      'Professional mountain guides & porter crew',
      '3 fresh warm meals daily + drinking water',
      '4-season tents & mess tent',
      'Pulse oximeter daily checks & emergency oxygen',
      'Hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 1950, label: 'Rongai Gate' },
      { day: 1, elevation: 3450, label: 'Remote Cave' },
      { day: 2, elevation: 3600, label: 'Kikelewa Cave' },
      { day: 3, elevation: 4800, label: 'School Hut' },
      { day: 4, elevation: 5685, label: 'Gillmans Point' },
      { day: 4, elevation: 5895, label: 'Uhuru Peak' },
      { day: 4, elevation: 3720, label: 'Horombo Hut' },
      { day: 5, elevation: 1870, label: 'Marangu Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Rongai Gate (1,950m) to Remote Cave Camp (3,450m)',
        startElevation: 1950,
        endElevation: 3450,
        distanceKm: 7,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest & Moorland',
        description: 'Trek from Rongai Gate (1,950m) through forest and moorland to First Remote Cave (3,450m).',
        highlights: ['Quiet northern trails', 'Kenyan border wilderness', 'First Cave camp']
      },
      {
        day: 2,
        title: 'Remote Cave (3,450m) via 2nd Cave (3,800m) to Kikelewa Cave (3,600m)',
        startElevation: 3450,
        endElevation: 3600,
        distanceKm: 9,
        hikingHours: '5-6 hours',
        habitat: 'Moorland',
        description: 'Climb past Second Cave (3,800m) enjoying wide open views of Mawenzi and camp at Kikelewa Cave (3,600m).',
        highlights: ['Moorland panoramas', 'Mawenzi views', 'Kikelewa valley']
      },
      {
        day: 3,
        title: 'Kikelewa Cave (3,600m) across The Saddle to School Hut (4,800m)',
        startElevation: 3600,
        endElevation: 4800,
        distanceKm: 10,
        hikingHours: '6-7 hours',
        habitat: 'Alpine Desert',
        description: 'Ascend out of Kikelewa across the expansive Saddle alpine desert to School Hut (4,800m) base camp. Rest early for summit night.',
        highlights: ['The Saddle alpine crossing', 'School Hut staging', 'Summit night prep']
      },
      {
        day: 4,
        title: 'SUMMIT DAY: School Hut (4,800m) via Gillmans Point (5,685m) to Uhuru Peak (5,895m) to Horombo Hut (3,720m)',
        startElevation: 4800,
        endElevation: 3720,
        distanceKm: 16,
        hikingHours: '11-14 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent to Gillmans Point (5,685m) on the crater rim at dawn, pushing to Uhuru Peak (5,895m) before descending to Horombo Hut (3,720m).',
        highlights: ['Gillmans Point sunrise', 'Uhuru Peak summit 5,895m', 'Horombo Hut rest']
      },
      {
        day: 5,
        title: 'Horombo Hut (3,720m) to Marangu Gate (1,870m)',
        startElevation: 3720,
        endElevation: 1870,
        distanceKm: 20,
        hikingHours: '5-6 hours',
        habitat: 'Rainforest',
        description: 'Descend through moorland and rainforest past Mandara Hut (2,700m) to Marangu Gate (1,870m) to receive official summit certificates.',
        highlights: ['Summit Certificates', 'Final celebration with guides', 'Hotel transfer']
      }
    ]
  },
  {
    id: 'marangu',
    name: 'Marangu Route',
    days: 5,
    difficulty: 'Moderate',
    successRate: 85,
    shortDescription: 'Classic 5-day Coca-Cola route with comfortable wooden sleeping huts.',
    fullDescription: 'The Marangu Route is the classic trail on Kilimanjaro and the only route offering comfortable A-frame sleeping huts with mattress beds. Starting at Marangu Gate (1,870m), the 5-day itinerary climbs via Mandara Hut (2,700m) and Horombo Hut (3,720m) across the high alpine Saddle to Kibo Hut (4,703m) for the summit assault to Gillmans Point (5,685m) and Uhuru Peak (5,895m).',
    badgeText: 'CLASSIC HUT ROUTE',
    priceUSD: 1750,
    heroImage: IMAGES.marangu,
    galleryImages: [IMAGES.marangu, IMAGES.heroBg],
    acclimatizationScore: 7,
    sceneryRating: 8,
    crowdLevel: 'High',
    accommodation: 'Mountain Huts',
    includedItems: [
      'National Park entry, rescue & hut accommodation fees',
      'Professional mountain guides & porter team',
      '3 fresh meals daily served in dining huts',
      'Mattress beds in wooden A-frame huts',
      'Daily medical checkups with pulse oximeter',
      'Hotel transfers Moshi / Arusha'
    ],
    elevationProfile: [
      { day: 1, elevation: 1870, label: 'Marangu Gate' },
      { day: 1, elevation: 2700, label: 'Mandara Hut' },
      { day: 2, elevation: 3720, label: 'Horombo Hut' },
      { day: 3, elevation: 4703, label: 'Kibo Hut' },
      { day: 4, elevation: 5685, label: 'Gillmans Point' },
      { day: 4, elevation: 5895, label: 'Uhuru Peak' },
      { day: 4, elevation: 3720, label: 'Horombo Hut' },
      { day: 5, elevation: 1870, label: 'Marangu Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Marangu Gate (1,870m) to Mandara Hut (2,700m)',
        startElevation: 1870,
        endElevation: 2700,
        distanceKm: 8,
        hikingHours: '4-5 hours',
        habitat: 'Rainforest',
        description: 'Trek along well-maintained trails through tropical rainforest to Mandara Hut (2,700m). Optional side walk to Maundi Crater for panoramic views.',
        highlights: ['Rainforest trail & Blue Monkeys', 'Maundi Crater view', 'A-frame wooden huts']
      },
      {
        day: 2,
        title: 'Mandara Hut (2,700m) to Horombo Hut (3,720m)',
        startElevation: 2700,
        endElevation: 3720,
        distanceKm: 12,
        hikingHours: '6-7 hours',
        habitat: 'Moorland',
        description: 'Ascend into giant lobelia and heather moorland enjoying clear views of Mawenzi Peak and the Kibo summit cone, reaching Horombo Hut (3,720m).',
        highlights: ['Giant Groundsels & Lobelias', 'Spectacular Mawenzi view', 'Horombo village huts']
      },
      {
        day: 3,
        title: 'Horombo Hut (3,720m) across The Saddle to Kibo Hut (4,703m)',
        startElevation: 3720,
        endElevation: 4703,
        distanceKm: 10,
        hikingHours: '6-7 hours',
        habitat: 'Alpine Desert',
        description: 'Cross the barren high-altitude Saddle between Kibo and Mawenzi peaks, arriving at Kibo Hut (4,703m) stone base camp. Early dinner and rest for summit push.',
        highlights: ['The Saddle alpine desert', 'Kibo stone hut base camp', 'Summit briefing & early sleep']
      },
      {
        day: 4,
        title: 'SUMMIT DAY: Kibo Hut (4,703m) via Gillmans Point (5,685m) to Uhuru Peak (5,895m) to Horombo Hut (3,720m)',
        startElevation: 4703,
        endElevation: 3720,
        distanceKm: 16,
        hikingHours: '11-14 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent up steep scree to Gillmans Point (5,685m) at sunrise, continuing along the crater rim to Uhuru Peak (5,895m). Descend back to Horombo Hut (3,720m).',
        highlights: ['Gillmans Point sunrise', 'Standing on Uhuru Peak 5,895m', 'Return to Horombo Hut beds']
      },
      {
        day: 5,
        title: 'Horombo Hut (3,720m) via Mandara (2,700m) to Marangu Gate (1,870m)',
        startElevation: 3720,
        endElevation: 1870,
        distanceKm: 20,
        hikingHours: '5-6 hours',
        habitat: 'Rainforest',
        description: 'Descend through moorland and lush forest to Marangu Gate (1,870m). Receive official green or gold summit certificates and transfer to hotel.',
        highlights: ['Official Certificate Ceremony', 'Porters celebration song', 'Hotel transfer & hot shower']
      }
    ]
  },
  {
    id: 'umbwe',
    name: 'Umbwe Route',
    days: 5,
    difficulty: 'Strenuous',
    successRate: 84,
    shortDescription: 'The steepest and most direct 5-day ridge ascent for experienced trekkers.',
    fullDescription: 'The Umbwe Route is the most demanding, steepest, and most direct route on Mount Kilimanjaro. Beginning at Umbwe Gate (1,600m), it climbs steeply along a narrow ridge between two deep valleys to Umbwe Caves Camp (2,850m), past high rock caves (3,500m & 3,780m) into Barranco Camp (3,900m), Karanga (3,960m), and Barafu (4,673m) before the summit push to Uhuru Peak (5,895m).',
    badgeText: 'STEEPEST ADVENTURE',
    priceUSD: 2100,
    heroImage: IMAGES.umbwe,
    galleryImages: [IMAGES.umbwe, IMAGES.machame, IMAGES.heroBg],
    acclimatizationScore: 6,
    sceneryRating: 10,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry, rescue & camping fees',
      'Professional mountain guides & crew',
      '3 high-energy meals daily + boiled water',
      'Expedition 4-season tents & mess tent',
      'Pulse oximeter daily checks & emergency oxygen',
      'Hotel transfers Moshi / Arusha'
    ],
    elevationProfile: [
      { day: 1, elevation: 1600, label: 'Umbwe Gate' },
      { day: 1, elevation: 2850, label: 'Umbwe Caves' },
      { day: 2, elevation: 3900, label: 'Barranco Camp' },
      { day: 3, elevation: 3960, label: 'Karanga Camp' },
      { day: 3, elevation: 4673, label: 'Barafu Camp' },
      { day: 4, elevation: 5895, label: 'Uhuru Peak' },
      { day: 4, elevation: 3100, label: 'Mweka Camp' },
      { day: 5, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Umbwe Gate (1,600m) to Umbwe Caves Camp (2,850m)',
        startElevation: 1600,
        endElevation: 2850,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Rainforest & Ridge',
        description: 'Trek from Umbwe Gate (1,600m) up a steep forested ridge between the Lonzo and Umbwe rivers, camping at Umbwe Caves Camp (2,850m).',
        highlights: ['Steep forested ridge climb', 'Narrow knife-edge trail', 'Umbwe Caves camp']
      },
      {
        day: 2,
        title: 'Umbwe Caves (2,850m) via 3,500m & 3,780m Caves to Barranco Camp (3,900m)',
        startElevation: 2850,
        endElevation: 3900,
        distanceKm: 6,
        hikingHours: '4-5 hours',
        habitat: 'Moorland / Alpine',
        description: 'Climb steeply along exposed rocky ridges passing upper caves (3,500m and 3,780m) before entering the spectacular Barranco Valley (3,900m).',
        highlights: ['Dramatic rock ridges', 'Southern glaciers panorama', 'Barranco Camp below the wall']
      },
      {
        day: 3,
        title: 'Barranco Camp (3,900m) via Karanga (3,960m) to Barafu Base Camp (4,673m)',
        startElevation: 3900,
        endElevation: 4673,
        distanceKm: 9,
        hikingHours: '7-8 hours',
        habitat: 'Alpine Desert',
        description: 'Scramble up Barranco Wall, cross Karanga Valley (3,960m), and climb to Barafu Camp (4,673m). Rest early for midnight summit start.',
        highlights: ['Barranco Wall scramble', 'Alpine desert crossing', 'Barafu summit base camp']
      },
      {
        day: 4,
        title: 'SUMMIT DAY: Barafu (4,673m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4673,
        endElevation: 3100,
        distanceKm: 15,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight push via Stella Point to Uhuru Peak (5,895m) at dawn. Celebrate summit success and descend to Mweka Camp (3,100m).',
        highlights: ['5,895m Uhuru Peak summit', 'Glacier sunrises', 'Descent to Mweka Camp']
      },
      {
        day: 5,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m) & Transfer',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Descend through dense rainforest to Mweka Gate (1,640m). Receive official summit certificates and return to hotel.',
        highlights: ['Summit Certificates', 'Farewell celebrations', 'Hotel return transfer']
      }
    ]
  },
  {
    id: 'northern-circuit',
    name: 'Northern Circuit',
    days: 9,
    difficulty: 'Challenging',
    successRate: 98,
    shortDescription: 'Highest success rate with 360-degree mountain panoramas.',
    fullDescription: 'The newest and longest route on Mount Kilimanjaro. It circles around the remote northern slopes near the Kenyan border, offering complete 360-degree scenery of the mountain with virtually no crowds until joining the summit push at School Hut (4,800m).',
    badgeText: 'BEST SUCCESS RATE',
    priceUSD: 2950,
    heroImage: IMAGES.northernCircuit,
    galleryImages: [IMAGES.northernCircuit, IMAGES.heroBg, IMAGES.lemosho],
    acclimatizationScore: 10,
    sceneryRating: 10,
    crowdLevel: 'Low',
    accommodation: 'Camping',
    includedItems: [
      'All National Park entry, rescue & camping fees',
      'Professional mountain guides & crew',
      '3 fresh warm meals daily + snacks & boiled water',
      '4-season expedition tents & private mess tent',
      'Pulse oximeter daily checks & emergency oxygen',
      'Pre & post climb hotel transfers'
    ],
    elevationProfile: [
      { day: 1, elevation: 2360, label: 'Londorossi Gate' },
      { day: 1, elevation: 2650, label: 'Forest Camp' },
      { day: 2, elevation: 3610, label: 'Shira 1' },
      { day: 3, elevation: 3850, label: 'Shira 2' },
      { day: 4, elevation: 4200, label: 'Moir Hut' },
      { day: 5, elevation: 3800, label: 'Buffalo Camp' },
      { day: 6, elevation: 3600, label: 'Third Cave' },
      { day: 7, elevation: 4800, label: 'School Hut' },
      { day: 8, elevation: 5685, label: 'Gillmans Point' },
      { day: 8, elevation: 5895, label: 'Uhuru Peak' },
      { day: 8, elevation: 3100, label: 'Mweka Camp' },
      { day: 9, elevation: 1640, label: 'Mweka Gate' }
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Londorossi Gate (2,360m) to Forest Camp / Mti Mkubwa (2,650m)',
        startElevation: 2360,
        endElevation: 2650,
        distanceKm: 6,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Trek from Londorossi Gate (2,360m) through undisturbed rainforest to Forest Camp (2,650m).',
        highlights: ['Quiet forest trail', 'Rich wildlife & Colobus monkeys']
      },
      {
        day: 2,
        title: 'Forest Camp (2,650m) to Shira 1 Camp (3,610m)',
        startElevation: 2650,
        endElevation: 3610,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Moorland',
        description: 'Climb onto the expansive Shira Plateau with open big-sky horizons and views of Mt. Meru.',
        highlights: ['Shira plateau entrance', 'Caldera sunset']
      },
      {
        day: 3,
        title: 'Shira 1 (3,610m) to Shira 2 Camp (3,850m)',
        startElevation: 3610,
        endElevation: 3850,
        distanceKm: 7,
        hikingHours: '3-4 hours',
        habitat: 'Moorland',
        description: 'Traverse the eastern plateau enjoying gentle acclimatization toward Shira 2 (3,850m).',
        highlights: ['Shira pinnacle views', 'Giant lobelias']
      },
      {
        day: 4,
        title: 'Shira 2 (3,850m) to Moir Hut (4,200m)',
        startElevation: 3850,
        endElevation: 4200,
        distanceKm: 14,
        hikingHours: '5-7 hours',
        habitat: 'Alpine Desert',
        description: 'Turn north into the Lent Hills area camping near Moir Hut (4,200m).',
        highlights: ['Remote Lent Hills', 'High altitude acclimatization']
      },
      {
        day: 5,
        title: 'Moir Hut (4,200m) to Buffalo Camp (3,800m)',
        startElevation: 4200,
        endElevation: 3800,
        distanceKm: 12,
        hikingHours: '5-7 hours',
        habitat: 'Alpine Desert',
        description: 'Trek along remote northern slopes facing the vast Kenyan Tsavo plains.',
        highlights: ['Kenyan border vistas', 'True remote wilderness']
      },
      {
        day: 6,
        title: 'Buffalo Camp (3,800m) to Third Cave / Kikelewa (3,600m)',
        startElevation: 3800,
        endElevation: 3600,
        distanceKm: 8,
        hikingHours: '5-6 hours',
        habitat: 'Alpine Desert',
        description: 'Hike through high valleys around Kibo north face to Third Cave (3,600m).',
        highlights: ['Kibo north face views', 'Serene uncrowded trail']
      },
      {
        day: 7,
        title: 'Third Cave (3,600m) to School Hut (4,800m)',
        startElevation: 3600,
        endElevation: 4800,
        distanceKm: 5,
        hikingHours: '4-5 hours',
        habitat: 'Alpine Desert',
        description: 'Ascend to School Hut (4,800m) base camp. Rest early for midnight summit bid.',
        highlights: ['High altitude summit prep', 'The Saddle scenery']
      },
      {
        day: 8,
        title: 'SUMMIT DAY: School Hut (4,800m) via Gillmans Point (5,685m) to Uhuru Peak (5,895m) to Mweka Camp (3,100m)',
        startElevation: 4800,
        endElevation: 3100,
        distanceKm: 16,
        hikingHours: '11-15 hours',
        habitat: 'Arctic Summit',
        description: 'Midnight ascent via Gillmans Point (5,685m) to Uhuru Peak (5,895m) and descent to Mweka Camp (3,100m).',
        highlights: ['98% Summit success rate', 'Crater snowfields & glaciers']
      },
      {
        day: 9,
        title: 'Mweka Camp (3,100m) to Mweka Gate (1,640m)',
        startElevation: 3100,
        endElevation: 1640,
        distanceKm: 10,
        hikingHours: '3-4 hours',
        habitat: 'Rainforest',
        description: 'Final rainforest walk, certificate collection ceremony, and victory celebration.',
        highlights: ['Official Gold Summit Certificate', 'Farewell celebrations']
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
    bestSeason: 'Year-Round (Migration Jul-Oct & Jan-Mar)',
    category: 'safari'
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
    bestSeason: 'Year-Round',
    category: 'safari'
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
    bestSeason: 'Year-Round',
    category: 'beach'
  },
  {
    id: 'chemka-hotsprings',
    name: 'Chemka (Kikuletwa) Hot Springs Day Trip',
    days: 1,
    parks: ['Moshi / Boma Ng\'ombe', 'Geothermal Oasis', 'Kikuletwa Springs'],
    description: 'Immerse yourself in crystal-clear turquoise geothermal waters sheltered by towering fig and palm trees. Enjoy natural fish pedicure nibbles, rope swinging into deep warm pools, and a delicious Tanzanian picnic lunch.',
    priceUSD: 95,
    image: new URL('../images/M26.jpeg', import.meta.url).href,
    highlights: [
      'Crystal-clear warm turquoise geothermal waters',
      'Rope swing jumping into natural spring pool',
      'Natural fish spa pedicure in mineral waters',
      'Fresh hot Tanzanian local picnic lunch & drinks'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'materuni-waterfalls',
    name: 'Materuni Waterfalls & Chagga Coffee Tour',
    days: 1,
    parks: ['Materuni Village', 'Chagga Foothills', 'Kilimanjaro Slopes'],
    description: 'Hike through lush Chagga farmland to the stunning 80-meter Materuni Waterfall. Take a refreshing swim in the mountain pool, then participate in a traditional coffee-making experience from bean picking and roasting to grinding and brewing fresh organic Kilimanjaro coffee.',
    priceUSD: 85,
    image: new URL('../images/M28.jpeg', import.meta.url).href,
    highlights: [
      '80m high dramatic Materuni Waterfall hike',
      'Swim in natural volcanic mountain pool',
      'Hands-on Chagga coffee roasting & brewing ceremony',
      'Traditional Chagga hot lunch & banana beer tasting'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'serval-wildlife',
    name: 'Serval Wildlife Sanctuary Experience',
    days: 1,
    parks: ['Siha District', 'Wildlife Sanctuary', 'Kilimanjaro Ecosystem'],
    description: 'An unforgettable ethical wildlife interaction in the foothills of Mount Kilimanjaro. Get up close with rescued African animals including majestic lions, serval cats, giraffes, zebras, and elands with breathtaking views of Mount Meru and Kilimanjaro.',
    priceUSD: 220,
    image: new URL('../images/M30.jpeg', import.meta.url).href,
    highlights: [
      'Close-up ethical wildlife interaction & feeding',
      'Rescued lions, serval cats, giraffes & zebras',
      'Spectacular panoramic views of Mt. Meru & Kibo',
      'VIP guided educational animal behavior tour'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'marangu-day-trip',
    name: 'Kilimanjaro 1-Day Trek (Marangu Gate to Mandara Hut)',
    days: 1,
    parks: ['Kilimanjaro National Park', 'Mandara Hut (2,700m)', 'Maundi Crater'],
    description: 'Experience Mount Kilimanjaro in a single day! Trek through the lush montane rainforest from Marangu Gate (1,870m) up to Mandara Hut (2,700m). Explore the volcanic Maundi Crater with breathtaking views into Kenya and spot blue monkeys and colobus monkeys along the trail.',
    priceUSD: 170,
    image: new URL('../images/M5.jpeg', import.meta.url).href,
    highlights: [
      'Experience climbing Kilimanjaro in 1 day',
      'Trek through lush rainforest to Mandara Hut (2,700m)',
      'Maundi Crater panoramic viewpoint into Kenya',
      'National Park entrance fees & picnic lunch included'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'moshi-town-tour',
    name: 'Moshi Cultural & Historical Town Tour',
    days: 1,
    parks: ['Moshi Town', 'Central Market', 'Old Railway Station'],
    description: 'Discover the vibrant heart of Moshi town nestled at the base of Mount Kilimanjaro. Visit the bustling Central Market with exotic spices and fruits, the historic German Old Railway Station with iconic mountain photo spots, local artisan crafts, and enjoy authentic Swahili street food.',
    priceUSD: 65,
    image: new URL('../images/M32.jpeg', import.meta.url).href,
    highlights: [
      'Vibrant Moshi Central Market & spice stalls',
      'Historic Old Railway Station with Kilimanjaro view',
      'Local Tanzanian artisan workshops & souvenir market',
      'Authentic Swahili street food & local coffee stop'
    ],
    bestSeason: 'Year-Round',
    category: 'cultural'
  },
  {
    id: 'rau-forest',
    name: 'Rau Forest Eco-Reserve & Colobus Monkey Walk',
    days: 1,
    parks: ['Rau Eco-Forest', 'Groundwater Reserve', 'Moshi Outskirts'],
    description: 'Explore the protected Rau Groundwater Forest on foot or by bicycle. Encounter troops of Black-and-White Colobus and Blue Monkeys, discover the 200-year-old sacred Mvule tree, enjoy peaceful rice paddy vistas, and participate in our active tree planting conservation initiative.',
    priceUSD: 70,
    image: new URL('../images/M14.jpeg', import.meta.url).href,
    highlights: [
      'Black-and-White Colobus monkey troop encounters',
      '200-year-old giant sacred Mvule tree',
      'Serene forest walking or cycling eco-trails',
      'Tree planting activity supporting forest conservation'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  },
  {
    id: 'lake-chala',
    name: 'Lake Chala Caldera & Kayaking Day Trip',
    days: 1,
    parks: ['Lake Chala Caldera', 'Taveta Border', 'Crater Lake'],
    description: 'Journey to Lake Chala, a stunning 100-meter deep volcanic crater lake on the border of Tanzania and Kenya. Hike down the steep crater rim, enjoy optional kayaking on emerald waters, observe diverse bird species, and enjoy a picnic lunch overlooking the caldera.',
    priceUSD: 115,
    image: new URL('../images/M19.jpeg', import.meta.url).href,
    highlights: [
      'Stunning emerald volcanic caldera lake',
      'Crater rim hike with 360-degree panoramas',
      'Optional kayaking and swimming in calm waters',
      'Picnic lunch overlooking the Kenya border'
    ],
    bestSeason: 'Year-Round',
    category: 'daytrip'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah J.',
    country: 'USA',
    route: 'Machame 6-Day',
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
    route: 'Lemosho 6-Day',
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
