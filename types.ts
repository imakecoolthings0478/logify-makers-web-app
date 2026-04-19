export enum OrderStatus {
  ACCEPTING = 'Accepting Orders',
  NOT_ACCEPTING = 'Not Accepting Orders',
  DOWN = 'Services Down'
}

export interface PromoCode {
  code: string;
  discountPercent: number;
}

export interface ServiceItem {
  id: number;
  name: string;
  price: number;
  currency: string;
  isComingSoon: boolean;
}

export interface Announcement {
  id: number;
  message: string;
  timestamp: string;
}

export interface AppContextType {
  orderStatus: OrderStatus;
  setOrderStatus: (status: OrderStatus) => void;
  promoCode: PromoCode;
  setPromoCode: (promo: PromoCode) => void;
  services: ServiceItem[];
  updateService: (id: number, updates: Partial<ServiceItem>) => void;
  announcements: Announcement[];
  setAnnouncements: (announcements: Announcement[]) => void;
  addAnnouncement: (message: string) => void;
  deleteAnnouncement: (id: number) => void;
}
