import React, { useState } from 'react';
import { useAppStore } from '../context/AppContext';
import { OrderStatus } from '../types';
import { Shield, Tag, Activity, LogOut, Power, Save, Megaphone, Trash2 } from 'lucide-react';

export const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const {
    orderStatus,
    setOrderStatus,
    promoCode,
    setPromoCode,
    services,
    updateService,
    announcements,
    addAnnouncement,
    deleteAnnouncement
  } = useAppStore();

  const [promoCodeInput, setPromoCodeInput] = useState(promoCode.code);
  const [discountInput, setDiscountInput] = useState(promoCode.discountPercent.toString());
  const [announcementInput, setAnnouncementInput] = useState('');

  const handleUpdatePromo = () => {
    const discount = parseInt(discountInput, 10);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      alert('Discount must be between 0 and 100');
      return;
    }

    setPromoCode({ code: promoCodeInput, discountPercent: discount });
    alert('Promo code updated.');
  };

  const handlePostAnnouncement = () => {
    if (!announcementInput.trim()) return;
    addAnnouncement(announcementInput);
    setAnnouncementInput('');
  };

  const handleDeleteAnnouncement = (id: number) => {
    deleteAnnouncement(id);
  };

  return (
    <div className="min-h-screen bg-black p-6 font-sans text-white">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-zinc-900 pb-8 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
              <Shield className="h-8 w-8 text-violet-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter text-white">Admin Panel</h1>
              <p className="font-mono text-sm uppercase tracking-widest text-zinc-500">Restricted access</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3 text-zinc-400 transition-all hover:border-rose-900/50 hover:bg-rose-950/30 hover:text-rose-400"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </button>
        </div>

        <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8">
          <div className="mb-8 flex items-center gap-3">
            <Megaphone className="h-5 w-5 text-zinc-500" />
            <h2 className="text-xl font-bold">Live Announcements</h2>
          </div>

          <div className="mb-6 flex gap-4">
            <input
              type="text"
              value={announcementInput}
              onChange={(e) => setAnnouncementInput(e.target.value)}
              placeholder="Type a new announcement..."
              className="flex-1 rounded-xl border border-zinc-800 bg-black/50 p-4 text-white focus:border-violet-500 focus:outline-none"
            />
            <button
              onClick={handlePostAnnouncement}
              className="rounded-xl bg-white px-6 font-bold text-black transition-colors hover:bg-violet-200"
            >
              Post
            </button>
          </div>

          {announcements.length > 0 && (
            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black/40 p-4">
                  <div>
                    <p className="font-medium text-zinc-200">{announcement.message}</p>
                    <p className="mt-1 text-xs text-zinc-500">{new Date(announcement.timestamp).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                    className="rounded-lg p-2 text-zinc-600 transition-colors hover:bg-rose-500/10 hover:text-rose-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8 lg:col-span-1">
            <div className="mb-8 flex items-center gap-3">
              <Activity className="h-5 w-5 text-zinc-500" />
              <h2 className="text-xl font-bold">System Status</h2>
            </div>
            <div className="space-y-3">
              {(Object.values(OrderStatus) as OrderStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderStatus(status)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all duration-300 ${
                    orderStatus === status
                      ? 'border-violet-500 bg-violet-600 shadow-lg shadow-violet-900/20'
                      : 'border-zinc-800 bg-black/40 text-zinc-500 hover:border-zinc-700'
                  }`}
                >
                  <span className={`font-semibold ${orderStatus === status ? 'text-white' : ''}`}>{status}</span>
                  <div className={`h-2 w-2 rounded-full ${orderStatus === status ? 'animate-pulse bg-white' : 'bg-zinc-700'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8 lg:col-span-2">
            <div className="mb-8 flex items-center gap-3">
              <Tag className="h-5 w-5 text-zinc-500" />
              <h2 className="text-xl font-bold">Promo Settings</h2>
            </div>

            <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Active Code</label>
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-zinc-800 bg-black/50 p-4 font-mono text-lg uppercase text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-zinc-500">Discount Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-black/50 p-4 font-mono text-lg text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpdatePromo}
                className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-violet-200"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-zinc-900/30 p-8">
          <h2 className="mb-8 text-xl font-bold">Service Catalog</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service.id} className="group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-black/40 p-5 transition-colors hover:border-zinc-700">
                <div className="flex justify-between">
                  <span className="font-semibold text-zinc-300">{service.name}</span>
                  <span className="font-mono text-xs text-zinc-600">#{service.id}</span>
                </div>

                <div className="flex-1">
                  <label className="mb-1 block text-[10px] uppercase tracking-wider text-zinc-500">Price ({service.currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={service.price}
                    onChange={(e) => updateService(service.id, { price: parseInt(e.target.value, 10) || 0 })}
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-sm text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => updateService(service.id, { isComingSoon: !service.isComingSoon })}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                    service.isComingSoon
                      ? 'border border-amber-500/20 bg-amber-500/10 text-amber-500'
                      : 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  <Power className="h-3 w-3" />
                  {service.isComingSoon ? 'Unavailable' : 'Live'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
