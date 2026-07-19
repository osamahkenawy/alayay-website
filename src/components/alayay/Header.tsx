import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ALAYAY_BRAND } from './data';
import { PhoneIcon, MenuIcon, CloseIcon } from './Icons';
import { useT, useLocale } from '../../hooks/useT';
import { useCms } from '../../contexts/cms';

const Header: React.FC = () => {
  const { pathname, asPath, push } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useT();
  const locale = useLocale();
  const { brand } = useCms();
  const whatsapp = brand.whatsapp ?? ALAYAY_BRAND.whatsapp;
  const isAr = locale === 'ar';

  useEffect(() => { setOpen(false); }, [asPath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    push(asPath, asPath, { locale: next, scroll: false });
  };

  const NAV = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.services, href: '/services' },
    { label: t.nav.amc, href: '/#amc' },
    { label: t.nav.projects, href: '/#projects' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-cream/95 backdrop-blur-sm border-b ${
        scrolled ? 'border-stone-border shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Alayay Maintenance home" className="shrink-0 flex items-center">
          <Image
            src="/images/alayay/logo-alayay-dark-blue-navy.png"
            alt="Alayay Maintenance"
            width={175}
            height={46}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && asPath.includes(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  active ? 'text-orange' : 'text-navy/75 hover:text-navy hover:bg-navy/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTAs + Language switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLocale}
            className="border border-navy/25 text-navy/70 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-navy/5 transition-colors tracking-wide"
            aria-label="Switch language"
          >
            {isAr ? 'EN' : 'ع'}
          </button>
          <Link
            href="/#contact"
            className="border border-navy/30 text-navy text-sm font-medium px-5 py-2.5 rounded-full hover:bg-navy hover:text-white transition-colors"
          >
            {t.nav.getQuote}
          </Link>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-orange-hover transition-colors"
          >
            {t.nav.book}
          </a>
        </div>

        {/* Mobile: language toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="border border-navy/25 text-navy/70 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-navy/5 transition-colors"
          >
            {isAr ? 'EN' : 'ع'}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="text-navy p-2"
          >
            {open ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-cream border-t border-stone-border">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy/80 hover:text-orange text-sm font-medium py-2.5 px-3 rounded-lg hover:bg-navy/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-stone-border">
              <Link
                href="/#contact"
                className="border border-navy/30 text-navy text-sm font-medium px-5 py-3 rounded-full text-center hover:bg-navy hover:text-white transition-colors"
              >
                {t.nav.getQuote}
              </Link>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-orange-hover transition-colors"
              >
                {t.nav.book}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
