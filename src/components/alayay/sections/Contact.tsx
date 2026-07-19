import { useState } from 'react';
import { ALAYAY_BRAND } from '../data';
import { PhoneIcon, EmailIcon, LocationIcon, ArrowRightIcon, CheckIcon } from '../Icons';
import { useT, useLocale } from '../../../hooks/useT';
import { useCms } from '../../../contexts/cms';

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3014';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact: React.FC = () => {
  const t = useT();
  const locale = useLocale();
  const { brand } = useCms();
  const phone = brand.phone ?? ALAYAY_BRAND.phone;
  const email = brand.email ?? ALAYAY_BRAND.email;
  const address = brand.address ?? ALAYAY_BRAND.address;
  const whatsapp = brand.whatsapp ?? ALAYAY_BRAND.whatsapp;

  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '', website: '' });
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch(`${CMS_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setForm({ name: '', phone: '', service: '', message: '', website: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="al-section bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-navy/5 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-navy/5 translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="al-container relative z-10">
        <div className="text-center mb-14">
          <p className="al-eyebrow mb-3">{t.contact.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4">
            {t.contact.heading1} <span className="text-orange">{t.contact.heading2}</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div className="bg-white border border-stone-border rounded-3xl p-8 lg:p-10 space-y-6 shadow-sm">
            <h3 className="text-navy font-bold text-xl mb-2">{t.contact.detailsTitle}</h3>

            <a href={`tel:${phone}`} className="flex items-center gap-4 group">
              <div className="al-icon-badge group-hover:bg-navy group-hover:text-white transition-colors">
                <PhoneIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-0.5 uppercase tracking-wider">{t.contact.phoneLabel}</div>
                <div className="text-navy font-semibold group-hover:text-orange transition-colors" dir="ltr">{phone}</div>
              </div>
            </a>

            <a href={`mailto:${email}`} className="flex items-center gap-4 group">
              <div className="al-icon-badge group-hover:bg-navy group-hover:text-white transition-colors">
                <EmailIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-0.5 uppercase tracking-wider">{t.contact.emailLabel}</div>
                <div className="text-navy font-semibold group-hover:text-orange transition-colors" dir="ltr">{email}</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="al-icon-badge">
                <LocationIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-gray-400 text-xs mb-0.5 uppercase tracking-wider">{t.contact.locationLabel}</div>
                <div className="text-navy font-semibold">{address}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-border">
              <p className="text-gray-400 text-xs mb-4">{t.contact.whatsappNote}</p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-semibold px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity text-sm w-full justify-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t.contact.whatsappBtn}
              </a>
            </div>
          </div>

          {/* Quote form */}
          <div className="bg-white border border-stone-border rounded-3xl p-8 lg:p-10 shadow-sm">
            <h3 className="text-navy font-bold text-xl mb-6">{t.contact.formTitle}</h3>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h4 className="text-navy font-bold text-lg mb-2">{t.contact.successTitle}</h4>
                <p className="text-gray-500 text-sm mb-6">{t.contact.responseNote}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="al-btn-outline-navy"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot: hidden from real visitors, bots that autofill everything will trip it */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={update('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] w-px h-px opacity-0"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">{t.contact.nameLabel}</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full bg-cream border border-stone-border rounded-xl px-4 py-3 text-navy placeholder-gray-400 text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">{t.contact.phoneInputLabel}</label>
                    <input
                      dir="ltr"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full bg-cream border border-stone-border rounded-xl px-4 py-3 text-navy placeholder-gray-400 text-sm focus:outline-none focus:border-navy transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">{t.contact.serviceLabel}</label>
                  <select
                    value={form.service}
                    onChange={update('service')}
                    className="w-full bg-cream border border-stone-border rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-navy transition-colors appearance-none"
                  >
                    <option value="">{t.contact.servicePlaceholder}</option>
                    {t.contact.serviceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">{t.contact.messageLabel}</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={update('message')}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full bg-cream border border-stone-border rounded-xl px-4 py-3 text-navy placeholder-gray-400 text-sm focus:outline-none focus:border-navy transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-xs text-center">{t.contact.errorBody}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange text-white font-semibold px-7 py-4 rounded-full hover:bg-orange-hover transition-all duration-200 text-sm disabled:opacity-60"
                >
                  {status === 'sending' ? t.contact.sending : t.contact.submitBtn}
                  {status !== 'sending' && <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />}
                </button>
                <p className="text-gray-400 text-xs text-center">{t.contact.responseNote}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
