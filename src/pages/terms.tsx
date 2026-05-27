import Layout from 'components/ana/Layout';

export default function TermsPage() {
  return (
    <Layout
      title="Terms & Conditions"
      description="ANA Candles terms and conditions of sale — ordering via WhatsApp, delivery in the UAE, returns, and care."
      canonical="/terms"
      type="article"
    >
      <section className="relative py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <p className="ana-eyebrow text-ana-gold-light text-center">Legal</p>
          <h1 className="font-serif text-4xl lg:text-5xl text-ana-cream text-center mt-3">
            Terms &amp; <em className="italic text-ana-gold">Conditions</em>
          </h1>
          <div className="ana-divider mx-auto mt-6" />

          <div className="mt-12 space-y-10 text-ana-cream/80 leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl text-ana-cream mb-3">Ordering</h2>
              <p>
                Orders are placed directly through WhatsApp. By confirming an order
                you agree to the price, scent, and delivery window communicated by
                our team at the time of confirmation.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ana-cream mb-3">Delivery</h2>
              <p>
                We deliver across the UAE. Estimated delivery is 1–3 working days
                inside Dubai and 2–5 working days for the rest of the Emirates.
                International orders are quoted individually.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ana-cream mb-3">Returns</h2>
              <p>
                Due to the personal nature of fragrance and the handmade process,
                we do not accept returns on opened candles. If your order arrives
                damaged, contact us within 48 hours on WhatsApp with a photo and we
                will replace it.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ana-cream mb-3">Candle care</h2>
              <p>
                Trim the wick to 5 mm before each lighting. Burn for a maximum of
                4 hours at a time. Never leave a burning candle unattended or
                within reach of children and pets.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ana-cream mb-3">Contact</h2>
              <p>
                For any questions about these terms, reach us on WhatsApp at
                <span className="text-ana-gold"> +971 55 535 9422</span> or by email
                at <span className="text-ana-gold">Ana.19.19.19.1992@gmail.com</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
