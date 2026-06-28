import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS } from '../data';
import { ArrowRightIcon, VillaIcon, PoolIcon, FlooringIcon } from '../Icons';
import { useT, useLocale } from '../../../hooks/useT';

const ProjectIcons: Record<string, React.ReactNode> = {
  villa: <VillaIcon className="w-4 h-4" />,
  pool: <PoolIcon className="w-4 h-4" />,
  flooring: <FlooringIcon className="w-4 h-4" />,
};

type SliderProps = { before: string; after: string; title: string; beforeLabel: string; afterLabel: string };

const BeforeAfterSlider: React.FC<SliderProps> = ({ before, after, title, beforeLabel, afterLabel }) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-56 cursor-ew-resize select-none overflow-hidden rounded-xl"
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={(e) => { if (dragging) move(e.clientX); }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      <Image src={after} alt={`After: ${title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`Before: ${title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded" dir="ltr">{beforeLabel}</div>
      </div>
      <div className="absolute bottom-3 right-3 bg-orange text-white text-xs font-bold px-2 py-1 rounded z-10" dir="ltr">{afterLabel}</div>
      <div
        className="absolute inset-y-0 z-10 flex items-center justify-center"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-0.5 h-full bg-white/80" />
        <div className="absolute w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-navy font-bold text-sm pointer-events-none">
          ↔
        </div>
      </div>
    </div>
  );
};

type ProjectItem = typeof PROJECTS[0] & { translatedTitle: string; translatedCategory: string; translatedDesc: string };

const ProjectCard: React.FC<{ project: ProjectItem; viewProject: string }> = ({ project, viewProject }) => (
  <div className="al-card flex-shrink-0 w-full">
    <div className="relative">
      <BeforeAfterSlider
        before={project.before}
        after={project.after}
        title={project.translatedTitle}
        beforeLabel="BEFORE"
        afterLabel="AFTER"
      />
      <div className="absolute top-3 start-3 z-20 flex items-center gap-1.5 bg-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
        {ProjectIcons[project.icon]}
        {project.translatedCategory}
      </div>
    </div>
    <div className="p-5">
      <p className="text-gray-600 text-sm leading-relaxed mb-3">{project.translatedDesc}</p>
      <Link href="/projects" className="learn-more-link">
        {viewProject} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
      </Link>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const t = useT();
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const total = PROJECTS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const enriched: ProjectItem[] = PROJECTS.map((p, i) => ({
    ...p,
    translatedTitle: t.projects.items[i]?.title ?? p.title,
    translatedCategory: t.projects.items[i]?.category ?? p.category,
    translatedDesc: t.projects.items[i]?.description ?? p.description,
  }));

  return (
    <section id="projects" className="al-section bg-gray-50">
      <div className="al-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="al-eyebrow mb-3">{t.projects.eyebrow}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-navy">
              {t.projects.heading1}<br />{t.projects.heading2}
            </h2>
            <p className="text-gray-500 mt-3">{t.projects.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 border-2 border-navy text-navy font-semibold px-6 py-3 rounded-full hover:bg-navy hover:text-white transition-all duration-200 text-sm"
            >
              {t.projects.viewAll} <ArrowRightIcon className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={isRtl ? next : prev}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={isRtl ? prev : next}
                aria-label="Next project"
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {enriched.map((project) => (
            <ProjectCard key={project.title} project={project} viewProject={t.projects.viewProject} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-400 ease-in-out"
            style={{ transform: `translateX(${(isRtl ? current : -current) * 100}%)` }}
          >
            {enriched.map((project) => (
              <div key={project.title} className="w-full flex-shrink-0 px-1">
                <ProjectCard project={project} viewProject={t.projects.viewProject} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={isRtl ? next : prev}
            aria-label="Previous"
            className="md:hidden w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'bg-orange w-6 h-2.5' : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
                }`}
              />
            ))}
          </div>

          <button
            onClick={isRtl ? prev : next}
            aria-label="Next"
            className="md:hidden w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange hover:text-orange transition-colors"
          >
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
