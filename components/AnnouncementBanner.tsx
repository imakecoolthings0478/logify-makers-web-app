import React from 'react';
import { useAppStore } from '../context/AppContext';
import { Bell } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { announcements } = useAppStore();

  if (announcements.length === 0) return null;

  const latest = announcements[0];

  return (
    <div className="relative z-50 overflow-hidden border-b border-indigo-500/30 bg-gradient-to-r from-indigo-900 to-purple-900 px-4 py-3 text-white shadow-lg animate-slide-down">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50 animate-pulse" />
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <div className="rounded-full bg-indigo-800/50 p-1.5 animate-pulse">
          <Bell className="h-4 w-4 flex-shrink-0 text-yellow-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium leading-snug md:text-base">
            <span className="mr-2 inline-block rounded border border-indigo-400/30 bg-indigo-500/30 px-1.5 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-indigo-200">
              Update
            </span>
            {latest.message}
          </p>
          <p className="mt-1 font-mono text-[10px] text-indigo-300 opacity-70">{new Date(latest.timestamp).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};
