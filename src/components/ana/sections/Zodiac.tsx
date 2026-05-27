import Image from 'next/image';
import { ZODIAC_SIGNS } from '../data';
import { Sparkle } from '../icons';

const Zodiac: React.FC = () => (
  <section id="zodiac" className="relative py-24 lg:py-32 overflow-hidden">
    {/* subtle background */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/ana/bg/background-banner.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ana-ink via-ana-ink/85 to-ana-ink" />
    </div>

    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="text-center max-w-2xl mx-auto">
        <p className="ana-eyebrow inline-flex items-center gap-2">
          <Sparkle /> Zodiac Candles
        </p>
        <h2 className="mt-5 font-serif text-ana-cream text-[40px] lg:text-[48px] leading-[1.1]">
          Your Sign, Your Candle
        </h2>
        <span className="block mt-6 ana-divider mx-auto" />
        <p className="mt-6 text-ana-cream/70 text-[15px] leading-[1.8]">
          Twelve birth date candles, each scented to match the energy, element,
          and essence of a zodiac sign.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
        {ZODIAC_SIGNS.map((z) => (
          <div key={z.slug} className="group text-center">
            <div className="relative aspect-square overflow-hidden border border-ana-gold/10 group-hover:border-ana-gold/40 transition-colors">
              <Image
                src={z.image}
                alt={z.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700"
              />
            </div>
            <h3 className="mt-5 font-serif text-ana-cream text-[20px]">
              {z.name}
            </h3>
            <p className="mt-1 text-ana-cream/55 text-[11px] tracking-[0.22em] uppercase">
              {z.dates}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Zodiac;
