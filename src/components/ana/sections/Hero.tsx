import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkle } from '../icons';

const Hero: React.FC = () => (
  <section className="relative min-h-[88vh] lg:min-h-screen flex items-center overflow-hidden">
    {/* Background banner */}
    <div className="absolute inset-0">
      <Image
        src="/images/ana/bg/background-banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ana-ink via-ana-ink/85 to-ana-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ana-ink/90 via-transparent to-ana-ink/40" />
    </div>

    <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 pt-28 pb-20">
      <div className="max-w-xl animate-fade-up">
        <p className="flex items-center gap-3 ana-eyebrow">
          <span className="ana-divider" />
          <Sparkle className="text-ana-gold" />
          Zodiac Inspired
        </p>

        <h1 className="mt-8 font-serif text-ana-cream text-[56px] lg:text-[78px] leading-[1.02]">
          A Candle That
          <br />
          <em className="not-italic font-serif text-ana-gold italic">
            Feels Like You
          </em>
        </h1>

        <span className="block mt-8 ana-divider" />

        <p className="mt-7 text-ana-cream/75 text-[15px] leading-[1.8] max-w-md">
          Luxury zodiac candles crafted for elegant moments, cozy nights, and
          meaningful gifts.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/#collections" className="ana-btn-primary">
            Shop Collection <ArrowRight />
          </Link>
          <Link href="/#zodiac" className="ana-btn-ghost">
            Your Sign, Your Candle
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
