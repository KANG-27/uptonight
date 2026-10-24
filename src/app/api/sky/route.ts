import { fetchHorizons } from '@/lib/horizons/client';

export async function GET() {
  const now = new Date();
  now.setUTCMinutes(0, 0, 0);
  const later = new Date(now.getTime() + 12 * 60 * 60 * 1000); // +12 horas

  const points = await fetchHorizons({
    id: '599',
    lat: 4.732122,
    lon: -74.116631,
    alt: 2.55,
    start: now,
    stop: later,
    step: '1 h',
  });

  return Response.json(points);
}