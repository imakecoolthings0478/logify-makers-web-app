import { ServiceItem } from './types';

export const ADMIN_PASSCODE = 'logify@makers!are!the!goat853@$r72;[';
export const DISCORD_LINK = 'https://discord.gg/7kj6eHGrAS';

export const SUPABASE_URL = 'https://your-project-url.supabase.co';
export const SUPABASE_ANON_KEY = 'your-anon-key-here';

export const INITIAL_SERVICES: ServiceItem[] = [
  { id: 1, name: 'Simple Logo', price: 10, currency: 'Rs. ', isComingSoon: false },
  { id: 2, name: 'Professional Logo', price: 20, currency: 'Rs. ', isComingSoon: false },
  { id: 3, name: 'Profile Photo', price: 10, currency: 'Rs. ', isComingSoon: false },
  { id: 4, name: 'YouTube Banner', price: 0, currency: 'Rs. ', isComingSoon: true },
  { id: 5, name: 'Banner + Profile Combo', price: 20, currency: 'Rs. ', isComingSoon: false },
  { id: 6, name: 'YouTube Thumbnails', price: 40, currency: 'Rs. ', isComingSoon: false },
  { id: 7, name: 'Simple Editing', price: 0, currency: 'Rs. ', isComingSoon: true },
];

export const TERMS_CONDITIONS = [
  'Please do not ask for price reductions after rates are shared.',
  'We will do our best to complete your order as early as possible.',
  'Payment first.',
  'Prices for custom content are determined and will be communicated to you before any work begins.',
  'Delivery times are estimates and may vary due to complexity or creator availability.',
  'While we strive to meet your expectations, artistic interpretation is subjective, and dissatisfaction with the style or outcome does not guarantee a refund.',
  'Do not share sensitive information publicly in the Server. The Server is not responsible for any data breaches resulting from your actions.',
  "The Server reserves the right to remove or ban any user for violating these terms, Discord's rules, or for any other reason deemed necessary by the moderators.",
  'Upon termination, any pending commissions may be canceled, and refunds will be subject to the refund policy at point 10th.',
  '100% refunds are not guaranteed.',
  'You may receive up to 40-50% of your money.',
  'The Server reserves the right to update these terms at any time. Changes will be announced in the Server, and continued use of the Server after changes constitutes acceptance of the updated terms.',
  'Any Religious jokes, NSFW Content, Gore/Violence Media are Strictly Prohibited.'
];
