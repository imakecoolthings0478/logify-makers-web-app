import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppContextType, OrderStatus, PromoCode, ServiceItem, Announcement } from '../types';
import { INITIAL_SERVICES } from '../constants';
import { supabase } from '../supabaseClient';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [orderStatus, setOrderStatusState] = useState<OrderStatus>(OrderStatus.ACCEPTING);
  const [promoCode, setPromoCodeState] = useState<PromoCode>({ code: 'LOGIFY10', discountPercent: 10 });
  const [services, setServicesState] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [announcements, setAnnouncementsState] = useState<Announcement[]>([]);

  const fetchData = async () => {
    if (!supabase) return;

    try {
      const { data: settingsData } = await supabase.from('settings').select('*').single();
      if (settingsData) {
        setOrderStatusState(settingsData.order_status as OrderStatus);
        setPromoCodeState({
          code: settingsData.promo_code,
          discountPercent: settingsData.discount_percent
        });
      }

      const { data: servicesData } = await supabase.from('services').select('*').order('id', { ascending: true });
      if (servicesData) {
        setServicesState(servicesData as ServiceItem[]);
      }

      const { data: announcementsData } = await supabase.from('announcements').select('*').order('timestamp', { ascending: false });
      if (announcementsData) {
        setAnnouncementsState(announcementsData as Announcement[]);
      }
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
    }
  };

  useEffect(() => {
    fetchData();

    if (!supabase) return;

    const settingsChannel = supabase
      .channel('public:settings')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'settings' }, (payload) => {
        const newData = payload.new;
        setOrderStatusState(newData.order_status as OrderStatus);
        setPromoCodeState({
          code: newData.promo_code,
          discountPercent: newData.discount_percent
        });
      })
      .subscribe();

    const servicesChannel = supabase
      .channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, async () => {
        const { data } = await supabase.from('services').select('*').order('id', { ascending: true });
        if (data) setServicesState(data as ServiceItem[]);
      })
      .subscribe();

    const announcementsChannel = supabase
      .channel('public:announcements')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, async () => {
        const { data } = await supabase.from('announcements').select('*').order('timestamp', { ascending: false });
        if (data) setAnnouncementsState(data as Announcement[]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(settingsChannel);
      supabase.removeChannel(servicesChannel);
      supabase.removeChannel(announcementsChannel);
    };
  }, []);

  const setOrderStatus = async (status: OrderStatus) => {
    setOrderStatusState(status);
    if (!supabase) return;

    await supabase.from('settings').update({ order_status: status }).eq('id', 1);
  };

  const setPromoCode = async (promo: PromoCode) => {
    setPromoCodeState(promo);
    if (!supabase) return;

    await supabase
      .from('settings')
      .update({
        promo_code: promo.code,
        discount_percent: promo.discountPercent
      })
      .eq('id', 1);
  };

  const updateService = async (id: number, updates: Partial<ServiceItem>) => {
    setServicesState((prev) => prev.map((service) => (service.id === id ? { ...service, ...updates } : service)));
    if (!supabase) return;

    const dbUpdates: Record<string, unknown> = { ...updates };
    if (updates.isComingSoon !== undefined) {
      dbUpdates.is_coming_soon = updates.isComingSoon;
      delete dbUpdates.isComingSoon;
    }

    await supabase.from('services').update(dbUpdates).eq('id', id);
  };

  const setAnnouncements = async (newAnnouncements: Announcement[]) => {
    setAnnouncementsState(newAnnouncements);
  };

  const addAnnouncement = async (message: string) => {
    if (!supabase) {
      const localAnnouncement: Announcement = {
        id: Date.now(),
        message,
        timestamp: new Date().toISOString()
      };
      setAnnouncementsState((prev) => [localAnnouncement, ...prev]);
      return;
    }

    const { error } = await supabase.from('announcements').insert([{ message }]);
    if (error) console.error(error);
  };

  const deleteAnnouncement = async (id: number) => {
    if (!supabase) {
      setAnnouncementsState((prev) => prev.filter((announcement) => announcement.id !== id));
      return;
    }

    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) console.error(error);
  };

  return (
    <AppContext.Provider
      value={{
        orderStatus,
        setOrderStatus,
        promoCode,
        setPromoCode,
        services,
        updateService,
        announcements,
        setAnnouncements,
        addAnnouncement,
        deleteAnnouncement
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
