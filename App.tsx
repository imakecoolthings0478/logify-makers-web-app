import React, { useState } from 'react';
import { AppProvider, useAppStore } from './context/AppContext';
import { StatusBadge } from './components/StatusBadge';
import { ServiceCard } from './components/ServiceCard';
import { AdminPanel } from './components/AdminPanel';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { DISCORD_LINK, ADMIN_PASSCODE, TERMS_CONDITIONS } from './constants';
import { OrderStatus } from './types';
import { Lock, Disc, X, Check, ArrowRight, Hexagon, Zap, ArrowDown, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-900 p-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Terms of Service</h2>
          <button onClick={onClose} className="text-zinc-500 transition-colors hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-8">
          <ol className="list-decimal space-y-4 pl-5 font-light text-zinc-400">
            {TERMS_CONDITIONS.map((term, index) => (
              <li key={index} className="pl-2 leading-relaxed">
                {term.includes('Strictly Prohibited') ? (
                  <span>
                    {term.replace('Strictly Prohibited', '')}
                    <span className="font-bold text-rose-500">STRICTLY PROHIBITED</span>
                  </span>
                ) : (
                  term
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-b-3xl border-t border-zinc-900 bg-zinc-900/30 p-8">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white py-4 font-bold text-black transition-all hover:bg-zinc-200"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

const Background = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 opacity-20 mix-blend-overlay" />
    <div className="absolute left-[-10%] top-[-20%] h-[50vw] w-[50vw] rounded-full bg-violet-800/30 blur-[120px] mix-blend-screen animate-pulse-slow" />
    <div className="absolute bottom-[-10%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-indigo-800/20 blur-[100px] mix-blend-screen" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
  </div>
);

const WhyUsSection = () => (
  <section className="relative z-10 border-t border-white/5 bg-black/30 px-6 py-24 backdrop-blur-sm">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight">Why Choose Logify?</h2>
        <p className="mx-auto max-w-2xl text-zinc-400">
          Fast delivery, clean design, and a straightforward process from start to finish.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {[
          {
            icon: <Clock className="h-8 w-8 text-violet-400" />,
            title: 'Quick Turnaround',
            desc: 'We keep things moving and aim to deliver on time without rushing the work.'
          },
          {
            icon: <ShieldCheck className="h-8 w-8 text-emerald-400" />,
            title: 'Reliable Quality',
            desc: 'Each order gets the same attention to detail, whether it is a logo, banner, or thumbnail.'
          },
          {
            icon: <HeartHandshake className="h-8 w-8 text-rose-400" />,
            title: 'Clear Communication',
            desc: 'You get updates, honest timelines, and a smoother experience while your order is being handled.'
          }
        ].map((item, idx) => (
          <div key={idx} className="group rounded-3xl border border-white/5 bg-zinc-900/40 p-8 transition-all hover:-translate-y-1 hover:bg-zinc-900/60">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-transform duration-500 group-hover:scale-110">
              {item.icon}
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const UserView: React.FC<{ onAdminRequest: () => void }> = ({ onAdminRequest }) => {
  const { orderStatus, promoCode, services } = useAppStore();
  const [userCode, setUserCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [showTerms, setShowTerms] = useState(false);
  const [promoStatus, setPromoStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleApplyCode = () => {
    if (userCode.trim() === promoCode.code) {
      setAppliedDiscount(promoCode.discountPercent);
      setPromoStatus('SUCCESS');
    } else {
      setAppliedDiscount(0);
      setPromoStatus('ERROR');
      setTimeout(() => setPromoStatus('IDLE'), 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCode(e.target.value.toUpperCase());
    if (promoStatus !== 'IDLE') setPromoStatus('IDLE');
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden font-sans text-white selection:bg-violet-500/30 selection:text-white">
      <Background />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />

      <div className="fixed left-0 right-0 top-0 z-50 flex flex-col items-center">
        <div className="w-full">
          <AnnouncementBanner />
        </div>
        <nav className="mt-6 px-6">
          <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/50 px-6 py-3 shadow-2xl backdrop-blur-xl">
            <span className="flex items-center gap-2 font-bold tracking-tight text-white">
              <Hexagon className="h-5 w-5 fill-white text-white" />
              LOGIFY
            </span>
            <div className="h-4 w-px bg-white/20" />
            <a href={DISCORD_LINK} target="_blank" rel="noreferrer" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Discord
            </a>
            <button onClick={() => setShowTerms(true)} className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              Terms
            </button>
          </div>
        </nav>
      </div>

      <header className="relative z-10 px-6 pb-20 pt-40">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <StatusBadge />
          </div>

          <h1 className="mb-8 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-6xl font-black tracking-tighter text-transparent animate-fade-in-up delay-100 md:text-9xl">
            LOGOS.<br />BANNERS.
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-zinc-400 animate-fade-in-up delay-200">
            Design help for creators, channels, and small brands that want sharp visuals without the usual back-and-forth.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in-up delay-300 sm:flex-row">
            {orderStatus !== OrderStatus.DOWN ? (
              <a
                href={DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:scale-105"
              >
                <div className="absolute inset-0 translate-y-full bg-violet-200 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2">
                  <Disc className="h-5 w-5" />
                  Join the Server
                </span>
              </a>
            ) : (
              <button disabled className="cursor-not-allowed rounded-full bg-zinc-800 px-8 py-4 font-bold text-zinc-500">
                Systems Offline
              </button>
            )}

            <button
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/20 bg-transparent px-8 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              View Catalog
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ArrowDown className="h-6 w-6 text-zinc-500" />
        </div>
      </header>

      <WhyUsSection />

      <section id="catalog" className="relative z-10 border-t border-white/5 bg-black/50 px-6 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex justify-center">
            <div className="group relative">
              <div
                className={`absolute -inset-1 rounded-full blur opacity-25 transition duration-1000 group-hover:opacity-50 group-hover:duration-200 ${
                  promoStatus === 'SUCCESS' ? 'bg-emerald-600' : promoStatus === 'ERROR' ? 'bg-rose-600' : 'bg-violet-600'
                }`}
              />

              <div
                className={`relative flex items-center gap-3 rounded-full border bg-black/80 p-2 pl-6 pr-2 transition-all duration-300 backdrop-blur-xl ${
                  promoStatus === 'ERROR'
                    ? 'border-rose-500/50'
                    : promoStatus === 'SUCCESS'
                      ? 'border-emerald-500/50'
                      : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <Zap className={`h-5 w-5 ${promoStatus === 'SUCCESS' ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <input
                  type="text"
                  placeholder="Promo code"
                  value={userCode}
                  onChange={handleInputChange}
                  className="w-48 bg-transparent text-center font-mono text-base uppercase tracking-wide text-white placeholder-zinc-600 outline-none"
                />
                <button
                  onClick={handleApplyCode}
                  className={`rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all ${
                    promoStatus === 'SUCCESS' ? 'bg-emerald-500 text-black shadow-emerald-900/20' : 'bg-white text-black shadow-white/10 hover:bg-zinc-200'
                  }`}
                >
                  {promoStatus === 'SUCCESS' ? <Check className="h-4 w-4" /> : 'Apply'}
                </button>
              </div>

              {promoStatus === 'SUCCESS' && (
                <div className="absolute left-0 right-0 top-full mt-4 text-center animate-fade-in-up">
                  <span className="inline-block rounded border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
                    {appliedDiscount}% discount applied
                  </span>
                </div>
              )}
              {promoStatus === 'ERROR' && (
                <div className="absolute left-0 right-0 top-full mt-4 text-center animate-fade-in-up">
                  <span className="inline-block rounded border border-rose-500/20 bg-rose-500/10 px-3 py-1 font-mono text-xs text-rose-400">
                    Code not found
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">The Catalog</h2>
            <p className="text-zinc-500">Pick a service and contact us on Discord to get started.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, idx) => (
              <ServiceCard key={service.id} service={service} appliedDiscount={appliedDiscount} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-900 bg-black px-6 py-12 text-center">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
          <Hexagon className="h-8 w-8 text-zinc-800" />
          <p className="text-sm text-zinc-600">&copy; {new Date().getFullYear()} Logify Makers. Est. 2024.</p>
        </div>

        <div className="fixed bottom-0 right-0 z-50 p-4 opacity-0 transition-opacity hover:opacity-100">
          <button onClick={onAdminRequest} className="rounded-lg bg-zinc-900 p-2 text-zinc-500">
            <Lock className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

const AuthGate: React.FC<{ onSuccess: () => void; onCancel: () => void }> = ({ onSuccess, onCancel }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASSCODE) {
      onSuccess();
    } else {
      setError(true);
      setPass('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm">
        <button onClick={onCancel} className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white">
          <ArrowRight className="h-4 w-4 rotate-180" />
          Return to Site
        </button>

        <h2 className="mb-2 text-3xl font-bold text-white">Admin Sign In</h2>
        <p className="mb-8 text-zinc-500">Enter the passcode to open the admin panel.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError(false);
            }}
            className={`w-full rounded-xl border bg-zinc-900 p-4 text-center tracking-widest text-white transition-all focus:outline-none ${error ? 'border-rose-500' : 'border-zinc-800 focus:border-white'}`}
            placeholder="Enter passcode"
            autoFocus
          />
          <button type="submit" className="w-full rounded-xl bg-white py-4 font-bold text-black transition-colors hover:bg-zinc-200">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

const Main = () => {
  const [view, setView] = useState<'USER' | 'AUTH' | 'ADMIN'>('USER');
  const [opacity, setOpacity] = useState(1);

  const handleViewChange = (newView: 'USER' | 'AUTH' | 'ADMIN') => {
    setOpacity(0);
    setTimeout(() => {
      setView(newView);
      setOpacity(1);
    }, 300);
  };

  return (
    <div className="min-h-screen transition-opacity duration-300 ease-in-out" style={{ opacity }}>
      {view === 'USER' && <UserView onAdminRequest={() => handleViewChange('AUTH')} />}
      {view === 'AUTH' && <AuthGate onSuccess={() => handleViewChange('ADMIN')} onCancel={() => handleViewChange('USER')} />}
      {view === 'ADMIN' && <AdminPanel onLogout={() => handleViewChange('USER')} />}
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
