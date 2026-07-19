import { ArrowRightIcon } from '../Icons';
import { useT } from '../../../hooks/useT';

const STEP_ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>,
];

const HowItWorks: React.FC = () => {
  const t = useT();

  return (
    <section className="al-section bg-white">
      <div className="al-container">
        <div className="text-center mb-14">
          <p className="al-eyebrow mb-3">{t.howItWorks.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy mb-4">{t.howItWorks.heading}</h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-0.5 bg-stone-border" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-navy flex items-center justify-center text-navy shadow-sm group-hover:scale-105 transition-transform duration-200 relative z-10">
                    {STEP_ICONS[i]}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange text-white text-sm font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-navy font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                {i < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -end-4 z-20 text-orange">
                    <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
