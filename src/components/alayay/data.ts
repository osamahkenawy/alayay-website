export const ALAYAY_BRAND = {
  name: 'Alayay Maintenance',
  tagline: 'Professional Maintenance Services Across UAE',
  phone: '+971 50 123 4567',
  whatsapp: 'https://wa.me/971501234567',
  email: 'info@alayay.ae',
  website: 'alayay.ae',
  address: 'Abu Dhabi, United Arab Emirates',
};

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alayay.ae'
).replace(/\/$/, '');

export const DEFAULT_TITLE = 'Alayay Maintenance — Professional Maintenance Services Across UAE';
export const DEFAULT_DESCRIPTION =
  'Expert maintenance services for villas, pools, flooring, and facilities across UAE. Annual maintenance contracts, emergency repairs, and quality workmanship you can trust.';
export const DEFAULT_OG_IMAGE = '/og-image.png';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services', hasDropdown: true },
  { label: 'AMC Contracts', href: '/#amc' },
  { label: 'Projects', href: '/#projects' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export const SERVICES = [
  {
    id: 'villa',
    title: 'Villa Maintenance',
    description: 'Complete villa care inside and out.',
    image: '/images/alayay/service-01.png',
    icon: 'villa',
    href: '/services/villa',
  },
  {
    id: 'pool',
    title: 'Swimming Pool Services',
    description: 'Cleaning, maintenance & equipment care.',
    image: '/images/alayay/service-02.png',
    icon: 'pool',
    href: '/services/pool',
  },
  {
    id: 'flooring',
    title: 'Flooring Solutions',
    description: 'Tile, marble, wood & stone care.',
    image: '/images/alayay/service-03.png',
    icon: 'flooring',
    href: '/services/flooring',
  },
  {
    id: 'general',
    title: 'General Maintenance',
    description: 'Electrical, plumbing, carpentry & more.',
    image: '/images/alayay/service-04.png',
    icon: 'general',
    href: '/services/general',
  },
  {
    id: 'emergency',
    title: 'Emergency Repairs',
    description: 'Quick response for urgent issues.',
    image: '/images/alayay/service-05.png',
    icon: 'emergency',
    href: '/services/emergency',
  },
  {
    id: 'amc',
    title: 'Annual Maintenance Contracts',
    description: 'Hassle-free upkeep all year round.',
    image: '/images/alayay/service-06.png',
    icon: 'amc',
    href: '/services/amc',
  },
];

export const TRUST_BADGES = [
  { icon: 'certified', title: 'Certified Team', desc: 'Skilled & background verified professionals.' },
  { icon: 'scheduled', title: 'Scheduled Visits', desc: 'Timely maintenance as per plan.' },
  { icon: 'pricing', title: 'Transparent Pricing', desc: 'No hidden charges. What we quote is what you pay.' },
  { icon: 'support', title: '24/7 Support', desc: "We're always here when you need us." },
];

export const PROJECTS = [
  {
    title: 'Villa Exterior Maintenance',
    category: 'VILLA MAINTENANCE',
    description: 'Full villa maintenance including exterior repainting, wall repairs, and landscaping.',
    before: '/images/alayay/before-01.png',
    after: '/images/alayay/after-01.png',
    icon: 'villa',
  },
  {
    title: 'Swimming Pool Restoration',
    category: 'SWIMMING POOL RESTORATION',
    description: 'Complete pool restoration with deep cleaning, tiling, filtration, and waterproofing.',
    before: '/images/alayay/before-02.png',
    after: '/images/alayay/after-02.png',
    icon: 'pool',
  },
  {
    title: 'Floor Polishing & Restoration',
    category: 'FLOOR POLISHING & RESTORATION',
    description: 'Marble floor polishing and crystallization for a flawless, long-lasting shine.',
    before: '/images/alayay/before-03.png',
    after: '/images/alayay/after-03.png',
    icon: 'flooring',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Ahmed R.',
    role: 'Villa Owner, Dubai',
    avatar: '/images/alayay/avatar-01.png',
    rating: 5,
    text: '"Alayay\'s team is highly professional and reliable. Our villa is always in perfect condition."',
  },
  {
    name: 'Fatima A.',
    role: 'Property Manager, Abu Dhabi',
    avatar: '/images/alayay/avatar-02.png',
    rating: 5,
    text: '"Excellent pool maintenance service. Quick response and very knowledgeable team."',
  },
  {
    name: 'Karim S.',
    role: 'Facility Head, Sharjah',
    avatar: '/images/alayay/avatar-03.png',
    rating: 5,
    text: '"Our AMC with Alayay has saved us time and maintenance costs. Highly recommended!"',
  },
];

export const HOW_IT_WORKS = [
  { step: 1, title: 'Book Service', desc: 'Choose your service and preferred time.' },
  { step: 2, title: 'Inspection', desc: 'Our expert inspects and assesses.' },
  { step: 3, title: 'Quotation', desc: 'Receive transparent quotation.' },
  { step: 4, title: 'Execution', desc: 'Work completed with quality assurance.' },
];
