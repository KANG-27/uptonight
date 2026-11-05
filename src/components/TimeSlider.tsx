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

export function TimeSlider({ objects, hourIndex, setHourIndex }: { objects: SkyObject[]; hourIndex: number; setHourIndex: (index: number) => void }) {
  const time = objects[0]?.points[hourIndex]?.timeUTC;
  const max = Math.max((objects[0]?.points.length ?? 1) - 1, 0);
  const progress = max > 0 ? (hourIndex / max) * 100 : 0;

    return(
        <div>
            <div>
              Noche cerrada: {new Date().toLocaleDateString('es-CO', { dateStyle: 'long' })}
              <p>
                {time && new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit' }).format(new Date(time))}
              </p>
            </div>
            <input
              type="range"
              className="sky-range"
              min={0}
              max={max}
              value={hourIndex}
              onChange={(e) => setHourIndex(Number(e.target.value))}
              style={{ '--progress': `${progress}%` } as React.CSSProperties}
            />
          </div>
    )
}
