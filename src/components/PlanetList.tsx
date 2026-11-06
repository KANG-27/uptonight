'use client';

import { direction, formatHour } from '@/lib/sky';
import { PlanetIcon } from './PlanetIcon';

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

type Visibility = 'visible' | 'low' | 'daylight' | 'below';

function visibility(p: SkyPoint): Visibility {
  if (p.elevation < 0) return 'below';
  if (p.daylight) return 'daylight';
  if (p.elevation < 10) return 'low';
  return 'visible';
}

const isUp = (p: SkyPoint) => p.elevation >= 0 && !p.daylight;

function description(points: SkyPoint[], hourIndex: number): string {
  const p = points[hourIndex];
  const state = visibility(p);

  if (state === 'visible' || state === 'low') {
    const text = `Mira al ${direction(p.azimuth).long}, a ${p.elevation.toFixed(0)}° de altura`;
    return state === 'low' ? `${text}; puede taparlo algún edificio` : text;
  }
  if (!points.some(isUp)) return 'No sale esta noche';

  const next = points.slice(hourIndex + 1).find(isUp);
  if (next) return `Sale cerca de las ${formatHour(next.timeUTC)}`;

  const prev = points.slice(0, hourIndex).findLast(isUp);
  return prev ? `Se ocultó cerca de las ${formatHour(prev.timeUTC)}` : 'No sale esta noche';
}

const LABELS: Record<Visibility, { text: string; className: string }> = {
  visible: { text: 'Visible ahora', className: 'text-[#8FD3B6]' },
  low: { text: 'Muy bajo', className: 'text-[#C9A45C]' },
  daylight: { text: 'Es de día', className: 'text-[#A8A293]' },
  below: { text: 'Bajo el horizonte', className: 'text-[#A8A293]' },
};

interface PlanetListProps {
  objects: SkyObject[];
  hourIndex: number;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
}

export function PlanetList({ objects, hourIndex, selectedId = null, onSelect }: PlanetListProps) {
  return (
    <section className="pt-6">
      <div className="flex items-baseline justify-between gap-4 border-b border-[#1C2335] pb-3">
        <h2 className="font-serif text-3xl text-[#EDE6D6]">Efemérides</h2>
        <p className="text-right text-xs text-[#A8A293]">
          Selecciona un planeta para trazar su camino en el mapa
        </p>
      </div>

      <ul>
        {objects.map((obj) => {
          const point = obj.points[hourIndex];
          if (!point) return null;

          const state = visibility(point);
          const up = state === 'visible' || state === 'low';
          const selected = selectedId === obj.id;
          const label = LABELS[state];

          return (
            <li key={obj.id} className="border-b border-[#1C2335]">
              <button
                type="button"
                onClick={() => onSelect?.(selected ? null : obj.id)}
                aria-pressed={selected}
                className={`flex w-full items-center gap-4 px-1 py-3 text-left transition-colors hover:bg-[#C9A45C]/5 ${
                  selected ? 'bg-[#C9A45C]/10' : ''
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center">
                  <PlanetIcon
                    id={obj.id}
                    size={obj.id === '699' ? 44 : 34}
                    className={`transition ${up ? '' : 'opacity-40 grayscale'}`}
                  />
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-serif text-2xl leading-tight ${
                      up ? 'text-[#EDE6D6]' : 'text-[#EDE6D6]/60'
                    }`}
                  >
                    {obj.name}
                  </span>
                  <span className="block truncate text-[13px] text-[#A8A293]">
                    {description(obj.points, hourIndex)}
                  </span>
                </span>

                <span className="shrink-0 text-right font-mono">
                  <span className="block text-[15px] text-[#EDE6D6]">
                    {up ? `${direction(point.azimuth).short} ${point.elevation.toFixed(0)}°` : '—'}
                  </span>
                  <span className={`block text-[10px] uppercase tracking-[0.15em] ${label.className}`}>
                    {label.text}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
