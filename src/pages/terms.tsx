import Layout from 'components/alayay/Layout';
import { ALAYAY_BRAND } from 'components/alayay/data';

const SECTIONS = [
  {
    title: 'Services',
    body: 'Alayay Maintenance provides villa maintenance, swimming pool services, flooring solutions, general maintenance, emergency repairs, and annual maintenance contracts (AMC) across the UAE. All services are subject to availability and site inspection.',
  },
  {
    title: 'Quotations & Pricing',
    body: 'All quotations are provided after an inspection and are valid for 14 days. Prices are in UAE Dirhams (AED) and inclusive of VAT unless stated otherwise. What we quote is what you pay — no hidden charges.',
  },
  {
    title: 'Bookings & Cancellations',
    body: 'Service appointments can be booked via WhatsApp, phone, or our website. Cancellations must be made at least 24 hours before the scheduled visit. Late cancellations may incur a fee.',
  },
  {
    title: 'AMC Contracts',
    body: 'Annual Maintenance Contracts are binding for the agreed contract period. Early termination requests must be submitted in writing and may be subject to applicable charges as outlined in the contract.',
  },
  {
    title: 'Liability',
    body: 'Alayay Maintenance is fully insured. Our team takes all reasonable precautions to protect your property. Any claims for damages must be reported within 48 hours of service completion with photographic evidence.',
  },
  {
    title: 'Contact',
    body: null,
  },
];

export default function TermsPage() {
  return (
    <Layout
      title="Terms & Conditions"
      description="Alayay Maintenance terms and conditions — services, pricing, bookings, AMC contracts, and liability."
      canonical="/terms"
      type="article"
    >
      <section className="bg-navy py-24 pt-36">
        <div className="al-container text-center">
          <p className="al-eyebrow mb-4">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Terms & Conditions</h1>
          <p className="text-white/50 mt-4 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <section className="al-section bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-navy mb-3">{s.title}</h2>
              {s.body ? (
                <p className="text-gray-600 leading-relaxed">{s.body}</p>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  For any questions regarding these terms, contact us at{' '}
                  <a href={`mailto:${ALAYAY_BRAND.email}`} className="text-orange font-medium hover:underline">{ALAYAY_BRAND.email}</a>{' '}
                  or call{' '}
                  <a href={`tel:${ALAYAY_BRAND.phone}`} className="text-orange font-medium hover:underline">{ALAYAY_BRAND.phone}</a>.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
