import Image from 'next/image';
import Link from 'next/link';
import Layout from 'components/alayay/Layout';
import { ALAYAY_BRAND } from 'components/alayay/data';
import { ShieldIcon, ArrowRightIcon } from 'components/alayay/Icons';
import { useT } from '../hooks/useT';

const VALUE_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 9.76 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
];

export default function AboutPage() {
  const t = useT();

  return (
    <Layout
      title="About Us"
      description="Alayay Maintenance is UAE's trusted partner for professional villa, pool, flooring and facility maintenance services across Dubai, Abu Dhabi and Sharjah."
      canonical="/about"
      type="article"
    >
      {/* Hero */}
      <section className="relative bg-navy py-28 pt-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/alayay/bg-banner.png" alt="" fill priority sizes="100vw" className="object-cover object-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy" />
        </div>
        <div className="al-container relative z-10 text-center">
          <p className="al-eyebrow mb-4">{t.about.eyebrow}</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t.about.heading1}<br />
            <span className="text-orange">{t.about.heading2}</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">{t.about.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="al-section bg-white">
        <div className="al-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="al-eyebrow mb-4">{t.about.storyEyebrow}</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6 leading-tight">
                {t.about.storyHeading1}<br />{t.about.storyHeading2}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t.about.storyP1}</p>
                <p>{t.about.storyP2}</p>
                <p>{t.about.storyP3}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
                  {t.nav.book} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
                </a>
                <Link href="/#amc" className="al-btn-outline-navy">
                  {t.about.exploreAmc}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.about.stats.map((item) => (
                <div key={item.label} className="bg-navy rounded-2xl p-8 text-center">
                  <div className="text-4xl font-bold text-orange mb-2" dir="ltr">{item.stat}</div>
                  <div className="text-white/60 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="al-section bg-gray-50">
        <div className="al-container">
          <div className="text-center mb-14">
            <p className="al-eyebrow mb-3">{t.about.valuesEyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy">{t.about.valuesHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center mb-5">
                  {VALUE_ICONS[i]}
                </div>
                <h3 className="font-bold text-navy text-lg mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="al-section bg-navy">
        <div className="al-container text-center">
          <ShieldIcon className="w-14 h-14 text-orange mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">{t.about.ctaHeading}</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">{t.about.ctaSub}</p>
          <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
            {t.about.ctaBtn} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
