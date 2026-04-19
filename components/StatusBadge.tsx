
import React from 'react';
import { useAppStore } from '../context/AppContext';
import { OrderStatus } from '../types';

export const StatusBadge: React.FC = () => {
  const { orderStatus } = useAppStore();

  const getStatusColor = () => {
    switch (orderStatus) {
      case OrderStatus.ACCEPTING:
        return 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]';
      case OrderStatus.NOT_ACCEPTING:
        return 'bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]';
      case OrderStatus.DOWN:
        return 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 ring-1 ring-black/20">
      <div className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor()}`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${getStatusColor()}`}></span>
      </div>
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/80">
        {orderStatus}
      </span>
    </div>
  );
};
