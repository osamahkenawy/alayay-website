import Link from 'next/link';
import { ArrowRightIcon, ShieldIcon } from '../Icons';
import { useT } from '../../../hooks/useT';

const FEATURE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><circle cx="19" cy="7" r="2"/><path d="M23 21v-2a4 4 0 00-2-3.65"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
  <svg key="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.76 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
];

const WhyUs: React.FC = () => {
  const t = useT();

  return (
    <section className="al-section bg-white">
      <div className="al-container">
        <div className="text-center mb-16">
          <p className="al-eyebrow mb-4">{t.whyUs.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-5">
            {t.whyUs.heading1}{' '}
            <span className="text-orange">{t.whyUs.heading2}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">{t.whyUs.body}</p>
        </div>

        <div className="bg-navy rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <p className="al-eyebrow mb-3">{t.whyUs.advantageEyebrow}</p>
            <h3 className="text-2xl lg:text-4xl font-bold text-white">
              {t.whyUs.advantageHeading1}{' '}
              <span className="text-orange">{t.whyUs.advantageHeading2}</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {t.whyUs.features.map((feat, i) => (
              <div
                key={i}
                className="bg-navy-light/60 border border-navy-border rounded-2xl p-6 flex flex-col gap-4 hover:border-orange/40 transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center text-orange group-hover:bg-orange/20 transition-colors">
                  {FEATURE_ICONS[i]}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{feat.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-navy-card border border-navy-border rounded-2xl px-6 lg:px-10 py-5 flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3 text-white">
              <ShieldIcon className="w-6 h-6 text-orange shrink-0" />
              <span className="font-semibold">{t.whyUs.ctaBadge}</span>
            </div>
            <div className="hidden lg:block h-10 w-px bg-white/10" />
            <p className="text-white/50 text-sm text-center">{t.whyUs.ctaSub}</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-7 py-3.5 rounded-full hover:bg-orange-hover transition-colors shrink-0"
            >
              {t.whyUs.ctaBtn}
              <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
