/**
 * NOVA — Bar · Restaurant · Lounge
 * Centralized Demo Content & Venue Data
 */

export const NOVA_CONFIG = {
  name: 'NOVA',
  brandWordmark: 'NOVA',
  tagline: 'Bar · Restaurant · Lounge',
  kicker: 'DINING · COCKTAILS · NIGHTLIFE',
  heroHeadline: ['Good Taste.', 'Great Nights.'],
  heroSupporting: 'Exceptional dining, signature cocktails, and an unforgettable atmosphere that comes alive after dark.',
  
  // Venue Information (Configurable Demo Data)
  address: {
    line1: '14 Kensington Place',
    district: 'Mayfair District',
    city: 'London W1J 8DY',
    full: '14 Kensington Place, Mayfair District, London W1J 8DY',
    mapsUrl: 'https://maps.google.com/?q=Mayfair+London+W1J',
  },
  
  contact: {
    phoneDisplay: '+44 20 7946 0920',
    phoneRaw: '+442079460920',
    email: 'reservations@novalounge.com',
  },

  hours: [
    { days: 'Tuesday – Thursday', time: '17:00 – 01:00', note: 'Kitchen closes 23:00' },
    { days: 'Friday – Saturday', time: '17:00 – 03:00', note: 'Late Night Lounge & Curated Sound' },
    { days: 'Sunday', time: '16:00 – 00:00', note: 'Sunset Aperitivo & Dinner' },
    { days: 'Monday', time: 'Closed', note: 'Available for Private Venue Buyouts' },
  ],

  highlights: [
    { title: 'Signature Dining', desc: 'Savour prime wood-fired cuts and seasonal tasting menus.' },
    { title: 'Craft Cocktails', desc: 'Bespoke alchemy infused with rare spirits and botanicals.' },
    { title: 'Live Experiences', desc: 'Curated vinyl selectors and atmospheric late-night sound.' },
  ],

  story: {
    title: 'The Art of the Evening',
    lead: 'Born from a devotion to nocturnal elegance, NOVA is where sensory culinary ambition converges with world-class mixology.',
    body: [
      'Every space within NOVA is curated to transition seamlessly from sunlit aperitifs to midnight revelry. Beneath soaring blackened arches and hand-brushed champagne brass, our kitchen crafts bold modern dishes designed for communal celebration.',
      'Behind the monolithic obsidian marble bar, master mixologists balance rare single-cask spirits, clarified elixirs, and aromatic infusions. Here, every night is orchestrated as an unforgettable occasion.',
    ],
    curator: 'Laurent Mercier',
    curatorRole: 'Executive Culinary Director',
  },

  barExperience: {
    eyebrow: 'BEHIND THE MARBLE',
    title: 'Alchemy & Aged Spirits',
    lead: 'A cocktail programme engineered with obsessive precision and architectural beauty.',
    bullets: [
      'Over 280 rare whiskies, mezcals, and vintage champagnes in our private cellar.',
      'Clarified elixirs and ice hand-carved from crystalline 300-pound blocks.',
      'Bespoke glassware created exclusively for NOVA by European master glassmakers.',
      'Late-night bar service accompanied by acoustic warmth and low-frequency groove.',
    ],
  },
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Curations' },
  { id: 'cocktails', name: 'Signature Cocktails' },
  { id: 'starters', name: 'Raw Bar & Starters' },
  { id: 'mains', name: 'Mains & Wood-Fire' },
  { id: 'desserts', name: 'Desserts & Digestifs' },
];

export const SIGNATURE_MENU = [
  // Signature Cocktails
  {
    id: 'c-obsidian',
    name: 'The Obsidian Gold',
    category: 'cocktails',
    price: '£24',
    badge: 'House Icon',
    description: 'Smoked Oaxacan mezcal, charcoal-infused agave, black walnut bitters, finished with 24k edible gold leaf mist.',
    alcohol: 'Signature Spirit',
  },
  {
    id: 'c-nocturne',
    name: 'Champagne Nocturne',
    category: 'cocktails',
    price: '£26',
    badge: 'Sparkling',
    description: 'Grand Cru Vintage Champagne, Williams pear eau-de-vie, saffron liqueur, clarified yuzu, crystalline ice pillar.',
    alcohol: 'Champagne & Spirit',
  },
  {
    id: 'c-solstice',
    name: 'Velvet Solstice',
    category: 'cocktails',
    price: '£22',
    badge: 'Barrel-Aged',
    description: 'Japanese Hibiki whisky, antica formula vermouth, amaro montenegro, smoked cedar essence, brandied cherry.',
    alcohol: 'Aged Whisky',
  },
  {
    id: 'c-luminary',
    name: 'Luminary Gimlet',
    category: 'cocktails',
    price: '£20',
    badge: 'Crisp & Botanical',
    description: 'Ki No Bi botanical gin, clarified lime cordial, kaffir lime leaf perfume, elderflower mist.',
    alcohol: 'Botanical Gin',
  },

  // Starters & Raw Bar
  {
    id: 's-hamachi',
    name: 'Truffle Hamachi Crudo',
    category: 'starters',
    price: '£26',
    badge: 'Raw Bar',
    description: 'Yellowtail kingfish sashimi, white soy, yuzu kosho pearls, shaved black Perigord truffle, crisp lotus root.',
    diet: 'Pescatarian',
  },
  {
    id: 's-tartare',
    name: 'Miyazaki Wagyu Tartare',
    category: 'starters',
    price: '£30',
    badge: 'Signature',
    description: 'Hand-cut A5 wagyu, smoked bone marrow emulsion, Oscietra caviar crown, warm brioche soldier.',
    diet: 'Prime Beef',
  },
  {
    id: 's-burrata',
    name: 'Charred Fig & Stracciatella',
    category: 'starters',
    price: '£22',
    badge: 'Vegetarian',
    description: 'Pugliese stracciatella, black mission figs blistered over coals, 25-year Modena balsamic, toasted pistachio.',
    diet: 'Vegetarian',
  },
  {
    id: 's-caviar',
    name: 'Oscietra Imperial Caviar (30g)',
    category: 'starters',
    price: '£145',
    badge: 'Luxury Selection',
    description: 'Traditional accompaniments, buckwheat blinis, chive crème fraîche, mother of pearl service.',
    diet: 'Pescatarian',
  },

  // Mains & Wood-Fire
  {
    id: 'm-wagyu',
    name: 'A5 Kagoshima Striploin (200g)',
    category: 'mains',
    price: '£95',
    badge: 'Chef Cut',
    description: 'Robata-grilled Japanese wagyu, glazed maitake mushroom, smoked shallot purée, 48-hour bone glaze.',
    diet: 'Gluten-Free Option',
  },
  {
    id: 'm-seabass',
    name: 'Glazed Chilean Seabass',
    category: 'mains',
    price: '£48',
    badge: 'Seafood Signature',
    description: 'White miso & mirin glaze, dashi ginger reduction, baby bok choy, pickled daikon blossom.',
    diet: 'Pescatarian',
  },
  {
    id: 'm-tortelloni',
    name: 'Wild Mushroom Tortelloni',
    category: 'mains',
    price: '£38',
    badge: 'Handmade Pasta',
    description: 'Morel & porcini filling, 36-month Parmigiano-Reggiano fonduta, summer black truffle shavings.',
    diet: 'Vegetarian',
  },
  {
    id: 'm-duck',
    name: 'Spiced Challans Duck Breast',
    category: 'mains',
    price: '£44',
    badge: 'Wood-Fired',
    description: 'Honey & lavender glaze, parsnip silk, charred sour cherries, roasted duck jus.',
    diet: 'Poultry',
  },

  // Desserts
  {
    id: 'd-sphere',
    name: 'Obsidian Chocolate Sphere',
    category: 'desserts',
    price: '£19',
    badge: 'Table Ritual',
    description: 'Valrhona 72% dark chocolate shell, hazelnut mousse, gold leaf, warm salted caramel pour at the table.',
    diet: 'Vegetarian',
  },
  {
    id: 'd-pannacotta',
    name: 'Saffron & Cardamom Panna Cotta',
    category: 'desserts',
    price: '£17',
    badge: 'Botanical',
    description: 'Infused double cream, blood orange granita, caramelized pistachio praline crunch.',
    diet: 'Vegetarian',
  },
];

export const EXPERIENCE_CARDS = [
  {
    id: 'exp-dining',
    title: 'The Dining Room',
    subtitle: 'Culinary Artistry & Wood-Fire',
    desc: 'An intimate dining sanctuary anchored by open flame cooking, prime dry-aged cuts, and hyper-seasonal European-Asian gastronomy.',
    imageKey: 'dining',
    badge: 'Michelin-Calibre',
    link: '#menu',
    cta: 'Explore Cuisine',
  },
  {
    id: 'exp-cocktails',
    title: 'The Cocktail Bar',
    subtitle: 'Nocturnal Alchemy',
    desc: 'Monolithic black marble bar serving hand-crafted cocktails, rare vintage single malts, and low-temperature infusions until late.',
    imageKey: 'bar',
    badge: 'Curated Mixology',
    link: '#bar',
    cta: 'Discover the Bar',
  },
  {
    id: 'exp-nightlife',
    title: 'The Late Lounge',
    subtitle: 'Sonic Elegance & Energy',
    desc: 'As midnight approaches, deep velvet banquettes and amber lighting create the stage for resident vinyl selectors and international guest DJs.',
    imageKey: 'lounge',
    badge: 'Late Night Venue',
    link: '#events',
    cta: 'View Nightlife',
  },
];

export const UPCOMING_EVENTS = [
  {
    id: 'evt-jazz',
    title: 'Velvet Sessions — Live Nu-Jazz & Soul',
    date: 'Every Thursday',
    time: '20:30 – Midnight',
    imageKey: 'lounge',
    desc: 'Acoustic double bass, smoky saxophone, and neo-soul vocalists paired with our signature cocktail tasting flight.',
    tag: 'Live Performance',
  },
  {
    id: 'evt-vinyl',
    title: 'Midnight Selectors — Analog Vinyl Series',
    date: 'Friday & Saturday',
    time: '22:00 – 03:00',
    imageKey: 'bar',
    desc: 'Deep disco, rare groove, and nocturnal house spun exclusively on vinyl by London and Berlin resident selectors.',
    tag: 'Nightlife & DJ',
  },
  {
    id: 'evt-omakase',
    title: 'The Cellar Vault — Rare Spirits Tasting',
    date: 'Last Sunday of the Month',
    time: '18:00 – 21:00',
    imageKey: 'cocktail',
    desc: 'An ultra-exclusive 12-seat tasting exploring discontinued Japanese whiskies and pre-phylloxera cognacs with our head sommelier.',
    tag: 'Masterclass',
  },
];

export const GUEST_REVIEWS = [
  {
    id: 'rev-1',
    quote: 'The intersection of dramatic architecture, flawless cocktails, and world-class dining. NOVA sets a transcendent standard for London nightlife.',
    author: 'Clara Montgomery',
    title: 'Hospitality Critic & Columnist',
    verified: 'Verified Dinner Guest',
    rating: 5,
  },
  {
    id: 'rev-2',
    quote: 'From the first sip of The Obsidian to the melt-in-the-mouth wagyu, the execution was faultless. The ambient lighting makes everyone feel extraordinary.',
    author: 'Julian Sterling',
    title: 'Private Equity Director',
    verified: 'Verified Table Reservation',
    rating: 5,
  },
  {
    id: 'rev-3',
    quote: 'An atmosphere that actually delivers on its promise. Sophisticated, dark, sensual, and the music curation is the finest I have heard in years.',
    author: 'Elena Rostova',
    title: 'Creative Director',
    verified: 'Verified Lounge Guest',
    rating: 5,
  },
];
