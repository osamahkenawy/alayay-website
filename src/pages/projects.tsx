import Layout from 'components/alayay/Layout';
import Projects from 'components/alayay/sections/Projects';
import Link from 'next/link';
import { ALAYAY_BRAND } from 'components/alayay/data';
import { ArrowRightIcon } from 'components/alayay/Icons';
import { useT } from '../hooks/useT';
import { getCmsOverlay } from '../lib/cms';

export async function getStaticProps({ locale }: { locale?: string }) {
  const cms = await getCmsOverlay((locale as 'en' | 'ar') ?? 'en');
  return { props: { cms }, revalidate: 60 };
}

export default function ProjectsPage() {
  const t = useT();

  return (
    <Layout
      title="Our Projects"
      description="Real maintenance transformations across villas, pools, and flooring in Dubai and UAE. See our before and after results."
      canonical="/projects"
    >
      <section className="bg-cream py-20 pt-32">
        <div className="al-container text-center">
          <p className="al-eyebrow mb-4">{t.projectsPage.eyebrow}</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-navy mb-5">
            {t.projectsPage.heading1}<br />
            <span className="text-orange">{t.projectsPage.heading2}</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">{t.projectsPage.subtitle}</p>
        </div>
      </section>

      <Projects />

      <section className="al-section bg-gray-50">
        <div className="al-container text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">{t.projectsPage.ctaHeading}</h2>
          <p className="text-gray-500 mb-8">{t.projectsPage.ctaBody}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={ALAYAY_BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="al-btn-primary">
              {t.projectsPage.ctaBook} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </a>
            <Link href="/#contact" className="al-btn-outline-navy">
              {t.projectsPage.ctaQuote}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
