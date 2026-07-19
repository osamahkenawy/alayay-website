import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from 'components/alayay/Layout';
import { SERVICES, ALAYAY_BRAND } from 'components/alayay/data';
import { getServiceIcon, ArrowRightIcon, CheckIcon } from 'components/alayay/Icons';
import Testimonials from 'components/alayay/sections/Testimonials';
import { translations } from '../../locales/translations';
import { useT } from '../../hooks/useT';
import { getCmsOverlay } from '../../lib/cms';

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  longDesc: string;
  includes: string[];
};

type Props = { service: ServiceDetail };

export default function ServicePage({ service }: Props) {
  const t = useT();

  const getServiceLabel = (id: string) => {
    const idx = SERVICES.findIndex((s) => s.id === id);
    return idx >= 0 ? (t.services.items[idx]?.title ?? id) : id;
  };

  return (
    <Layout title={service.title} description={service.longDesc} canonical={service.href}>
      {/* Hero */}
      <section className="relative bg-cream py-24 pt-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={service.image} alt={service.title} fill priority sizes="100vw" className="object-cover opacity-[0.14]" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 to-cream" />
        </div>
        <div className="al-container relative z-10">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
            <Link href="/" className="hover:text-orange transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-orange transition-colors">{t.servicePage.breadcrumbServices}</Link>
            <span>/</span>
            <span className="text-navy">{service.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="al-icon-badge">
              {getServiceIcon(service.icon, 'w-7 h-7')}
            </div>
            <p className="al-eyebrow">{t.servicePage.eyebrow}</p>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-navy mb-6 max-w-2xl leading-tight">{service.title}</h1>
          <p className="text-gray-600 text-lg max-w-xl leading-relaxed">{service.description}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
              {t.servicePage.bookBtn} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </a>
            <Link href="/#contact" className="al-btn-outline-navy">
              {t.servicePage.quoteBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="al-section bg-white">
        <div className="al-container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="al-eyebrow mb-4">{t.servicePage.whatWeDoEyebrow}</p>
              <h2 className="text-3xl font-bold text-navy mb-6">{service.title}</h2>
              <p className="text-gray-600 leading-relaxed text-base mb-8">{service.longDesc}</p>
              <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
                {t.servicePage.bookNow} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-bold text-navy text-xl mb-6">{t.servicePage.includedTitle}</h3>
              <ul className="space-y-4">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange/15 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-orange" />
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Other services */}
      <section className="al-section bg-gray-50">
        <div className="al-container">
          <h2 className="text-2xl font-bold text-navy mb-8 text-center">{t.servicePage.otherServices}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICES.filter((s) => s.id !== service.id).map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 text-center hover:border-orange hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  {getServiceIcon(s.icon, 'w-5 h-5 text-orange')}
                </div>
                <span className="text-navy text-xs font-semibold leading-tight">{getServiceLabel(s.id)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = SERVICES.map((s) => ({ params: { slug: s.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const base = SERVICES.find((s) => s.id === slug);
  if (!base) return { notFound: true };

  const lang = translations[locale === 'ar' ? 'ar' : 'en'];
  const serviceIndex = SERVICES.findIndex((s) => s.id === slug);
  const details = lang.serviceDetails[slug as keyof typeof lang.serviceDetails];
  const cms = await getCmsOverlay(locale === 'ar' ? 'ar' : 'en');

  return {
    props: {
      cms,
      service: {
        ...base,
        title: lang.services.items[serviceIndex]?.title ?? base.title,
        description: lang.services.items[serviceIndex]?.description ?? base.description,
        longDesc: details?.longDesc ?? base.description,
        includes: details?.includes ?? [],
      },
    },
    revalidate: 60,
  };
};
