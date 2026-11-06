'use client';

interface SkyPoint {
  timeUTC: string;
  azimuth: number;
  elevation: number;
  magnitude: number | null;
  daylight: boolean;
}
interface SkyObject {
  id: string;
  name: string;
  points: SkyPoint[];
}

interface TimeSliderProps {
  objects: SkyObject[];
  hourIndex: number;
  setHourIndex: (index: number) => void;
}

const THUMB = 18; // px, igual que .sky-range::-webkit-slider-thumb

// Posición horizontal de un índice, alineada con el centro del thumb
const leftFor = (fraction: number) => `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${fraction})`;

export function TimeSlider({ objects, hourIndex, setHourIndex }: TimeSliderProps) {
  const points = objects[0]?.points ?? [];
  const max = Math.max(points.length - 1, 0);
  const progress = max > 0 ? (hourIndex / max) * 100 : 0;
  const current = points[hourIndex];

  const visibleCount = objects.filter((o) => {
    const p = o.points[hourIndex];
    return p && p.elevation >= 0 && !p.daylight;
  }).length;

  // Marcas: cada hora en punto; texto cada 2 horas
  const hourMarks = points
    .map((p, index) => ({ index, date: new Date(p.timeUTC) }))
    .filter(({ date }) => date.getMinutes() === 0);
  const labelled = hourMarks.filter((_, i) => i % 2 === 0);

  return (
    <div className="pt-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#A8A293]">
            {current?.daylight ? 'De día' : 'Noche cerrada'}
          </p>
          <p className="font-serif text-5xl leading-none text-[#EDE6D6]">
            {current &&
              new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit' }).format(
                new Date(current.timeUTC)
              )}
          </p>
        </div>
        <p className="pb-1 text-xs text-[#A8A293]">
          {visibleCount === 1 ? '1 planeta a la vista' : `${visibleCount} planetas a la vista`} a esta hora
        </p>
      </div>

      <input
        type="range"
        className="sky-range mt-2"
        min={0}
        max={max}
        value={hourIndex}
        onChange={(e) => setHourIndex(Number(e.target.value))}
        aria-label="Hora de la noche"
        style={{ '--progress': `${progress}%` } as React.CSSProperties}
      />

      {/* Marcas de cada hora */}
      <div className="relative h-2">
        {hourMarks.map(({ index }) => (
          <span
            key={index}
            className={`absolute top-0 h-1.5 w-px -translate-x-1/2 ${
              index <= hourIndex ? 'bg-[#C9A45C]' : 'bg-[#262D44]'
            }`}
            style={{ left: leftFor(max ? index / max : 0) }}
          />
        ))}
      </div>

      {/* Horas: cada una es un botón que lleva el slider a esa hora */}
      <div className="relative h-6">
        {labelled.map(({ index, date }, i) => {
          const h = date.getHours();
          const period = h < 12 ? 'AM' : 'PM';
          const prev = labelled[i - 1]?.date.getHours();
          const showPeriod = i === 0 || i === labelled.length - 1 || (prev !== undefined && (prev < 12) !== (h < 12));
          const active = index === hourIndex;

          return (
            <button
              key={index}
              type="button"
              onClick={() => setHourIndex(index)}
              className={`absolute top-0 -translate-x-1/2 whitespace-nowrap rounded px-1 font-mono text-[11px] transition-colors hover:text-[#EDE6D6] ${
                active ? 'text-[#C9A45C]' : 'text-[#A8A293]'
              }`}
              style={{ left: leftFor(max ? index / max : 0) }}
            >
              {h % 12 || 12}
              {showPeriod && ` ${period}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
