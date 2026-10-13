import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Utensils,
  Sparkles,
  Navigation,
  Search,
  ChevronRight,
  ChevronLeft,
  Info,
  Wine,
  Flame,
  Check,
  Star,
  ShieldCheck,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import DemoHeader from '../common/DemoHeader';
import { BUSINESS_CONFIG, createWhatsAppLink } from '../../config/business';
import './Ozone.css';

// Verified Business Contact & Listing Details
const OZONE_INFO = {
  name: 'Ozone – Dharwad',
  heritage: 'A Taste of Vanashree Hotel',
  category: 'Restaurant and bar',
  address: 'Hubballi–Dharwad Road, Ambedkar Nagar, Yalakki Shettar Colony, Dharwad, Karnataka 580004, India',
  phoneDisplay: '0836 246 5061',
  phoneRaw: '08362465061',
  rating: '3.8',
  reviewCount: '1,746+',
  services: ['Dine-in', 'Takeaway', 'Delivery'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ozone+Restaurant+Vanashree+Hotel+Hubballi+Dharwad+Road+Ambedkar+Nagar+Dharwad+Karnataka+580004',
  embedMapUrl: 'https://maps.google.com/maps?q=Ozone+Restaurant+Hubballi+Dharwad+Road+Ambedkar+Nagar+Dharwad+Karnataka+580004&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

// Source of Truth Menu Catalog Transcribed From Ozone Dharwad Menu Photographs
const MENU_ITEMS = [
  // A. Non-vegetarian tandoori starters
  {
    id: 'tandoori-pomfret',
    name: 'Tandoori Pomfret',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: 'Seasonal',
    diet: 'non-veg',
    tag: 'Fresh Catch • Seasonal',
    portion: 'Whole Fish'
  },
  {
    id: 'tandoori-chicken',
    name: 'Tandoori Chicken',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320 (Half) / ₹600 (Full)',
    diet: 'non-veg',
    tag: 'Tandoor Signature',
    portion: 'Half / Full'
  },
  {
    id: 'tandoori-ghee-roast',
    name: 'Tandoori Ghee Roast',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹380 (Half) / ₹700 (Full)',
    diet: 'non-veg',
    tag: 'Coastal Ghee Special',
    portion: 'Half / Full'
  },
  {
    id: 'stuffed-kalmi-kabab',
    name: 'Stuffed Kalmi Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹150',
    diet: 'non-veg',
    tag: 'Chef Choice',
    portion: 'Per Portion'
  },
  {
    id: 'tangdi-kabab',
    name: 'Tangdi Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹180',
    diet: 'non-veg',
    tag: 'Charcoal Grilled',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-banjara-kabab',
    name: 'Chicken Banjara Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Rustic Spices',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-pahadi-kabab',
    name: 'Chicken Pahadi Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Mint & Green Herb Rub',
    portion: 'Per Portion'
  },
  {
    id: 'chandi-murgh-tikka',
    name: 'Chandi Murgh Tikka',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Delicate Clay-Oven Finish',
    portion: 'Per Portion'
  },
  {
    id: 'reshmi-kabab',
    name: 'Reshmi Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Silken Malai Marination',
    portion: 'Per Portion'
  },
  {
    id: 'guntur-chicken-kabab',
    name: 'Guntur Chicken Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Spicy Andhra Style',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-alishan-tikka',
    name: 'Chicken Alishan Tikka',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Rich Red Marinade',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-afghani-kabab',
    name: 'Chicken Afghani Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Creamy Cashew Glaze',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-malai-kabab',
    name: 'Chicken Malai Kabab',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Melt-in-Mouth Texture',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-garlic-tikka',
    name: 'Chicken Garlic Tikka',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Burnt Garlic Infusion',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Clay Oven Classic',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-tandoori-platter-special',
    name: 'Chicken Tandoori Platter Special',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹800',
    diet: 'non-veg',
    tag: 'Chef Assorted Platter',
    portion: 'Sharing Platter'
  },
  {
    id: 'chicken-tandoori-lollipop',
    name: 'Chicken Tandoori Lollipop',
    category: 'tandoori',
    categoryLabel: 'Tandoori Starters',
    price: '₹350',
    diet: 'non-veg',
    tag: 'Tandoor Spiced Wings',
    portion: 'Per Portion'
  },

  // B. Chinese non-vegetarian starters
  {
    id: 'fish-finger',
    name: 'Fish Finger',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: 'Seasonal',
    diet: 'non-veg',
    tag: 'Crisp Crumbed • Seasonal',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-manchurian',
    name: 'Chicken Manchurian',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Classic Indo-Chinese',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-chilli',
    name: 'Chicken Chilli',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Green Chillies & Capsicum',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-65',
    name: 'Chicken 65',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'South Indian Spices & Curry Leaves',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-satay',
    name: 'Chicken Satay',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Skewered & Wok Glazed',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-hong-kong',
    name: 'Chicken Hong Kong',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Sweet & Savoury Stir-Fry',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-pepper-dry',
    name: 'Chicken Pepper Dry',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Cracked Black Pepper',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-hot-pan',
    name: 'Chicken Hot Pan',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Sizzling Hot Plate Special',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-urval',
    name: 'Chicken Urval',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹320',
    diet: 'non-veg',
    tag: 'Coastal Dry Tossed',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-lollipop',
    name: 'Chicken Lollipop (6 pcs)',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Crisp Indo-Chinese Favorite',
    portion: '6 pieces'
  },
  {
    id: 'chicken-drumstick',
    name: 'Chicken Drumstick (6 pcs)',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Wok Tossed Drumsticks',
    portion: '6 pieces'
  },
  {
    id: 'chicken-schezwan-dry',
    name: 'Chicken Schezwan Dry',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Fiery Sichuan Glaze',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-don',
    name: 'Chicken Don (2 leg pieces)',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹280',
    diet: 'non-veg',
    tag: 'Special Marinated Leg Pieces',
    portion: '2 leg pieces'
  },
  {
    id: 'chicken-spring-roll',
    name: 'Chicken Spring Roll',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Crispy Stuffed Rolls',
    portion: 'Per Portion'
  },
  {
    id: 'chicken-chinese-platter',
    name: 'Chicken Chinese Platter',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹700',
    diet: 'non-veg',
    tag: 'Assorted Starters Platter',
    portion: 'Sharing Platter'
  },
  {
    id: 'chicken-saute-fry',
    name: 'Chicken Saute Fry',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹310',
    diet: 'non-veg',
    tag: 'Pan Tossed Asian Spices',
    portion: 'Per Portion'
  },
  {
    id: 'hunan-chicken',
    name: 'Hunan Chicken',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹310',
    diet: 'non-veg',
    tag: 'Tangy & Spicy Gravy Dry',
    portion: 'Per Portion'
  },
  {
    id: 'crispy-chicken',
    name: 'Crispy Chicken',
    category: 'chinese',
    categoryLabel: 'Chinese Starters',
    price: '₹310',
    diet: 'non-veg',
    tag: 'Crunchy Shredded Strips',
    portion: 'Per Portion'
  },

  // C. Vegetarian rice and noodles
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹200',
    diet: 'veg',
    tag: 'Classic Stir-Fried',
    portion: 'Full Plate'
  },
  {
    id: 'veg-schezwan-fried-rice',
    name: 'Veg Schezwan Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹220',
    diet: 'veg',
    tag: 'Spicy Schezwan Sauce',
    portion: 'Full Plate'
  },
  {
    id: 'veg-triple-schezwan-fried-rice',
    name: 'Veg Tripple Schezwan Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹270',
    diet: 'veg',
    tag: 'Rice, Noodles & Gravy Combo',
    portion: 'Grand Combo'
  },
  {
    id: 'onion-chilli-fried-rice',
    name: 'Onion Chilli Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹220',
    diet: 'veg',
    tag: 'Caramelized Onion & Green Chilli',
    portion: 'Full Plate'
  },
  {
    id: 'veg-burnt-garlic-fried-rice',
    name: 'Veg Burnt Garlic Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹220',
    diet: 'veg',
    tag: 'Golden Roasted Garlic Aroma',
    portion: 'Full Plate'
  },
  {
    id: 'paneer-fried-rice',
    name: 'Paneer Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹260',
    diet: 'veg',
    tag: 'Tossed Cottage Cheese Cubes',
    portion: 'Full Plate'
  },
  {
    id: 'mushroom-fried-rice',
    name: 'Mushroom Fried Rice',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹260',
    diet: 'veg',
    tag: 'Fresh Button Mushrooms',
    portion: 'Full Plate'
  },
  {
    id: 'veg-hakka-noodles',
    name: 'Veg Hakka Noodles',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹220',
    diet: 'veg',
    tag: 'Wok-Tossed Vegetables',
    portion: 'Full Plate'
  },
  {
    id: 'veg-schezwan-noodles',
    name: 'Veg Schezwan Noodles',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹240',
    diet: 'veg',
    tag: 'Fiery & Savoury Noodles',
    portion: 'Full Plate'
  },
  {
    id: 'veg-hong-kong-noodles',
    name: 'Veg Hong Kong Noodles',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹240',
    diet: 'veg',
    tag: 'Hong Kong Style Stir-Fry',
    portion: 'Full Plate'
  },
  {
    id: 'veg-american-chopsuey',
    name: 'Veg American Chopsuey',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹250',
    diet: 'veg',
    tag: 'Crisp Noodles with Sweet-Sour Gravy',
    portion: 'Full Plate'
  },
  {
    id: 'veg-chinese-chopsuey',
    name: 'Veg Chinese Chopsuey',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹250',
    diet: 'veg',
    tag: 'Crisp Noodles with Savoury White Sauce',
    portion: 'Full Plate'
  },
  {
    id: 'veg-chinese-bhel',
    name: 'Veg Chinese Bhel',
    category: 'veg-rice-noodles',
    categoryLabel: 'Veg Rice & Noodles',
    price: '₹250',
    diet: 'veg',
    tag: 'Crispy Noodles in Tangy Chutneys',
    portion: 'Full Plate'
  },

  // D. Non-vegetarian rice and noodles
  {
    id: 'egg-fried-rice',
    name: 'Egg Fried Rice',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹200',
    diet: 'non-veg',
    tag: 'Egg Scramble Stir-Fry',
    portion: 'Full Plate'
  },
  {
    id: 'egg-schezwan-fried-rice',
    name: 'Egg Schezwan Fried Rice',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹220',
    diet: 'non-veg',
    tag: 'Spicy Egg & Sichuan Sauce',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-hakka-noodles',
    name: 'Chicken Hakka Noodles',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹260',
    diet: 'non-veg',
    tag: 'Tossed Shredded Chicken',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-schezwan-noodles',
    name: 'Chicken Schezwan Noodles',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹280',
    diet: 'non-veg',
    tag: 'Fiery Chicken Noodles',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-hong-kong-noodles',
    name: 'Chicken Hong Kong Noodles',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹280',
    diet: 'non-veg',
    tag: 'Sweet & Savoury Wok Toss',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-american-chopsuey',
    name: 'Chicken American Chopsuey',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Crispy Noodles with Chicken Gravy',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-chinese-chopsuey',
    name: 'Chicken Chinese Chopsuey',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Crispy Noodles in Savoury Chicken Sauce',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹260',
    diet: 'non-veg',
    tag: 'Wok-Tossed Chicken & Egg',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-schezwan-fried-rice',
    name: 'Chicken Schezwan Fried Rice',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹280',
    diet: 'non-veg',
    tag: 'Fiery Red Sauce & Chicken',
    portion: 'Full Plate'
  },
  {
    id: 'chicken-triple-schezwan-fried-rice',
    name: 'Chicken Triple Schezwan Fried Rice',
    category: 'non-veg-rice-noodles',
    categoryLabel: 'Non-Veg Rice & Noodles',
    price: '₹300',
    diet: 'non-veg',
    tag: 'Rice, Noodles, Chicken & Schezwan Gravy',
    portion: 'Grand Combo'
  },

  // E. Desserts
  {
    id: 'rasmalai-single',
    name: 'Rasmalai (Single)',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹50',
    diet: 'veg',
    tag: 'Chilled Saffron Milk Delicacy',
    portion: 'Single Piece'
  },
  {
    id: 'gulab-jamun-double',
    name: 'Gulab Jamun (Double)',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹80',
    diet: 'veg',
    tag: 'Warm Rose-Cardamom Syrup',
    portion: '2 Pieces'
  },
  {
    id: 'gulab-jamun-ice-cream',
    name: 'Gulab Jamun with Ice Cream',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹110',
    diet: 'veg',
    tag: 'Warm Jamun & Vanilla Scoop',
    portion: 'Per Portion'
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹100',
    diet: 'veg',
    tag: 'Fresh Seasonal Fruit Cuts',
    portion: 'Per Bowl'
  },
  {
    id: 'fruit-salad-ice-cream',
    name: 'Fruit Salad with Ice Cream',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹150',
    diet: 'veg',
    tag: 'Seasonal Fruits with Chilled Scoop',
    portion: 'Per Bowl'
  },
  {
    id: 'gudbud-ice-cream',
    name: 'Gudbud Ice Cream',
    category: 'desserts',
    categoryLabel: 'Desserts',
    price: '₹190',
    diet: 'veg',
    tag: 'Karnataka Classic Multi-Layer Sundae',
    portion: 'Tall Glass Sundae'
  }
];

// Bar Menu Factual Brands
const BAR_CATALOG = {
  whiskies: [
    'Johnnie Walker Red',
    "Teacher's 50",
    "Teacher's HLC",
    'Black Dog',
    '100 Pipers',
    'Black & White',
    'Vat 69',
    'Antiquity Blue',
    "Blender's Pride",
    'Signature Premier',
    'Signature',
    'Royal Challenge',
    'Royal Stag',
    'Mc No.1',
    'Imperial Blue',
    'DSP Black',
    'DSP'
  ],
  rums: [
    'Bacardi White',
    'Hercules Deluxe',
    'Mc Celebration',
    'Khodays',
    'Old Monk'
  ],
  servingSizes: ['30 ml', '60 ml', '90 ml', '180 ml']
};

// Gallery Assets from /portfolio/ozone/
const GALLERY_ITEMS = [
  {
    id: 'gal-ambience',
    title: 'Garden Dining Ambience',
    subtitle: 'Relaxed evening seating under warm outdoor lights',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/ambience.jpg`,
    alt: 'Ozone restaurant garden dining ambience with warm evening lighting'
  },
  {
    id: 'gal-tandoori',
    title: 'Clay Oven Tandoori Starters',
    subtitle: 'Charcoal-grilled kebabs, tikkas and platters',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/tandoori.jpg`,
    alt: 'Authentic clay oven tandoori chicken starters and kebabs at Ozone'
  },
  {
    id: 'gal-chinese',
    title: 'Sizzling Indo-Chinese',
    subtitle: 'Wok-tossed chicken lollipops, chilli chicken and hot pans',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/chinese.jpg`,
    alt: 'Sizzling Indo-Chinese appetizers served at Ozone Dharwad'
  },
  {
    id: 'gal-rice',
    title: 'Aromatic Rice & Noodles',
    subtitle: 'Classic Hakka noodles, Schezwan and triple fried rice',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/rice-noodles.jpg`,
    alt: 'Wok-tossed fried rice and noodles with fresh ingredients'
  },
  {
    id: 'gal-dessert',
    title: 'Sweet Evenings & Desserts',
    subtitle: 'Rasmalai, warm gulab jamun and iconic Gudbud sundaes',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/dessert.jpg`,
    alt: 'Traditional Indian desserts including gulab jamun and rasmalai'
  },
  {
    id: 'gal-bar',
    title: 'Spirits & Bar Catalog',
    subtitle: 'Carefully measured whiskies and rums (30ml – 180ml)',
    image: `${import.meta.env.BASE_URL}portfolio/ozone/bar.jpg`,
    alt: 'Ozone bar menu catalog showcasing premium spirits and serving sizes'
  }
];

export default function OzoneDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDiet, setSelectedDiet] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  const shouldReduceMotion = useReducedMotion();
  const searchInputRef = useRef(null);

  // WebNest Pitch WhatsApp URL
  const webNestSalesWhatsAppUrl = createWhatsAppLink(
    BUSINESS_CONFIG.messages.ozone,
    BUSINESS_CONFIG.whatsapp.rawNumber
  );

  // SEO Title & Schema.org LocalBusiness Injection
  useEffect(() => {
    document.title = 'Ozone Dharwad | Restaurant Menu & Contact';

    const schemaId = 'ozone-restaurant-schema';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Restaurant',
        name: OZONE_INFO.name,
        description: 'Restaurant and bar in Dharwad offering Indian tandoori specialties, Indo-Chinese starters, rice, noodles, and desserts. A taste of Vanashree Hotel.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Hubballi–Dharwad Road, Ambedkar Nagar, Yalakki Shettar Colony',
          addressLocality: 'Dharwad',
          addressRegion: 'Karnataka',
          postalCode: '580004',
          addressCountry: 'IN'
        },
        telephone: OZONE_INFO.phoneDisplay,
        servesCuisine: ['North Indian', 'Tandoori', 'Chinese', 'Bar'],
        priceRange: '₹200 - ₹800',
        hasMenu: 'https://sakeeb24.github.io/webnest/demo/ozone#menu'
      });
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.getElementById(schemaId);
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  // Sticky navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or lightbox is open
  useEffect(() => {
    if (mobileMenuOpen || activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, activeLightboxIndex]);

  // Keyboard navigation for Lightbox & Mobile Menu
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (activeLightboxIndex !== null) setActiveLightboxIndex(null);
    } else if (activeLightboxIndex !== null) {
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
      }
    }
  }, [mobileMenuOpen, activeLightboxIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Filtered Menu Items Logic
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // Diet filter
    if (selectedDiet !== 'all' && item.diet !== selectedDiet) {
      return false;
    }
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchTag = item.tag ? item.tag.toLowerCase().includes(q) : false;
      const matchCat = item.categoryLabel.toLowerCase().includes(q);
      return matchName || matchTag || matchCat;
    }
    return true;
  });

  const handleCategorySelect = (catKey) => {
    setSelectedCategory(catKey);
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDiet('all');
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="ozone-app" id="top">
      {/* 0. Accessible Skip Link */}
      <a href="#main-content" className="oz-skip-link">
        Skip to main content
      </a>

      {/* 1. WebNest Demo Persistent Header */}
      <DemoHeader currentDemo="ozone" />

      {/* 2. Client Acquisition Demo Strip */}
      <div className="oz-concept-strip" role="region" aria-label="Demo Disclaimer">
        <span className="oz-concept-strip-badge">
          <Sparkles size={11} aria-hidden="true" />
          WebNest Demo Concept
        </span>
        <span>
          Website concept designed for <strong>Ozone – Dharwad</strong>. Menu &amp; information transcribed from printed records.
        </span>
      </div>

      {/* 3. Main Navigation */}
      <header className={`oz-navbar ${isScrolled ? 'oz-navbar-scrolled' : ''}`}>
        <div className="oz-container oz-nav-inner">
          {/* Brand Wordmark */}
          <a href="#top" className="oz-brand" aria-label="Ozone Dharwad - Back to top">
            <span className="oz-brand-name">OZONE</span>
            <span className="oz-brand-tag">A Taste of Vanashree Hotel</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="oz-nav-links" aria-label="Primary site navigation">
            <a href="#top" className="oz-nav-link">Home</a>
            <a href="#highlights" className="oz-nav-link">Highlights</a>
            <a href="#menu" className="oz-nav-link">Food Menu</a>
            <a href="#experience" className="oz-nav-link">Ambience</a>
            <a href="#gallery" className="oz-nav-link">Gallery</a>
            <a href="#about" className="oz-nav-link">About</a>
            <a href="#location" className="oz-nav-link">Location</a>
          </nav>

          {/* Nav Actions */}
          <div className="oz-nav-actions">
            <a
              href={`tel:${OZONE_INFO.phoneRaw}`}
              className="oz-btn-call oz-btn-call-primary"
              aria-label={`Call Ozone Dharwad at ${OZONE_INFO.phoneDisplay}`}
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call Ozone</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="oz-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open mobile navigation menu"
            >
              <MenuIcon size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="oz-mobile-drawer"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="oz-drawer-header">
              <div className="oz-brand">
                <span className="oz-brand-name">OZONE</span>
                <span className="oz-brand-tag">A Taste of Vanashree Hotel</span>
              </div>
              <button
                type="button"
                className="oz-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <ul className="oz-drawer-links">
              <li>
                <a
                  href="#top"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#highlights"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Highlights
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Food Menu
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ambience
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Ozone
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="oz-drawer-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Location &amp; Contact
                </a>
              </li>
            </ul>

            <div className="oz-drawer-footer">
              <a
                href={`tel:${OZONE_INFO.phoneRaw}`}
                className="oz-btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <Phone size={16} aria-hidden="true" />
                <span>Call {OZONE_INFO.phoneDisplay}</span>
              </a>
              <a
                href={OZONE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oz-btn-secondary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                <Navigation size={16} aria-hidden="true" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">
        {/* ===================================================================
            SECTION 2: HERO SECTION
            =================================================================== */}
        <section className="oz-hero" aria-labelledby="hero-heading">
          <div className="oz-container">
            <div className="oz-hero-grid">
              {/* Left Column: Content */}
              <motion.div
                className="oz-hero-content"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="oz-hero-eyebrow">
                  <span className="oz-hero-eyebrow-dot" aria-hidden="true" />
                  <span>A TASTE OF VANASHREE HOTEL</span>
                </div>

                <h1 id="hero-heading" className="oz-hero-headline">
                  Good Food. Great Company. Memorable Evenings.
                </h1>

                <p className="oz-hero-supporting">
                  Explore a menu of Indian favourites, tandoori specialties, Chinese dishes and desserts at Ozone, Dharwad.
                </p>

                <div className="oz-hero-ctas">
                  <a href="#menu" className="oz-btn-primary">
                    <Utensils size={18} aria-hidden="true" />
                    <span>Explore the Menu</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <a
                    href={OZONE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oz-btn-secondary"
                    aria-label="Get directions to Ozone on Google Maps"
                  >
                    <Navigation size={17} aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>

                {/* Listing verification chips */}
                <div className="oz-hero-badges">
                  {OZONE_INFO.services.map((service, idx) => (
                    <span key={idx} className="oz-hero-badge-item">
                      <Check size={13} aria-hidden="true" />
                      <span>{service}</span>
                    </span>
                  ))}

                  <div className="oz-hero-rating">
                    <Star size={15} fill="var(--oz-sand)" color="var(--oz-sand)" aria-hidden="true" />
                    <span>
                      <strong>{OZONE_INFO.rating} ★</strong> on Google ({OZONE_INFO.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Visual Showcase */}
              <motion.div
                className="oz-hero-media"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="oz-hero-card">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/hero.jpg`}
                    alt="Outdoor dining garden ambience and culinary spread at Ozone Dharwad"
                    className="oz-hero-img"
                    width="600"
                    height="480"
                    loading="eager"
                  />
                  <div className="oz-hero-overlay">
                    <span className="oz-hero-card-kicker">GARDEN DINING &amp; BAR</span>
                    <h2 className="oz-hero-card-title">Hubballi–Dharwad Road</h2>
                    <p className="oz-hero-card-desc">
                      Open for dine-in gatherings, family evenings, and takeaway orders.
                    </p>
                  </div>

                  <div className="oz-hero-floating-badge">
                    <Flame size={14} color="var(--oz-accent)" aria-hidden="true" />
                    <span>Tandoori &amp; Bar Special</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: MENU HIGHLIGHTS (VISUAL CATEGORIES)
            =================================================================== */}
        <section className="oz-highlights-section" id="highlights" aria-labelledby="highlights-heading">
          <div className="oz-container">
            <div className="oz-highlights-header">
              <span className="oz-section-kicker">CULINARY SELECTIONS</span>
              <h2 id="highlights-heading" className="oz-section-title">
                Explore What We Serve
              </h2>
              <p className="oz-section-desc">
                From charcoal-roasted kebabs to wok-tossed noodles and chilled sundaes, jump directly into any section of our verified menu.
              </p>
            </div>

            <div className="oz-highlights-grid">
              {/* Highlight 1: Tandoori */}
              <button
                type="button"
                className="oz-highlight-card"
                onClick={() => handleCategorySelect('tandoori')}
                aria-label="View Tandoori and Kebab menu items"
              >
                <div className="oz-highlight-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/tandoori.jpg`}
                    alt="Sizzling clay oven tandoori starters"
                    className="oz-highlight-img"
                    loading="lazy"
                  />
                  <div className="oz-highlight-scrim" />
                </div>
                <div className="oz-highlight-body">
                  <h3 className="oz-highlight-cat-title">Tandoori &amp; Kebabs</h3>
                  <p className="oz-highlight-cat-desc">
                    Chicken Tikka, Kalmi Kababs, Reshmi, and Tandoori Ghee Roast from the clay oven.
                  </p>
                  <span className="oz-highlight-cat-action">
                    <span>Browse 17 Dishes</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>

              {/* Highlight 2: Chinese */}
              <button
                type="button"
                className="oz-highlight-card"
                onClick={() => handleCategorySelect('chinese')}
                aria-label="View Chinese Starters menu items"
              >
                <div className="oz-highlight-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/chinese.jpg`}
                    alt="Crispy Indo-Chinese chicken starters"
                    className="oz-highlight-img"
                    loading="lazy"
                  />
                  <div className="oz-highlight-scrim" />
                </div>
                <div className="oz-highlight-body">
                  <h3 className="oz-highlight-cat-title">Chinese Starters</h3>
                  <p className="oz-highlight-cat-desc">
                    Chicken 65, Manchurian, Lollipops, Satay, and Sizzling Hot Pan specials.
                  </p>
                  <span className="oz-highlight-cat-action">
                    <span>Browse 18 Dishes</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>

              {/* Highlight 3: Rice & Noodles */}
              <button
                type="button"
                className="oz-highlight-card"
                onClick={() => handleCategorySelect('veg-rice-noodles')}
                aria-label="View Rice and Noodles menu items"
              >
                <div className="oz-highlight-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/rice-noodles.jpg`}
                    alt="Wok tossed rice and noodles"
                    className="oz-highlight-img"
                    loading="lazy"
                  />
                  <div className="oz-highlight-scrim" />
                </div>
                <div className="oz-highlight-body">
                  <h3 className="oz-highlight-cat-title">Rice &amp; Noodles</h3>
                  <p className="oz-highlight-cat-desc">
                    Vegetarian and non-vegetarian fried rice, Hakka noodles, and triple Schezwan combos.
                  </p>
                  <span className="oz-highlight-cat-action">
                    <span>Browse 23 Dishes</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>

              {/* Highlight 4: Desserts */}
              <button
                type="button"
                className="oz-highlight-card"
                onClick={() => handleCategorySelect('desserts')}
                aria-label="View Desserts menu items"
              >
                <div className="oz-highlight-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/dessert.jpg`}
                    alt="Traditional Indian desserts and ice cream"
                    className="oz-highlight-img"
                    loading="lazy"
                  />
                  <div className="oz-highlight-scrim" />
                </div>
                <div className="oz-highlight-body">
                  <h3 className="oz-highlight-cat-title">Desserts</h3>
                  <p className="oz-highlight-cat-desc">
                    Rasmalai, warm Gulab Jamun with ice cream, and Karnataka's favourite Gudbud sundae.
                  </p>
                  <span className="oz-highlight-cat-action">
                    <span>Browse 6 Sweets</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>

              {/* Highlight 5: Bar Menu */}
              <button
                type="button"
                className="oz-highlight-card"
                onClick={() => handleCategorySelect('bar')}
                aria-label="View Bar Menu spirits catalog"
              >
                <div className="oz-highlight-img-wrap">
                  <img
                    src={`${import.meta.env.BASE_URL}portfolio/ozone/bar.jpg`}
                    alt="Spirits and bar catalog at Ozone"
                    className="oz-highlight-img"
                    loading="lazy"
                  />
                  <div className="oz-highlight-scrim" />
                </div>
                <div className="oz-highlight-body">
                  <h3 className="oz-highlight-cat-title">Bar Menu</h3>
                  <p className="oz-highlight-cat-desc">
                    Carefully portioned whisky and rum measures in 30ml, 60ml, 90ml, and 180ml pours.
                  </p>
                  <span className="oz-highlight-cat-action">
                    <span>View 22 Brands</span>
                    <ChevronRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 4: FULL FOOD MENU BROWSER
            =================================================================== */}
        <section className="oz-menu-section" id="menu" aria-labelledby="menu-heading">
          <div className="oz-container">
            <div className="oz-menu-header">
              <span className="oz-section-kicker">VERIFIED MENU</span>
              <h2 id="menu-heading" className="oz-section-title">
                The Ozone Food Menu
              </h2>
              <p className="oz-section-desc">
                Explore all verified dishes and prices transcribed directly from the printed Ozone menu. Filter by dish category, vegetarian choice, or search by name.
              </p>
            </div>

            {/* Menu Controls Container */}
            <div className="oz-menu-controls">
              <div className="oz-menu-controls-top">
                {/* Search Bar */}
                <div className="oz-search-box">
                  <Search size={18} className="oz-search-icon" aria-hidden="true" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    className="oz-search-input"
                    placeholder="Search by dish name (e.g. Lollipop, Hakka, Tikka)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search dishes by name"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="oz-search-clear"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search input"
                    >
                      <X size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Dietary Filter Buttons */}
                <div className="oz-diet-filters" role="group" aria-label="Dietary preferences">
                  <button
                    type="button"
                    className={`oz-diet-btn ${selectedDiet === 'all' ? 'is-active' : ''}`}
                    onClick={() => setSelectedDiet('all')}
                  >
                    <span>All Dishes</span>
                  </button>
                  <button
                    type="button"
                    className={`oz-diet-btn ${selectedDiet === 'veg' ? 'is-active is-active-veg' : ''}`}
                    onClick={() => setSelectedDiet('veg')}
                  >
                    <span className="oz-diet-symbol veg" aria-hidden="true" />
                    <span>Veg Only</span>
                  </button>
                  <button
                    type="button"
                    className={`oz-diet-btn ${selectedDiet === 'non-veg' ? 'is-active is-active-nonveg' : ''}`}
                    onClick={() => setSelectedDiet('non-veg')}
                  >
                    <span className="oz-diet-symbol nonveg" aria-hidden="true" />
                    <span>Non-Veg Only</span>
                  </button>
                </div>
              </div>

              {/* Category Pills Navigation */}
              <div className="oz-category-pills" role="tablist" aria-label="Menu categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'all'}
                  className={`oz-cat-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories ({MENU_ITEMS.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'tandoori'}
                  className={`oz-cat-pill ${selectedCategory === 'tandoori' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('tandoori')}
                >
                  Tandoori Starters (17)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'chinese'}
                  className={`oz-cat-pill ${selectedCategory === 'chinese' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('chinese')}
                >
                  Chinese Starters (18)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'veg-rice-noodles'}
                  className={`oz-cat-pill ${selectedCategory === 'veg-rice-noodles' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('veg-rice-noodles')}
                >
                  Veg Rice &amp; Noodles (13)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'non-veg-rice-noodles'}
                  className={`oz-cat-pill ${selectedCategory === 'non-veg-rice-noodles' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('non-veg-rice-noodles')}
                >
                  Non-Veg Rice &amp; Noodles (10)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'desserts'}
                  className={`oz-cat-pill ${selectedCategory === 'desserts' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('desserts')}
                >
                  Desserts (6)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === 'bar'}
                  className={`oz-cat-pill ${selectedCategory === 'bar' ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory('bar')}
                >
                  Bar Spirits (22 Brands)
                </button>
              </div>
            </div>

            {/* Results Status Line */}
            <div className="oz-menu-status-bar" aria-live="polite">
              <span>
                Showing <strong>{selectedCategory === 'bar' ? '22 spirits brands' : `${filteredMenuItems.length} items`}</strong>
                {selectedCategory !== 'all' && selectedCategory !== 'bar' && ` in ${selectedCategory.replace(/-/g, ' ')}`}
                {selectedDiet !== 'all' && ` (${selectedDiet})`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>

              {(selectedCategory !== 'all' || selectedDiet !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--oz-sand)',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* If Bar is selected, show the Bar Menu catalog */}
            {selectedCategory === 'bar' ? (
              <div className="oz-bar-card-wrapper">
                <div className="oz-bar-header">
                  <div className="oz-bar-title-group">
                    <h3>Ozone Spirits Catalog</h3>
                    <p>Verified Whisky and Rum brands from the Ozone bar records</p>
                  </div>
                  <div className="oz-bar-serving-sizes">
                    <span style={{ fontSize: '12px', color: 'var(--oz-ivory-muted)' }}>Measures:</span>
                    {BAR_CATALOG.servingSizes.map((size, idx) => (
                      <span key={idx} className="oz-size-badge">{size}</span>
                    ))}
                  </div>
                </div>

                <div className="oz-bar-columns">
                  {/* Whiskies */}
                  <div className="oz-bar-col">
                    <h4 className="oz-bar-col-title">
                      <Wine size={18} aria-hidden="true" />
                      <span>Whisky Brands ({BAR_CATALOG.whiskies.length})</span>
                    </h4>
                    <ul className="oz-bar-brand-list">
                      {BAR_CATALOG.whiskies.map((brand, bIdx) => (
                        <li key={bIdx} className="oz-bar-brand-item">
                          {brand}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rums */}
                  <div className="oz-bar-col">
                    <h4 className="oz-bar-col-title">
                      <Wine size={18} aria-hidden="true" />
                      <span>Rum Brands ({BAR_CATALOG.rums.length})</span>
                    </h4>
                    <ul className="oz-bar-brand-list">
                      {BAR_CATALOG.rums.map((brand, rIdx) => (
                        <li key={rIdx} className="oz-bar-brand-item">
                          {brand}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="oz-bar-statutory-note">
                  <Info size={14} aria-hidden="true" />
                  <span>
                    Note: Bar serving prices vary by bottle vintage and current stock. Please confirm current pricing directly with the restaurant. Factual listing compliant with local statutory norms.
                  </span>
                </div>
              </div>
            ) : (
              /* Food Menu Grid */
              <div className="oz-menu-items-grid">
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <article key={item.id} className="oz-menu-card">
                      <div className="oz-menu-card-top">
                        <div className="oz-menu-item-name-group">
                          <span
                            className={`oz-diet-symbol ${item.diet === 'veg' ? 'veg' : 'nonveg'}`}
                            title={item.diet === 'veg' ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
                            aria-label={item.diet === 'veg' ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
                          />
                          <div>
                            <h3 className="oz-menu-item-name">{item.name}</h3>
                            <div className="oz-menu-card-tags">
                              {item.tag && (
                                <span className={`oz-tag-pill ${item.price === 'Seasonal' ? 'oz-tag-seasonal' : ''}`}>
                                  {item.tag}
                                </span>
                              )}
                              {item.portion && (
                                <span className="oz-tag-pill oz-tag-portion">
                                  {item.portion}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <span className="oz-menu-price-tag">
                          {item.price}
                        </span>
                      </div>
                    </article>
                  ))
                ) : (
                  /* Empty State */
                  <div className="oz-empty-state">
                    <div className="oz-empty-icon">
                      <Search size={28} aria-hidden="true" />
                    </div>
                    <h3 className="oz-empty-title">No Dishes Found</h3>
                    <p className="oz-empty-desc">
                      We couldn't find any dish matching "{searchQuery}". Try searching for terms like "Fried Rice", "Tikka", "Chilli" or reset your filters.
                    </p>
                    <button
                      type="button"
                      className="oz-btn-primary"
                      onClick={handleClearFilters}
                    >
                      Clear Search &amp; Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Menu Footnote Source of Truth */}
            <div className="oz-menu-footnote">
              <Info size={20} aria-hidden="true" />
              <div>
                <strong>Source of Truth &amp; Pricing Note:</strong> All menu item names and price numbers shown are transcribed directly from the printed Ozone menu photographs. Seasonal dishes (Pomfret &amp; Fish Finger) are subject to fresh market availability. Please confirm exact arrangements by calling the restaurant at <a href={`tel:${OZONE_INFO.phoneRaw}`} style={{ color: 'var(--oz-sand)', fontWeight: 'bold' }}>{OZONE_INFO.phoneDisplay}</a>.
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: RESTAURANT EXPERIENCE (AMBIENCE & SEATING)
            =================================================================== */}
        <section className="oz-experience-section" id="experience" aria-labelledby="experience-heading">
          <div className="oz-container">
            <div className="oz-experience-grid">
              {/* Media Left */}
              <div className="oz-experience-image-wrap">
                <img
                  src={`${import.meta.env.BASE_URL}portfolio/ozone/ambience.jpg`}
                  alt="Outdoor dining garden seating at Ozone Dharwad"
                  className="oz-experience-img"
                  loading="lazy"
                  width="600"
                  height="440"
                />
                <div className="oz-experience-badge">
                  <div className="oz-experience-badge-kicker">GARDEN DINING</div>
                  <h3 className="oz-experience-badge-title">Hubballi–Dharwad Road Dining</h3>
                </div>
              </div>

              {/* Copy Right */}
              <div>
                <span className="oz-section-kicker">DINING EXPERIENCE</span>
                <h2 id="experience-heading" className="oz-section-title">
                  A Place to Gather Around Good Food.
                </h2>
                <p className="oz-section-desc">
                  Whether it’s a celebratory family dinner, an evening unwind with friends, or a quick takeaway pickup, Ozone pairs culinary variety with welcoming garden seating.
                </p>

                <div className="oz-experience-points">
                  <div className="oz-exp-point">
                    <div className="oz-exp-point-icon">
                      <Utensils size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="oz-exp-point-title">Relaxed Garden Seating</h3>
                      <p className="oz-exp-point-desc">
                        Enjoy the cool Dharwad evening climate in an airy outdoor garden setting designed for lingering conversations and comfortable meals.
                      </p>
                    </div>
                  </div>

                  <div className="oz-exp-point">
                    <div className="oz-exp-point-icon">
                      <Sparkles size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="oz-exp-point-title">Vanashree Hotel Heritage</h3>
                      <p className="oz-exp-point-desc">
                        Part of the established Vanashree Hotel brand in Dharwad, bringing decades of trusted hospitality and regionally seasoned culinary standards.
                      </p>
                    </div>
                  </div>

                  <div className="oz-exp-point">
                    <div className="oz-exp-point-icon">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="oz-exp-point-title">Dine-in, Takeaway &amp; Delivery</h3>
                      <p className="oz-exp-point-desc">
                        Convenient dining options verified on Ozone's business listing. Call ahead to verify daily timings or reserve large gathering tables.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 6: GALLERY WITH ACCESSIBLE LIGHTBOX
            =================================================================== */}
        <section className="oz-gallery-section" id="gallery" aria-labelledby="gallery-heading">
          <div className="oz-container">
            <div className="oz-gallery-header">
              <span className="oz-section-kicker">ATMOSPHERE &amp; DISHES</span>
              <h2 id="gallery-heading" className="oz-section-title">
                Inside Ozone Dharwad
              </h2>
              <p className="oz-section-desc">
                A visual glimpse of our garden dining spaces, signature tandoori preparations, Indo-Chinese platters, and bar offerings.
              </p>
            </div>

            <div className="oz-gallery-grid">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className="oz-gallery-item"
                  onClick={() => setActiveLightboxIndex(idx)}
                  aria-label={`View enlarged photo: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="oz-gallery-img"
                    loading="lazy"
                  />
                  <div className="oz-gallery-item-overlay">
                    <h3 className="oz-gallery-item-caption">{item.title}</h3>
                    <p className="oz-gallery-item-sub">{item.subtitle}</p>
                  </div>
                  <div className="oz-gallery-zoom-badge" aria-hidden="true">
                    <Maximize2 size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Accessible Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxIndex !== null && (
            <motion.div
              className="oz-lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="Enlarged photo view"
            >
              <div className="oz-lightbox-container">
                <button
                  type="button"
                  className="oz-lightbox-close-btn"
                  onClick={() => setActiveLightboxIndex(null)}
                  aria-label="Close enlarged photo view (Esc)"
                >
                  <X size={20} aria-hidden="true" />
                </button>

                {/* Previous Button */}
                <button
                  type="button"
                  className="oz-lightbox-nav-btn oz-lightbox-prev"
                  onClick={() =>
                    setActiveLightboxIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
                  }
                  aria-label="View previous photo (Left arrow)"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>

                {/* Main Lightbox Image */}
                <div className="oz-lightbox-image-wrap">
                  <img
                    src={GALLERY_ITEMS[activeLightboxIndex].image}
                    alt={GALLERY_ITEMS[activeLightboxIndex].alt}
                    className="oz-lightbox-image"
                  />
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  className="oz-lightbox-nav-btn oz-lightbox-next"
                  onClick={() =>
                    setActiveLightboxIndex((prev) => (prev + 1) % GALLERY_ITEMS.length)
                  }
                  aria-label="View next photo (Right arrow)"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>

                <div className="oz-lightbox-footer">
                  <h3 className="oz-lightbox-caption">
                    {GALLERY_ITEMS[activeLightboxIndex].title}
                  </h3>
                  <p className="oz-lightbox-counter">
                    {activeLightboxIndex + 1} of {GALLERY_ITEMS.length} • {GALLERY_ITEMS[activeLightboxIndex].subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            SECTION 7: ABOUT OZONE
            =================================================================== */}
        <section className="oz-about-section" id="about" aria-labelledby="about-heading">
          <div className="oz-container">
            <div className="oz-about-grid">
              <div>
                <span className="oz-section-kicker">ABOUT OZONE</span>
                <h2 id="about-heading" className="oz-section-title">
                  Your Next Dining Plan Starts Here.
                </h2>
                <p className="oz-section-desc" style={{ marginBottom: '20px' }}>
                  Ozone is a restaurant and bar in Dharwad offering a rich culinary repertoire under the banner of “A Taste of Vanashree Hotel”.
                </p>
                <p className="oz-section-desc" style={{ marginBottom: '20px' }}>
                  Conveniently positioned on Hubballi–Dharwad Road, the venue serves diners seeking generous tandoori platters, bold Indo-Chinese starters, comforting rice and noodle specialties, classic desserts, and measured spirits.
                </p>
                <p className="oz-section-desc">
                  With garden seating and dedicated indoor spaces, Ozone remains an established local gathering hub for friends, colleagues, and families in the twin cities.
                </p>
              </div>

              {/* Quick Fact Card */}
              <div className="oz-about-card">
                <div className="oz-about-card-badge">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Dharwad Landmark</span>
                </div>

                <h3 className="oz-about-card-title">
                  Vanashree Hotel Heritage
                </h3>

                <p style={{ color: 'var(--oz-ivory-muted)', fontSize: '14px', lineHeight: 1.65 }}>
                  Known across Dharwad for honest flavours and warm hospitality, Ozone brings together local culinary traditions with an open-air bar and dining experience.
                </p>

                <div className="oz-about-stats-grid">
                  <div className="oz-stat-item">
                    <span className="oz-stat-val">3.8 ★</span>
                    <span className="oz-stat-label">Google Rating</span>
                  </div>
                  <div className="oz-stat-item">
                    <span className="oz-stat-val">1,740+</span>
                    <span className="oz-stat-label">Diner Reviews</span>
                  </div>
                  <div className="oz-stat-item">
                    <span className="oz-stat-val">50+</span>
                    <span className="oz-stat-label">Verified Dishes</span>
                  </div>
                  <div className="oz-stat-item">
                    <span className="oz-stat-val">3</span>
                    <span className="oz-stat-label">Dining Modes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 8: LOCATION & CONTACT
            =================================================================== */}
        <section className="oz-location-section" id="location" aria-labelledby="location-heading">
          <div className="oz-container">
            <div style={{ marginBottom: '40px' }}>
              <span className="oz-section-kicker">FIND &amp; CONTACT</span>
              <h2 id="location-heading" className="oz-section-title">
                Visit Ozone in Dharwad
              </h2>
              <p className="oz-section-desc">
                Located on Hubballi–Dharwad Road in Ambedkar Nagar, Yalakki Shettar Colony. Easy access with ample parking along the main road.
              </p>
            </div>

            <div className="oz-location-grid">
              {/* Contact Information Cards */}
              <div className="oz-contact-cards">
                {/* Address Card */}
                <div className="oz-contact-card">
                  <div className="oz-contact-icon">
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div className="oz-contact-details">
                    <h4>Address</h4>
                    <p>{OZONE_INFO.address}</p>
                    <a
                      href={OZONE_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oz-contact-link"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Telephone Card */}
                <div className="oz-contact-card">
                  <div className="oz-contact-icon">
                    <Phone size={22} aria-hidden="true" />
                  </div>
                  <div className="oz-contact-details">
                    <h4>Telephone Inquiries</h4>
                    <p>Call for table inquiries, party orders, or takeaway pickup status.</p>
                    <a
                      href={`tel:${OZONE_INFO.phoneRaw}`}
                      className="oz-contact-link"
                    >
                      <span>{OZONE_INFO.phoneDisplay}</span>
                      <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Timings & Availability Note */}
                <div className="oz-contact-card">
                  <div className="oz-contact-icon">
                    <Clock size={22} aria-hidden="true" />
                  </div>
                  <div className="oz-contact-details">
                    <h4>Dining Modes</h4>
                    <p>Dine-in, Takeaway, and Delivery available as per current business listing.</p>
                    <span style={{ fontSize: '13px', color: 'var(--oz-sand)' }}>
                      Please contact the restaurant to confirm daily timings and current seating arrangements.
                    </span>
                  </div>
                </div>

                {/* Call-to-action buttons */}
                <div className="oz-location-actions">
                  <a
                    href={`tel:${OZONE_INFO.phoneRaw}`}
                    className="oz-btn-primary"
                    aria-label={`Call Ozone on ${OZONE_INFO.phoneDisplay}`}
                  >
                    <Phone size={16} aria-hidden="true" />
                    <span>Call Ozone Now</span>
                  </a>

                  <a
                    href={OZONE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oz-btn-secondary"
                    aria-label="Get directions on Google Maps"
                  >
                    <Navigation size={16} aria-hidden="true" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="oz-map-wrap">
                <iframe
                  title="Ozone Restaurant Dharwad location map"
                  src={OZONE_INFO.embedMapUrl}
                  className="oz-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: WEBNEST CONCEPT CTA (CLIENT ACQUISITION PITCH)
            =================================================================== */}
        <section className="oz-webnest-pitch-section" aria-labelledby="webnest-pitch-heading">
          <div className="oz-container">
            <motion.div
              className="oz-webnest-pitch-card"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="oz-pitch-badge">
                <Sparkles size={13} aria-hidden="true" />
                <span>Website Concept by WebNest</span>
              </div>

              <h2 id="webnest-pitch-heading" className="oz-pitch-title">
                Want a website like this for your business?
              </h2>

              <p className="oz-pitch-desc">
                WebNest designs bespoke, high-performance websites for restaurants, bars, and local enterprises. We help you present your full menu, capture mobile diners, and drive direct telephone calls.
              </p>

              <a
                href={webNestSalesWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="oz-pitch-btn"
                aria-label="Talk to WebNest on WhatsApp about getting a website for your business"
              >
                <MessageCircle size={20} aria-hidden="true" />
                <span>Talk to WebNest</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              <p className="oz-pitch-subtext">
                Direct founder consultation with Sakeeb I Mulla • {BUSINESS_CONFIG.whatsapp.displayNumber}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ===================================================================
          SECTION 10: FOOTER
          =================================================================== */}
      <footer className="oz-footer" role="contentinfo">
        <div className="oz-container">
          <div className="oz-footer-grid">
            {/* Restaurant Info */}
            <div className="oz-footer-brand">
              <h4>OZONE – DHARWAD</h4>
              <p style={{ color: 'var(--oz-sand)', fontSize: '13px', fontWeight: 600 }}>
                A Taste of Vanashree Hotel • Restaurant &amp; Bar
              </p>
              <p>
                Hubballi–Dharwad Road, Ambedkar Nagar, Yalakki Shettar Colony, Dharwad, Karnataka 580004
              </p>
              <p>
                <strong>Telephone:</strong>{' '}
                <a href={`tel:${OZONE_INFO.phoneRaw}`} style={{ color: 'var(--oz-sand)' }}>
                  {OZONE_INFO.phoneDisplay}
                </a>
              </p>
            </div>

            {/* Quick Links */}
            <div className="oz-footer-col">
              <h5>Navigation</h5>
              <ul>
                <li><a href="#top">Back to Top</a></li>
                <li><a href="#highlights">Menu Highlights</a></li>
                <li><a href="#menu">Full Food Menu</a></li>
                <li><a href="#experience">Garden Dining</a></li>
                <li><a href="#gallery">Photo Gallery</a></li>
                <li><a href="#about">About Ozone</a></li>
                <li><a href="#location">Location &amp; Directions</a></li>
              </ul>
            </div>

            {/* WebNest Attribution Column */}
            <div className="oz-footer-col">
              <h5>WebNest Studio</h5>
              <ul>
                <li>
                  <a
                    href={webNestSalesWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#93C5FD', fontWeight: 600 }}
                  >
                    Need a website? Talk to WebNest →
                  </a>
                </li>
                <li>
                  <span style={{ fontSize: '12px', color: 'var(--oz-ivory-muted)' }}>
                    High-performance bespoke websites for restaurants, fitness centres, and service businesses.
                  </span>
                </li>
                <li>
                  <span style={{ fontSize: '12px', color: 'var(--oz-sand-muted)' }}>
                    WhatsApp: {BUSINESS_CONFIG.whatsapp.displayNumber}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="oz-footer-bottom">
            <span>
              Website concept designed by WebNest • Proposed concept, not an officially commissioned website.
            </span>
            <a
              href={webNestSalesWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Want a website like this? Talk to WebNest →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
