import Image from 'next/image';
import Link from 'next/link';
import { ALAYAY_BRAND } from '../data';
import { ArrowRightIcon, CalendarIcon } from '../Icons';
import { useT } from '../../../hooks/useT';

const BADGE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
];

const Hero: React.FC = () => {
  const t = useT();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/alayay/bg-banner.png"
          alt="Professional villa maintenance services"
          fill priority sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 al-container w-full pt-8 pb-16">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
          <span className="text-white text-xs font-semibold tracking-widest uppercase">{t.hero.badge}</span>
        </div>

        <h1 className="text-white font-bold leading-[1.05] mb-6 animate-fade-up" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
          {t.hero.line1}<br />
          <span className="text-orange">{t.hero.line2}</span><br />
          {t.hero.line3}
        </h1>

        <p className="text-white/75 text-base lg:text-lg max-w-lg mb-10 animate-fade-up leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap gap-4 animate-fade-up mb-16">
          <a
            href={ALAYAY_BRAND.whatsapp}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-orange text-white font-semibold px-7 py-4 rounded-full hover:bg-orange-hover transition-all duration-200 text-sm shadow-lg shadow-orange/30"
          >
            {t.hero.bookBtn}
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2.5 border-2 border-white/50 text-white font-semibold px-7 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-200 text-sm"
          >
            <CalendarIcon className="w-4 h-4" />
            {t.hero.inspectBtn}
          </Link>
        </div>

        <div className="inline-flex flex-wrap gap-px bg-white/10 rounded-2xl p-1 backdrop-blur-sm border border-white/10">
          {t.hero.badges.map((b, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3.5 text-white">
              <div className="text-white/70">{BADGE_ICONS[i]}</div>
              <div className="leading-tight">
                <div className="font-bold text-sm">{b.label}</div>
                <div className="text-white/60 text-xs">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
