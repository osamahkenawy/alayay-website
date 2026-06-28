import Layout from 'components/alayay/Layout';
import { ALAYAY_BRAND } from 'components/alayay/data';

export default function PrivacyPage() {
  return (
    <Layout
      title="Privacy Policy"
      description="Alayay Maintenance privacy policy — how we collect, use, and protect your personal information."
      canonical="/privacy"
      type="article"
    >
      <section className="bg-navy py-24 pt-36">
        <div className="al-container text-center">
          <p className="al-eyebrow mb-4">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white">Privacy Policy</h1>
          <p className="text-white/50 mt-4 text-sm">Last updated: June 2026</p>
        </div>
      </section>

      <section className="al-section bg-white">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {[
            {
              title: 'Information We Collect',
              body: 'We collect personal information you provide when booking a service, requesting a quote, or contacting us — including name, phone number, email address, and property address. We do not collect unnecessary data.',
            },
            {
              title: 'How We Use Your Information',
              body: 'Your information is used solely to provide our maintenance services, schedule appointments, send service confirmations, and communicate updates relevant to your bookings. We do not sell or share your data with third parties.',
            },
            {
              title: 'Data Storage & Security',
              body: 'All personal data is stored securely and access is limited to authorized Alayay team members. We use industry-standard security measures to protect your information.',
            },
            {
              title: 'Your Rights',
              body: 'You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us using the details below.',
            },
            {
              title: 'Cookies',
              body: 'Our website uses minimal cookies for performance and analytics purposes only. No personal data is tracked or sold through cookies.',
            },
          ].map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold text-navy mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-bold text-navy mb-3">Contact</h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy-related requests, contact us at{' '}
              <a href={`mailto:${ALAYAY_BRAND.email}`} className="text-orange font-medium hover:underline">{ALAYAY_BRAND.email}</a>{' '}
              or{' '}
              <a href={`tel:${ALAYAY_BRAND.phone}`} className="text-orange font-medium hover:underline">{ALAYAY_BRAND.phone}</a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
