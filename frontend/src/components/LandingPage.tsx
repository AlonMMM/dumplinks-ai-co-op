import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Auth } from './Auth';
import type { User } from '../types';
import * as authService from '../services/authService';

interface LandingPageProps {
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
}

type AuthModalMode = 'login' | 'register' | null;

// ── Auth Modal ────────────────────────────────────────────────────────────────
const AuthModal: React.FC<{
  mode: 'login' | 'register';
  initialEmail?: string;
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  onClose: () => void;
}> = ({ mode, initialEmail, onLogin, onRegister, onClose }) => {
  // Close on backdrop click or Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-primary/10 p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <Auth
          onLogin={onLogin}
          onRegister={onRegister}
          initialMode={mode}
          initialEmail={initialEmail}
        />
      </div>
    </div>
  );
};

// ── Main Landing Page ─────────────────────────────────────────────────────────
export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onRegister }) => {
  const [authModal, setAuthModal] = useState<AuthModalMode>(null);
  const [heroEmail, setHeroEmail] = useState('');
  const [ctaEmail, setCtaEmail] = useState('');
  const [googleError, setGoogleError] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setGoogleError(null);
      try {
        const user = await authService.googleLogin(access_token);
        onLogin(user);
      } catch {
        setGoogleError('Google sign-in failed. Please try again.');
      }
    },
    onError: () => setGoogleError('Google sign-in failed.'),
  });

  const openModal = (mode: 'login' | 'register', email?: string) => {
    if (email) setHeroEmail(email);
    setAuthModal(mode);
  };

  return (
    <div className="bg-surface-container-lowest font-body text-on-surface scroll-smooth">

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-headline font-bold tracking-tighter text-[#5D4AC5]">
            Dumplinks
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Chrome Extension'].map(label => (
              <a
                key={label}
                href="#"
                className="text-zinc-600 font-medium hover:text-[#5D4AC5] transition-colors duration-300 font-headline"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('login')}
              className="px-5 py-2 text-zinc-700 border border-zinc-900 rounded-full font-headline font-bold text-sm hover:bg-zinc-50 active:scale-95 transition-all"
            >
              Login
            </button>
            <button
              onClick={() => openModal('register')}
              className="px-5 py-2 bg-primary-container text-on-primary-container rounded-full font-headline font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 transition-all hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">

        {/* ── Hero ── */}
        <section className="max-w-7xl mx-auto px-8 text-center mb-32">
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-on-surface mb-6 leading-tight">
            Stop Saving Links. <br />
            Start Building Your{' '}
            <span className="text-[#5D4AC5] italic">External Brain.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-body">
            Dumplinks automatically translates messy URLs into structured, actionable intelligence, instantly.
          </p>

          {/* Email + CTA */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-6">
            <input
              type="email"
              value={heroEmail}
              onChange={e => setHeroEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full h-14 px-6 rounded-full border border-zinc-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5D4AC5]/30 font-body text-lg"
            />
            <button
              onClick={() => openModal('register', heroEmail)}
              className="w-full md:w-auto h-14 px-8 bg-primary-container text-on-primary-container font-headline font-bold rounded-full flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Try it Free
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Google sign-in */}
          <button
            onClick={() => googleLogin()}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-zinc-900 rounded-full font-headline font-bold text-sm hover:bg-zinc-50 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            Or sign in with Google
          </button>
          {googleError && (
            <p className="mt-3 text-sm text-red-500">{googleError}</p>
          )}
        </section>

        {/* ── Section 2: From Chaos to Cohesion ── */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-bold mb-4 tracking-tight">From Chaos to Cohesion.</h2>
            <p className="text-lg text-on-surface-variant font-body">
              We automatically detect the content type and extract what matters.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Chaos side */}
            <div className="flex-1 rounded-[32px] bg-zinc-50 p-8 overflow-hidden relative border border-zinc-100 min-h-[400px]">
              <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
              <span className="inline-block px-3 py-1 bg-zinc-200 rounded-full text-[10px] font-headline font-bold tracking-widest uppercase mb-6">
                Traditional Browser
              </span>
              <div className="space-y-3 opacity-60">
                {[48, 32, 64, 40].map((w, i) => (
                  <div
                    key={i}
                    className={`h-10 bg-white rounded-lg border border-zinc-200 flex items-center px-4 gap-3 ${i === 2 ? 'translate-x-4' : ''}`}
                  >
                    <div className="w-4 h-4 bg-zinc-300 rounded-sm flex-shrink-0"></div>
                    <div className={`w-${w} h-2 bg-zinc-200 rounded`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center py-4 lg:py-0">
              <span className="material-symbols-outlined text-4xl text-[#5D4AC5] font-bold">arrow_right_alt</span>
            </div>

            {/* Dumplinks side */}
            <div className="flex-[1.5] rounded-[32px] bg-white p-8 border border-outline-variant shadow-2xl shadow-primary/5">
              <div className="flex items-center justify-between mb-8">
                <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-headline font-bold tracking-widest uppercase">
                  Dumplinks Workspace
                </span>
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-zinc-100"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-100"></span>
                  <span className="w-3 h-3 rounded-full bg-zinc-100"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Recipe card */}
                <div className="group relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-lg hover:scale-[1.02] transition-transform">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3NKf9oSFanS2_T4XTv0oRze2X8YBlBSGu6qTVdankU2wchOY9vLsSdLbLMxu7KdxSylfUO1eBXDn9lvoxix7Y1NaP4E4tvhdys6cW4BV5h47KT5-6gLEbfNtuo0EyKoiA_rJONpS2n8QH3QIkCx7_uLJsOQytBHJSW-fauZw9ce9M8wuR2LVO8Xjrdf_ZC3JrofqLMJIQoexrrCAHSmINS28EJl62kVu-7Gl_dq14mgET3xCX1eITH4El0FFd2qGjEyGiZMv6xw"
                    alt="Avocado toast"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">restaurant</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="font-headline font-bold text-white text-lg leading-tight mb-1">Perfect Avocado Toast</h4>
                    <p className="text-[#e78152] font-headline font-bold text-xs tracking-wide uppercase">NYT Cooking</p>
                  </div>
                </div>

                {/* Product card */}
                <div className="group relative rounded-[24px] overflow-hidden aspect-square shadow-lg hover:scale-[1.02] transition-transform">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmCb7JaNNdtx9Zq8cwpKC4EC6XIEMGIP1Jo80LdjFZZuxOQ8tqmnnMtGQcmob6gPMU0P4c1aaesXY-qaGfDxZcli1KqPP7K11kuKiyhcMDryQ9I_Dgc1KO1adNsNcPJSKDQ5vYPQKf8djiwlyoBFfuk1zhwxxWTaug0KVk1UWacHZmichdKZYAa3eyVhJbuum1Li8GyULh47arXNEvCZy2CHYQhmYRSnTokPSXklBL9GZbw5fsRb2PioqUQJMdqzYD8j0Skz8vnw"
                    alt="Headphones"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">shopping_bag</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="font-headline font-bold text-white text-lg leading-tight mb-1">Studio Monitor H-1</h4>
                    <p className="text-[#e78152] font-headline font-bold text-xs tracking-wide uppercase">Amazon Store</p>
                  </div>
                </div>

                {/* Article card */}
                <div className="md:col-span-2 group relative rounded-[24px] overflow-hidden shadow-lg hover:scale-[1.02] transition-transform" style={{ aspectRatio: '16/7' }}>
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwO7GewknCev6YajeC6FdFtJ5AMI2IuVhBPDvZMaiJHqCjkFJJPMXTnLEWWXxJL78MYofpM6bGVhT_og-PzAMKT7mZBXD50k7yLSYOMGBSCATaFGVP5J4IQ7imQqDBrllW8rf94UoiksD1UEh5N4Zmwcw0GpT7C7ERJ6k0aUyqrlrBfsYqHhQb32cgtgn8ZN8jBs5ouCqiO0CrjU1ZzvuLh2buS0x4Ljnm0fNJp07fHVbLd4nw4VVZNlmbfN_NgS-sJqJV27zSgA"
                    alt="Neural network"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">description</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="font-headline font-bold text-white text-xl leading-tight mb-1">The Future of Neural Computing</h4>
                    <p className="text-[#e78152] font-headline font-bold text-xs tracking-wide uppercase">Wired Magazine</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Features ── */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'auto_fix_high',
                title: 'STRUCTURED INTELLIGENCE',
                body: 'No more dead links. We scrape and store metadata, text, and images from every URL you drop.',
              },
              {
                icon: 'search',
                title: 'SEAMLESS RETRIEVAL',
                body: 'Universal semantic search lets you find that "blue shoe from Tuesday" even if you forgot the title.',
              },
              {
                icon: 'folder_open',
                title: 'COLLECTION MANAGEMENT',
                body: "Automated folders and smart tags organize your research so you don't have to spend hours sorting.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="p-10 rounded-[32px] border border-zinc-100 bg-surface-container-lowest hover:border-[#5D4AC5]/20 transition-colors group"
              >
                <div className="w-14 h-14 bg-secondary-container/30 rounded-[20px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-3xl">{icon}</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-4 tracking-tight">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: Final CTA ── */}
        <section className="max-w-5xl mx-auto px-8 mb-32 text-center bg-[#5D4AC5] rounded-[48px] py-20 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-secondary rounded-full opacity-10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white rounded-full opacity-10 blur-3xl pointer-events-none"></div>

          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 tracking-tight relative z-10">
            Ready to clear the clutter?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto relative z-10">
            Join 50,000+ knowledge workers building their external brain with Dumplinks.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-10 relative z-10">
            <input
              type="email"
              value={ctaEmail}
              onChange={e => setCtaEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full h-14 px-6 rounded-full border-transparent bg-white/10 backdrop-blur-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-secondary font-body text-lg"
            />
            <button
              onClick={() => openModal('register', ctaEmail)}
              className="w-full md:w-auto h-14 px-8 bg-white text-[#5D4AC5] font-headline font-bold rounded-full flex items-center justify-center gap-2 whitespace-nowrap shadow-xl hover:scale-105 transition-transform"
            >
              Try it Free
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="relative z-10">
            <p className="text-[10px] font-headline font-bold tracking-[0.2em] uppercase opacity-60 mb-6">
              As featured on...
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale invert">
              <span className="font-headline font-extrabold text-2xl tracking-tighter">The Verge</span>
              <span className="font-headline font-bold text-xl italic">The New York Times</span>
              <span className="font-headline font-black text-xl">Product Hunt</span>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-zinc-200 bg-zinc-50">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="font-headline font-bold text-lg text-[#5D4AC5]">Dumplinks</div>
            <p className="font-body text-sm text-zinc-500">© 2024 Dumplinks. Built for the organized mind.</p>
          </div>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Twitter', 'Status'].map(link => (
              <a
                key={link}
                href="#"
                className="text-zinc-500 font-body text-sm hover:underline decoration-secondary transition-opacity opacity-80 hover:opacity-100"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Auth Modal ── */}
      {authModal && (
        <AuthModal
          mode={authModal}
          initialEmail={heroEmail || ctaEmail}
          onLogin={onLogin}
          onRegister={onRegister}
          onClose={() => setAuthModal(null)}
        />
      )}
    </div>
  );
};
