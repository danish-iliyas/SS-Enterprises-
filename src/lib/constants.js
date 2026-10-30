// Shared between server and client.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const DEFAULT_CONTACT = {
  phone: '8182818841',
  whatsapp: '918182818841',
};

// Booking form: appliance → service types (bilingual). `value` is what gets stored.
export const APPLIANCES = [
  {
    value: 'ro',
    label: { en: 'RO Water Purifier', hi: 'RO Water Purifier' },
    services: [
      { en: 'New Installation', hi: 'Naya Installation' },
      { en: 'Repair', hi: 'Repair' },
      { en: 'Filter Change', hi: 'Filter Badalna' },
      { en: 'Membrane Change', hi: 'Membrane Badalna' },
      { en: 'General Service', hi: 'General Service' },
      { en: 'Annual Maintenance (AMC)', hi: 'Saalana Maintenance (AMC)' },
    ],
  },
  {
    value: 'ac',
    label: { en: 'Air Conditioner (AC)', hi: 'AC (Air Conditioner)' },
    services: [
      { en: 'Installation', hi: 'Installation' },
      { en: 'Repair', hi: 'Repair' },
      { en: 'Gas Filling', hi: 'Gas Filling' },
      { en: 'Servicing', hi: 'Servicing' },
      { en: 'Cleaning', hi: 'Safai (Cleaning)' },
      { en: 'Uninstall / Shifting', hi: 'AC Hatana / Shifting' },
    ],
  },
  {
    value: 'cooler',
    label: { en: 'Air Cooler', hi: 'Cooler' },
    services: [
      { en: 'Repair', hi: 'Repair' },
      { en: 'Motor Replacement', hi: 'Motor Badalna' },
      { en: 'Pump Replacement', hi: 'Pump Badalna' },
      { en: 'Cooling Pad Replacement', hi: 'Cooling Pad Badalna' },
      { en: 'General Maintenance', hi: 'General Maintenance' },
    ],
  },
  {
    value: 'washing_machine',
    label: { en: 'Washing Machine', hi: 'Washing Machine' },
    services: [
      { en: 'Automatic Machine Repair', hi: 'Automatic Machine Repair' },
      { en: 'Semi-Automatic Machine Repair', hi: 'Semi-Automatic Machine Repair' },
      { en: 'Motor / Drain Pump Repair', hi: 'Motor / Drain Pump Repair' },
      { en: 'Installation', hi: 'Installation' },
      { en: 'General Service', hi: 'General Service' },
    ],
  },
  {
    value: 'refrigerator',
    label: { en: 'Refrigerator (Fridge)', hi: 'Fridge' },
    services: [
      { en: 'Repair', hi: 'Repair' },
      { en: 'Not Cooling', hi: 'Cooling Nahi Ho Rahi' },
      { en: 'Compressor Service', hi: 'Compressor Service' },
      { en: 'Gas Filling', hi: 'Gas Filling' },
      { en: 'General Maintenance', hi: 'General Maintenance' },
    ],
  },
  {
    value: 'geyser',
    label: { en: 'Geyser', hi: 'Geyser' },
    services: [
      { en: 'Installation', hi: 'Installation' },
      { en: 'Heating Element Replacement', hi: 'Heating Element Badalna' },
      { en: 'Repair', hi: 'Repair' },
      { en: 'General Maintenance', hi: 'General Maintenance' },
    ],
  },
  {
    value: 'electrical',
    label: { en: 'Electrical Work', hi: 'Bijli Ka Kaam (Electrical)' },
    services: [
      { en: 'House Wiring', hi: 'Ghar Ki Wiring' },
      { en: 'Switchboard Installation', hi: 'Switchboard Lagana' },
      { en: 'Fan Installation / Repair', hi: 'Pankha Lagana / Repair' },
      { en: 'Electrical Fault Repair', hi: 'Bijli Fault Repair' },
      { en: 'Light & Fitting Installation', hi: 'Light Aur Fitting Lagana' },
    ],
  },
  {
    value: 'other',
    label: { en: 'Other', hi: 'Anya (Other)' },
    services: [
      { en: 'Repair', hi: 'Repair' },
      { en: 'Installation', hi: 'Installation' },
      { en: 'Other', hi: 'Anya' },
    ],
  },
];

export const applianceLabel = (value, lang = 'en') =>
  APPLIANCES.find((a) => a.value === value)?.label?.[lang] || value;

export const TIME_SLOTS = [
  { value: 'morning', en: 'Morning (9 AM – 12 PM)', hi: 'Subah (9 – 12 baje)' },
  { value: 'afternoon', en: 'Afternoon (12 PM – 4 PM)', hi: 'Dopahar (12 – 4 baje)' },
  { value: 'evening', en: 'Evening (4 PM – 8 PM)', hi: 'Shaam (4 – 8 baje)' },
  { value: 'any', en: 'Any time', hi: 'Kabhi bhi' },
];

export const BOOKING_STATUS = {
  pending: { label: 'Pending', tone: 'amber' },
  contacted: { label: 'Contacted', tone: 'sky' },
  confirmed: { label: 'Confirmed', tone: 'blue' },
  in_progress: { label: 'In Progress', tone: 'violet' },
  completed: { label: 'Completed', tone: 'green' },
  cancelled: { label: 'Cancelled', tone: 'red' },
};

export const ENQUIRY_TYPE = {
  general: 'General',
  product: 'Product',
  spare_part: 'Spare Part',
  order: 'Cart Order',
  contact: 'Contact Form',
};

export const ENQUIRY_STATUS = {
  new: { label: 'New', tone: 'amber' },
  in_progress: { label: 'In Progress', tone: 'blue' },
  resolved: { label: 'Resolved', tone: 'green' },
  closed: { label: 'Closed', tone: 'slate' },
};

export const MOBILE_RX = /^[6-9]\d{9}$/;
