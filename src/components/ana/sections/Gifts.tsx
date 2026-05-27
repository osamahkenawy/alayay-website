import Image from 'next/image';
import Link from 'next/link';
import { ANA_BRAND, SIGNATURE_SCENTS } from '../data';
import { ArrowRight, Sparkle, WhatsAppIcon } from '../icons';

const Gifts: React.FC = () => (
  <section id="gifts" className="py-24 lg:py-32 bg-ana-ink">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      <div className="max-w-md">
        <p className="ana-eyebrow inline-flex items-center gap-2">
          <Sparkle /> Gifts
        </p>
        <h2 className="mt-5 font-serif text-ana-cream text-[40px] lg:text-[44px] leading-[1.15]">
          Wrapped in black
          <br />
          and brushed gold.
        </h2>

        <span className="block mt-8 ana-divider" />

        <p className="mt-7 text-ana-cream/75 text-[15px] leading-[1.9]">
          Every ANA candle arrives in a luxurious gift box — designed for
          birthdays, anniversaries, weddings, and the quiet moments worth
          remembering.
        </p>
        <p className="mt-5 text-ana-cream/75 text-[15px] leading-[1.9]">
          Choose a scent, choose a sign, and we&apos;ll wrap it beautifully.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/#collections" className="ana-btn-primary">
            Explore Gifting <ArrowRight />
          </Link>
          <a
            href={ANA_BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="ana-btn-ghost"
          >
            <WhatsAppIcon /> Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {SIGNATURE_SCENTS.map((s, i) => (
          <div
            key={s.slug}
            className={`relative aspect-square border border-ana-gold/15 overflow-hidden ${
              i % 2 === 1 ? 'lg:-translate-y-6' : ''
            }`}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Gifts;
