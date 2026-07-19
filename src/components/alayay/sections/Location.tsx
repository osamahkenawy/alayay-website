import { ALAYAY_BRAND } from '../data';
import { PhoneIcon, LocationIcon, ClockIcon, DirectionsIcon } from '../Icons';
import { useT } from '../../../hooks/useT';
import { useCms } from '../../../contexts/cms';

const Location: React.FC = () => {
  const t = useT();
  const { brand } = useCms();
  const phone = brand.phone ?? ALAYAY_BRAND.phone;
  const address = brand.address ?? ALAYAY_BRAND.address;

  const { lat, lng } = ALAYAY_BRAND.mapCoords;
  const mapEmbedSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
  const viewOnMapsHref = `https://www.google.com/maps?q=${lat},${lng}`;
  const directionsHref = ALAYAY_BRAND.mapDirectionsUrl;

  return (
    <section className="al-section bg-cream">
      <div className="al-container">
        <div className="text-center mb-14">
          <p className="al-eyebrow mb-3">{t.location.eyebrow}</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-navy">
            {t.location.heading1} <span className="text-orange">{t.location.heading2}</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base mt-4">{t.location.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[380px_1fr] rounded-3xl overflow-hidden shadow-lg border border-stone-border">
          {/* Info card */}
          <div className="bg-navy p-8 lg:p-10 flex flex-col">
            <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
              {ALAYAY_BRAND.name}
            </div>
            <div className="flex items-center gap-2 mb-8">
              <h3 className="text-white font-bold text-xl">{t.location.hq}</h3>
              <span className="inline-flex items-center bg-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                HQ
              </span>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange shrink-0">
                  <LocationIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">{t.location.addressLabel}</div>
                  <div className="text-white text-sm leading-relaxed">{address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange shrink-0">
                  <PhoneIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">{t.location.phoneLabel}</div>
                  <div className="text-white text-sm" dir="ltr">{phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange shrink-0">
                  <ClockIcon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-white/40 text-[11px] uppercase tracking-wider mb-1">{t.location.hoursLabel}</div>
                  <div className="text-white text-sm">{t.location.hours}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10 pt-6 border-t border-white/10">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange text-white font-semibold px-5 py-3 rounded-full hover:bg-orange-hover transition-colors text-sm"
              >
                <DirectionsIcon className="w-4 h-4" />
                {t.location.getDirections}
              </a>
              <a
                href={viewOnMapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-5 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
              >
                {t.location.viewOnMaps}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative min-h-[340px] lg:min-h-0">
            <iframe
              src={mapEmbedSrc}
              title={t.location.hq}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
