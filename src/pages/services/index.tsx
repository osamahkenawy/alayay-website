import Link from 'next/link';
import Layout from 'components/alayay/Layout';
import { ALAYAY_BRAND } from 'components/alayay/data';
import { SERVICE_CATEGORIES } from 'components/alayay/services-data';
import { ArrowRightIcon, CheckIcon, getServiceIcon } from 'components/alayay/Icons';
import { useLocale } from '../../hooks/useT';
import { getCmsOverlay } from '../../lib/cms';

export async function getStaticProps({ locale }: { locale?: string }) {
  const cms = await getCmsOverlay((locale as 'en' | 'ar') ?? 'en');
  return { props: { cms }, revalidate: 60 };
}

const COPY = {
  en: {
    eyebrow: 'Full Service Range',
    heading1: 'Construction, Contracting &',
    heading2: 'Maintenance — Under One Roof',
    subtitle:
      'From luxury villa construction to annual maintenance contracts, Alayay delivers every stage of the build-to-maintain lifecycle across Abu Dhabi and the UAE.',
    bookBtn: 'Book a Service',
    quoteBtn: 'Request a Quote',
    ctaHeading: "Don't see exactly what you need?",
    ctaBody: 'Our team covers specialty and custom scopes beyond this list — get in touch and we\'ll scope it with you.',
  },
  ar: {
    eyebrow: 'نطاق خدماتنا الكامل',
    heading1: 'البناء والمقاولات',
    heading2: 'والصيانة — تحت سقف واحد',
    subtitle:
      'من بناء الفلل الفاخرة إلى عقود الصيانة السنوية، تقدم علياي كل مرحلة من دورة البناء والصيانة في أبوظبي وجميع أنحاء الإمارات.',
    bookBtn: 'احجز خدمة',
    quoteBtn: 'اطلب عرض سعر',
    ctaHeading: 'لم تجد ما تبحث عنه بالضبط؟',
    ctaBody: 'يغطي فريقنا نطاقات متخصصة ومخصصة تتجاوز هذه القائمة — تواصل معنا وسنحدد التفاصيل معك.',
  },
};

export default function ServicesIndexPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const c = isAr ? COPY.ar : COPY.en;

  return (
    <Layout
      title={isAr ? 'جميع الخدمات' : 'All Services'}
      description="Alayay Maintenance & General Contracting offers villa construction, general contracting, renovation, fit-out, MEP, landscaping, swimming pools, and annual maintenance contracts across Abu Dhabi and the UAE."
      canonical="/services"
    >
      {/* Hero */}
      <section className="relative bg-cream py-24 pt-36 overflow-hidden">
        <div className="al-container relative z-10 text-center">
          <p className="al-eyebrow mb-4">{c.eyebrow}</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-navy mb-6 leading-tight">
            {c.heading1}<br />
            <span className="text-orange">{c.heading2}</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-8">{c.subtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
              {c.bookBtn} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </a>
            <Link href="/#contact" className="al-btn-outline-navy">
              {c.quoteBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="al-section bg-white">
        <div className="al-container">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.id} id={cat.id} className="bg-cream border border-stone-border rounded-2xl p-7 scroll-mt-28">
                <div className="flex items-center gap-4 mb-5">
                  <div className="al-icon-badge shrink-0">
                    {getServiceIcon(cat.icon, 'w-5 h-5')}
                  </div>
                  <h2 className="font-bold text-navy text-lg lg:text-xl">
                    {isAr ? cat.titleAr : cat.title}
                  </h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {(isAr ? cat.itemsAr : cat.items).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-snug">
                      <CheckIcon className="w-3.5 h-3.5 text-orange shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="al-section bg-navy">
        <div className="al-container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{c.ctaHeading}</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">{c.ctaBody}</p>
          <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
            {c.bookBtn} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
