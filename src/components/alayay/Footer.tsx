import Link from 'next/link';
import Image from 'next/image';
import { ALAYAY_BRAND } from './data';
import { SERVICE_CATEGORIES } from './services-data';
import { PhoneIcon, EmailIcon, GlobeIcon, LocationIcon, FacebookIcon, InstagramIcon, LinkedInIcon, YoutubeIcon, ArrowRightIcon } from './Icons';
import { useT, useLocale } from '../../hooks/useT';
import { useCms } from '../../contexts/cms';

const FOOTER_CATEGORY_IDS = ['construction', 'general-contracting', 'renovation', 'fit-out', 'mep', 'maintenance'];

const Footer: React.FC = () => {
  const t = useT();
  const isAr = useLocale() === 'ar';
  const { brand } = useCms();
  const phone = brand.phone ?? ALAYAY_BRAND.phone;
  const email = brand.email ?? ALAYAY_BRAND.email;
  const address = brand.address ?? ALAYAY_BRAND.address;
  const footerServiceCategories = SERVICE_CATEGORIES.filter((c) => FOOTER_CATEGORY_IDS.includes(c.id));

  const quickLinks = [
    { label: t.footer.links.home, href: '/' },
    { label: t.footer.links.about, href: '/about' },
    { label: t.footer.links.projects, href: '/#projects' },
    { label: t.footer.links.amc, href: '/#amc' },
    { label: t.footer.links.contact, href: '/#contact' },
  ];

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 bg-white rounded-xl px-3.5 py-2.5">
              <Image
                src="/images/alayay/logo-alayay-dark-blue-navy.png"
                alt="Alayay Maintenance"
                width={160}
                height={42}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[
                { Icon: FacebookIcon, href: '#' },
                { Icon: InstagramIcon, href: '#' },
                { Icon: LinkedInIcon, href: '#' },
                { Icon: YoutubeIcon, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 hover:text-orange text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">{t.footer.ourServices}</h4>
            <ul className="space-y-3">
              {footerServiceCategories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/services#${cat.id}`} className="text-white/60 hover:text-orange text-sm transition-colors">
                    {isAr ? cat.titleAr : cat.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-orange hover:text-orange-hover text-sm font-semibold transition-colors">
                  {t.services.viewAll} <ArrowRightIcon className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 uppercase tracking-wider text-xs">{t.footer.contactUs}</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${phone}`} className="flex items-start gap-3 text-white/60 hover:text-orange text-sm transition-colors">
                  <PhoneIcon className="w-4 h-4 mt-0.5 shrink-0 text-orange" />
                  <span dir="ltr">{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-3 text-white/60 hover:text-orange text-sm transition-colors">
                  <EmailIcon className="w-4 h-4 mt-0.5 shrink-0 text-orange" />
                  <span dir="ltr">{email}</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <GlobeIcon className="w-4 h-4 mt-0.5 shrink-0 text-orange" />
                  <span dir="ltr">{ALAYAY_BRAND.website}</span>
                </span>
              </li>
              <li>
                <span className="flex items-start gap-3 text-white/60 text-sm">
                  <LocationIcon className="w-4 h-4 mt-0.5 shrink-0 text-orange" />
                  {address}
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="text-white text-sm font-semibold mb-3">{t.footer.newsletter}</h5>
              <p className="text-white/50 text-xs mb-3">{t.footer.newsletterSub}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange"
                />
                <button className="bg-orange text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-orange-hover transition-colors">
                  {t.footer.subscribeBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
