import React from 'react';
import { ServiceItem } from '../types';
import { Sparkles, Clock, ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
  appliedDiscount: number;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, appliedDiscount, index }) => {
  const hasDiscount = appliedDiscount > 0 && !service.isComingSoon;
  const originalPrice = service.price;
  const discountedPrice = hasDiscount ? Math.round(originalPrice * (1 - appliedDiscount / 100)) : originalPrice;

  return (
    <div
      className={`group relative rounded-2xl p-1 transition-all duration-500 ease-out hover:-translate-y-1 ${
        service.isComingSoon ? 'opacity-60 grayscale' : 'hover:shadow-2xl hover:shadow-violet-500/20'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-100 transition-all duration-500 group-hover:from-violet-500/50 group-hover:to-fuchsia-500/50" />

      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-zinc-950/90 p-6 backdrop-blur-xl">
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-violet-600/20 blur-[60px] transition-all duration-500 group-hover:bg-violet-500/30" />

        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-xl font-bold tracking-tight text-white transition-all group-hover:bg-gradient-to-r group-hover:from-violet-200 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent">
              {service.name}
            </h3>
            {service.isComingSoon ? (
              <Clock className="h-5 w-5 text-zinc-600" />
            ) : (
              <div className="rounded-lg bg-white/5 p-2 transition-colors group-hover:bg-violet-500/20">
                <Sparkles className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-violet-300" />
              </div>
            )}
          </div>

          <div className="my-4 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

          <div className="flex items-end justify-between">
            <div>
              {service.isComingSoon ? (
                <span className="rounded border border-zinc-800 px-2 py-1 font-mono text-sm text-zinc-500">SOON</span>
              ) : (
                <div className="flex flex-col">
                  {hasDiscount && <span className="mb-1 text-xs text-zinc-500 line-through">{service.currency}{originalPrice}</span>}
                  <span className={`font-mono text-2xl font-bold tracking-tighter ${hasDiscount ? 'text-emerald-400' : 'text-white'}`}>
                    {service.currency}{discountedPrice}
                  </span>
                </div>
              )}
            </div>

            {!service.isComingSoon && (
              <div className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5 text-zinc-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
