import Image from 'next/image';
import Link from 'next/link';
import { ALAYAY_BRAND } from '../data';
import { ArrowRightIcon, CalendarIcon } from '../Icons';
import { useT } from '../../../hooks/useT';
import { useCms } from '../../../contexts/cms';

const BADGE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
];

const Hero: React.FC = () => {
  const t = useT();
  const { brand } = useCms();
  const whatsapp = brand.whatsapp ?? ALAYAY_BRAND.whatsapp;

  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="relative grid lg:grid-cols-2 min-h-[640px] lg:h-[calc(100vh-5rem)]">
        {/* Text panel */}
        <div className="relative z-10 flex flex-col justify-center al-container lg:!px-0 lg:ps-8 xl:ps-16 lg:pe-10 py-14 lg:py-0 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-navy/5 border border-navy/15 rounded-full px-4 py-1.5 mb-8 w-fit animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
            <span className="text-navy text-xs font-semibold tracking-widest uppercase">{t.hero.badge}</span>
          </div>

          <h1 className="text-navy font-bold leading-[1.05] mb-6 animate-fade-up" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.75rem)' }}>
            {t.hero.line1}<br />
            <span className="text-orange">{t.hero.line2}</span><br />
            {t.hero.line3}
          </h1>

          <p className="text-gray-600 text-base lg:text-lg max-w-lg mb-10 animate-fade-up leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up mb-14">
            <a
              href={whatsapp}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-orange text-white font-semibold px-7 py-4 rounded-full hover:bg-orange-hover transition-all duration-200 text-sm shadow-lg shadow-orange/25"
            >
              {t.hero.bookBtn}
              <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 border-2 border-navy/30 text-navy font-semibold px-7 py-4 rounded-full hover:bg-navy hover:text-white hover:border-navy transition-all duration-200 text-sm"
            >
              <CalendarIcon className="w-4 h-4" />
              {t.hero.inspectBtn}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 w-fit">
            {t.hero.badges.map((b, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-xl shadow-sm">
                <div className="text-navy/60">{BADGE_ICONS[i]}</div>
                <div className="leading-tight">
                  <div className="font-bold text-sm text-navy">{b.label}</div>
                  <div className="text-gray-500 text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo panel */}
        <div className="relative min-h-[280px] lg:min-h-0 order-1 lg:order-2 lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]">
          <Image
            src="/images/alayay/bg-banner.png"
            alt="Professional villa maintenance services"
            fill priority sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
