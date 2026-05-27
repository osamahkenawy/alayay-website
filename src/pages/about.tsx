import Image from 'next/image';
import Layout from 'components/ana/Layout';
import { Sparkle } from 'components/ana/icons';

export default function AboutPage() {
  return (
    <Layout
      title="About ANA — Our Story"
      description="ANA was created with one quiet idea — that the right scent can hold a memory, soften a moment, and make a space feel like home. Hand-poured zodiac and signature candles, born in the Gulf."
      canonical="/about"
      type="article"
    >
      {/* Hero strip */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/ana/bg/background-banner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ana-ink/55" />
        <div className="relative z-10 text-center px-6">
          <p className="ana-eyebrow inline-flex items-center gap-2">
            <Sparkle /> About ANA
          </p>
          <h1 className="mt-5 font-serif text-ana-cream text-[52px] lg:text-[72px] leading-[1.05]">
            Our Story
          </h1>
          <span className="block mt-6 ana-divider mx-auto" />
        </div>
      </section>

      {/* Story body */}
      <section className="py-24 lg:py-32 bg-ana-ink">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-ana-cream text-[28px] lg:text-[34px] leading-[1.3]">
            A candle is never just a candle.
          </h2>

          <div className="mt-10 space-y-6 text-left text-ana-cream/75 text-[15px] leading-[1.95]">
            <p>
              ANA was created with one quiet idea — that the right scent can
              hold a memory, soften a moment, and make a space feel like home.
              Born in the Gulf and inspired by its golden hours, our candles
              are an invitation to slow down.
            </p>
            <p>
              Each ANA candle is hand-poured in small batches using premium wax
              and refined fragrance oils, then dressed in matte black and
              brushed gold — a quiet kind of luxury, made to live on your
              shelf, not be hidden in a drawer.
            </p>
            <p>
              From the smoky depth of Midnight Oud to the soft warmth of Desert
              Rose, every scent is composed to feel personal. And for those
              drawn to the stars, our zodiac collection gives each sign a
              candle of its own — twelve characters, twelve moods, one ritual.
            </p>
            <p>
              ANA is for the people who notice the details. Who light a candle
              before a long bath. Who pick gifts that mean something. We made
              ANA for you.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
