import { useState } from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '../data';
import { StarIcon, ArrowRightIcon } from '../Icons';
import { useT, useLocale } from '../../../hooks/useT';
import { useCms } from '../../../contexts/cms';

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0);
  const t = useT();
  const locale = useLocale();
  const { media } = useCms();
  const isRtl = locale === 'ar';

  return (
    <section id="testimonials" className="al-section bg-white">
      <div className="al-container">
        <div className="grid lg:grid-cols-[360px_1fr] gap-14 items-start">
          {/* Sidebar */}
          <div>
            <p className="al-eyebrow mb-4">{t.testimonials.eyebrow}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-5 leading-tight">
              {t.testimonials.heading}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{t.testimonials.body}</p>

            <div className="bg-navy rounded-2xl p-6 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">500+</div>
                  <div className="text-white/50 text-xs">{t.testimonials.clientsLabel}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="1.5" className="w-5 h-5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">4.9/5</div>
                  <div className="text-white/50 text-xs">{t.testimonials.ratingLabel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial cards */}
          <div>
            <div className="flex justify-end gap-2 mb-6">
              <button
                onClick={() => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % TESTIMONIALS.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
              >
                <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TESTIMONIALS.map((item, i) => {
                const translated = t.testimonials.items[i] ?? { name: item.name, role: item.role, text: item.text };
                const avatar = media.testimonials?.[i]?.avatar ?? item.avatar;
                const rating = media.testimonials?.[i]?.rating ?? item.rating;
                return (
                  <div
                    key={item.name}
                    onClick={() => setActive(i)}
                    className={`rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                      i === active ? 'bg-navy text-white shadow-xl shadow-navy/20' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(rating)].map((_, si) => (
                        <StarIcon key={si} className="w-4 h-4 text-orange" filled />
                      ))}
                    </div>
                    <div className={`text-5xl font-serif leading-none mb-2 opacity-20 ${i === active ? 'text-white' : 'text-navy'}`}>"</div>
                    <p className={`text-sm leading-relaxed mb-5 ${i === active ? 'text-white/85' : 'text-gray-600'}`}>
                      {translated.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                        <Image src={avatar} alt={translated.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${i === active ? 'text-white' : 'text-navy'}`}>{translated.name}</div>
                        <div className={`text-xs ${i === active ? 'text-white/50' : 'text-gray-400'}`}>{translated.role}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
