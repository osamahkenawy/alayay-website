import Link from 'next/link';
import Image from 'next/image';
import { ANA_BRAND } from './data';

const COLS = [
  {
    title: 'Explore',
    items: [
      { label: 'About ANA', href: '/about' },
      { label: 'Collections', href: '/#collections' },
      { label: 'Zodiac Candles', href: '/#zodiac' },
      { label: 'Gifts', href: '/#gifts' },
    ],
  },
  {
    title: 'Care',
    items: [
      { label: 'Contact', href: '/#contact' },
      { label: 'WhatsApp Order', href: ANA_BRAND.whatsappLink, external: true },
      { label: 'FAQ', href: '/faq' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

const Footer: React.FC = () => (
  <footer className="border-t border-ana-gold/10 bg-ana-ink">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="md:col-span-1">
        <Link href="/" className="inline-block">
          <Image
            src="/images/ana/logos/ana-logo.png"
            alt="ANA Candles"
            width={64}
            height={64}
            className="w-14 h-14 object-contain"
          />
        </Link>
        <p className="mt-6 text-ana-cream/60 text-[13px] leading-relaxed max-w-xs">
          Luxury zodiac-inspired candles crafted for elegant moments, cozy
          nights, and meaningful gifts.
        </p>
      </div>

      {COLS.map((col) => (
        <div key={col.title}>
          <h4 className="ana-eyebrow text-ana-gold font-sans">{col.title}</h4>
          <ul className="mt-6 space-y-3">
            {col.items.map((item: any) =>
              item.external ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ana-cream/75 hover:text-ana-gold text-[14px] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-ana-cream/75 hover:text-ana-gold text-[14px] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      ))}

      <div>
        <h4 className="ana-eyebrow text-ana-gold font-sans">Contact</h4>
        <ul className="mt-6 space-y-3 text-ana-cream/75 text-[14px]">
          <li>{ANA_BRAND.city}</li>
          <li>
            <a
              href={ANA_BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ana-gold transition-colors"
            >
              {ANA_BRAND.whatsappNumber}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${ANA_BRAND.email}`}
              className="hover:text-ana-gold transition-colors"
            >
              {ANA_BRAND.email}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-ana-gold/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-ana-cream/50 tracking-wider">
        <p>© {new Date().getFullYear()} ANA Candles. All rights reserved.</p>
        <p className="uppercase tracking-[0.28em]">
          A Candle That Feels Like You
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
