import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NAV_LINKS, ANA_BRAND } from './data';
import { WhatsAppIcon } from './icons';

const Header: React.FC = () => {
  const { pathname, asPath } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [asPath]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/' && !asPath.includes('#');
    if (href.startsWith('/#')) return false;
    return pathname === href;
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="shrink-0 inline-flex items-center" aria-label="ANA Candles home">
          <Image
            src="/images/ana/logos/ana-logo.png"
            alt="ANA Candles"
            width={72}
            height={72}
            priority
            className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[0.18em] uppercase font-medium transition-colors relative ${
                  active
                    ? 'text-ana-gold'
                    : 'text-ana-cream/85 hover:text-ana-gold'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px w-6 bg-ana-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={ANA_BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2.5 border border-ana-gold text-ana-gold uppercase tracking-[0.2em] text-[12px] font-medium px-5 py-3 hover:bg-ana-gold hover:text-ana-ink transition-colors"
          >
            <WhatsAppIcon />
            Order on WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 border border-ana-gold/60 text-ana-gold"
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden bg-ana-ink/95 border-t border-ana-gold/15 backdrop-blur">
          <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-ana-cream/90 text-[14px] uppercase tracking-[0.18em] hover:text-ana-gold"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={ANA_BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2.5 border border-ana-gold text-ana-gold uppercase tracking-[0.2em] text-[12px] font-medium px-5 py-3 hover:bg-ana-gold hover:text-ana-ink transition-colors w-fit"
            >
              <WhatsAppIcon />
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
