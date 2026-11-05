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

export function PlanetList({ objects, hourIndex }: { objects: SkyObject[]; hourIndex: number }) {

    function getStatus(point: SkyPoint): string {
    if (point.elevation < 0) {
      return 'Bajo el horizonte';
    }
    if (point.daylight) {
      return 'Es de día no se ve';
    }
    if (point.elevation < 10) {
      return `Muy bajo (${point.elevation.toFixed(0)}°), puede taparlo algún edificio`;
    }
    return `Visible: mira a ${point.azimuth.toFixed(0)}°, a ${point.elevation.toFixed(0)}° de altura`;
  }


    return (
        <ul className="space-y-3">
            {objects.map((obj) => (
              <li key={obj.id} className="border rounded-lg p-4">
                <p className="font-medium">{obj.name}</p>
                <p className="text-sm text-gray-500">{getStatus(obj.points[hourIndex])}</p>
              </li>
            ))}
          </ul>
    );
}