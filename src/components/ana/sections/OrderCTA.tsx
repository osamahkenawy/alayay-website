import Image from 'next/image';
import { ANA_BRAND } from '../data';
import { Sparkle, WhatsAppIcon } from '../icons';

const OrderCTA: React.FC = () => (
  <section id="contact" className="relative overflow-hidden">
    {/* Background candle + smoke */}
    <div className="absolute inset-0">
      <Image
        src="/images/ana/bg/order-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Darken left side for legibility, keep candle visible on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-ana-ink via-ana-ink/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ana-ink/70 via-transparent to-ana-ink/40" />
    </div>

    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28 lg:py-40">
      <div className="max-w-xl">
        <p className="ana-eyebrow inline-flex items-center gap-2">
          <Sparkle /> Order Now
        </p>
        <h2 className="mt-5 font-serif text-ana-cream text-[40px] lg:text-[56px] leading-[1.05]">
          Light something
          <br />
          <em className="not-italic italic text-ana-gold">beautiful tonight.</em>
        </h2>
        <span className="block mt-7 ana-divider" />
        <p className="mt-7 text-ana-cream/80 text-[15px] leading-[1.9] max-w-md">
          Place your order directly on WhatsApp — our team will help you choose
          the perfect scent or gift.
        </p>

        <a
          href={ANA_BRAND.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-ana-gold text-ana-ink uppercase tracking-[0.22em] text-[13px] font-medium px-9 py-4 hover:bg-ana-gold-light transition-colors"
        >
          <WhatsAppIcon /> WhatsApp {ANA_BRAND.whatsappNumber}
        </a>
      </div>
    </div>
  </section>
);

export default OrderCTA;
