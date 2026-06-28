import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, VillaIcon, PoolIcon, FlooringIcon, GeneralIcon, CrownIcon } from '../Icons';
import { useT } from '../../../hooks/useT';

const TYPE_ICONS = [
  <VillaIcon key="v" className="w-7 h-7 text-orange" />,
  <PoolIcon key="p" className="w-7 h-7 text-orange" />,
  <FlooringIcon key="f" className="w-7 h-7 text-orange" />,
  <GeneralIcon key="g" className="w-7 h-7 text-orange" />,
];

const AMC: React.FC = () => {
  const t = useT();

  return (
    <section id="amc" className="al-section bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-orange/5 translate-y-1/2 -translate-x-1/2" />

      <div className="al-container relative z-10">
        <div className="bg-navy-light border border-navy-border rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <CrownIcon className="w-5 h-5 text-orange" />
                <span className="al-eyebrow">{t.amc.eyebrow}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                {t.amc.heading1}<br />{t.amc.heading2}
              </h2>
              <p className="text-white/65 text-base leading-relaxed mb-8 max-w-md">{t.amc.body}</p>
              <Link
                href="/services/amc"
                className="inline-flex items-center gap-2.5 bg-orange text-white font-semibold px-8 py-4 rounded-full hover:bg-orange-hover transition-all duration-200 shadow-lg shadow-orange/30"
              >
                {t.amc.cta}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              <p className="text-white/40 text-xs mt-4 flex items-center gap-2">
                <CheckIcon className="w-3.5 h-3.5 text-orange" />
                {t.amc.note}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {t.amc.types.map((label, i) => (
                <div
                  key={label}
                  className="bg-navy-dark/60 border border-navy-border rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-orange/40 transition-colors cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                    {TYPE_ICONS[i]}
                  </div>
                  <span className="text-white font-semibold text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AMC;
