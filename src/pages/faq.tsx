import Layout from 'components/ana/Layout';

const faqs = [
  {
    q: 'Are ANA candles handmade?',
    a: 'Yes — every candle is hand-poured in small batches in Dubai using premium soy-coconut wax and curated fragrance oils.',
  },
  {
    q: 'How long do they burn?',
    a: 'Our standard signature candles burn for approximately 40–50 hours when cared for properly (trim the wick to 5 mm before each lighting).',
  },
  {
    q: 'Do you offer custom or zodiac gift sets?',
    a: 'Absolutely. Each zodiac sign has its own dedicated scent. Message us on WhatsApp and we will help you curate the perfect gift.',
  },
  {
    q: 'How do I place an order?',
    a: 'All orders are placed directly through WhatsApp. Tap any "Order on WhatsApp" button on the site and our team will guide you through scent, packaging, and delivery.',
  },
  {
    q: 'Do you deliver outside Dubai?',
    a: 'Yes — we deliver across the UAE. International shipping is available on request via WhatsApp.',
  },
];

export default function FAQPage() {
  return (
    <Layout
      title="FAQ"
      description="Answers to common questions about ANA Candles — burn time, custom orders, zodiac scents, and delivery."
      canonical="/faq"
    >
      <section className="relative py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <p className="ana-eyebrow text-ana-gold-light text-center">FAQ</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ana-cream text-center mt-3">
            Frequently asked <em className="italic text-ana-gold">questions</em>
          </h1>
          <div className="ana-divider mx-auto mt-6" />

          <div className="mt-14 space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="border border-ana-gold/20 bg-ana-charcoal/40 backdrop-blur-sm p-6 lg:p-8 rounded-sm"
              >
                <h2 className="font-serif text-xl lg:text-2xl text-ana-cream">
                  {f.q}
                </h2>
                <p className="mt-3 text-ana-cream/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
