import Image from 'next/image';
import Link from 'next/link';
import { SIGNATURE_SCENTS } from '../data';
import { ArrowRight, Sparkle } from '../icons';

const Signature: React.FC = () => (
  <section id="collections" className="py-24 lg:py-32 bg-ana-ink">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="text-center max-w-2xl mx-auto">
        <p className="ana-eyebrow inline-flex items-center gap-2">
          <Sparkle /> Signature Collection
        </p>
        <h2 className="mt-5 font-serif text-ana-cream text-[40px] lg:text-[48px] leading-[1.1]">
          The ANA Four.
        </h2>
        <span className="block mt-6 ana-divider mx-auto" />
        <p className="mt-6 text-ana-cream/70 text-[15px] leading-[1.8]">
          Four signature scents, each poured to evoke a feeling, a memory, a
          mood.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SIGNATURE_SCENTS.map((s) => (
          <article
            key={s.slug}
            className="group border border-ana-gold/15 hover:border-ana-gold/45 transition-colors bg-ana-charcoal/40"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="p-6 lg:p-7">
              <p className="ana-eyebrow">{s.mood}</p>
              <h3 className="mt-3 font-serif text-ana-cream text-[24px]">
                {s.name}
              </h3>
              <Link
                href={`/#contact`}
                className="mt-5 inline-flex items-center gap-2 text-ana-gold uppercase tracking-[0.22em] text-[11px] font-medium border-b border-ana-gold/40 pb-1 hover:border-ana-gold-light hover:text-ana-gold-light"
              >
                View Details <ArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link href="/#zodiac" className="ana-btn-ghost">
          Shop Full Collection <ArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

export default Signature;
