import Image from 'next/image';
import Link from 'next/link';
import { SERVICES } from '../data';
import { ArrowRightIcon, getServiceIcon } from '../Icons';
import { useT } from '../../../hooks/useT';

const TrustBadgeIcons: Record<string, React.ReactNode> = {
  certified: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange">
      <circle cx="12" cy="8" r="6"/><path d="M9 21v-3.5a3 3 0 016 0V21M7 21h10"/><path d="M9 8l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  scheduled: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="12" cy="16" r="2"/><path d="M12 14v-2M16 16h-2"/>
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="12" cy="15" r="2"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange">
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.76 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
};

const Services: React.FC = () => {
  const t = useT();

  return (
    <section id="services" className="al-section bg-gray-50">
      <div className="al-container">
        <div className="text-center mb-14">
          <p className="al-eyebrow mb-3">{t.services.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4">{t.services.heading}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">{t.services.subheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="al-card group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image} alt={t.services.items[i]?.title ?? service.title}
                  fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 start-4 z-10 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center border border-gray-100">
                  {getServiceIcon(service.icon, 'w-6 h-6 text-navy')}
                </div>
              </div>
              <div className="px-6 pt-4 pb-6">
                <h3 className="text-lg font-bold text-navy mb-2">{t.services.items[i]?.title ?? service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{t.services.items[i]?.description ?? service.description}</p>
                <Link href={service.href} className="learn-more-link">
                  {t.services.learnMore} <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {t.services.trust.map((badge) => (
            <div key={badge.key} className="bg-white px-6 py-6 flex items-start gap-4">
              <div className="shrink-0 mt-0.5">{TrustBadgeIcons[badge.key]}</div>
              <div>
                <div className="font-bold text-navy text-sm mb-1">{badge.title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
