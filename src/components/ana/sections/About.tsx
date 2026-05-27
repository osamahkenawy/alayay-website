import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkle } from '../icons';

const About: React.FC = () => (
  <section id="about" className="py-24 lg:py-32 bg-ana-ink">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-ana-gold/15">
        <Image
          src="/images/ana/bg/background-banner.png"
          alt="ANA candle collection"
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ana-ink/40 via-transparent to-transparent" />
      </div>

      <div className="max-w-lg">
        <p className="flex items-center gap-3 ana-eyebrow">
          <Sparkle />
          About ANA
        </p>

        <h2 className="mt-5 font-serif text-ana-cream text-[40px] lg:text-[48px] leading-[1.1]">
          Fragrance, made personal.
        </h2>

        <span className="block mt-8 ana-divider" />

        <p className="mt-7 text-ana-cream/75 text-[15px] leading-[1.9]">
          ANA was born from a simple belief — that every person carries their
          own scent of memory, mood, and meaning. Our candles are crafted in the
          spirit of the Gulf: rich, warm, and quietly opulent.
        </p>
        <p className="mt-5 text-ana-cream/75 text-[15px] leading-[1.9]">
          From smoky oud to soft rose, every ANA candle is a small ritual
          wrapped in matte black and brushed gold — made to feel like you.
        </p>

        <Link href="/about" className="mt-10 ana-link-underline">
          Discover Our Story <ArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default About;
