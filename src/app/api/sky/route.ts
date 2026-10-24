import { fetchHorizons } from '@/lib/horizons/client';
import { SKY_OBJECTS } from '@/lib/horizons/objects';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 1. Leer los parámetros como texto (todavía sin convertir)
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');

  // 2. ¿Vinieron?
  if (latParam === null || lonParam === null) {
    return Response.json({ error: 'lat y lon son obligatorios' }, { status: 400 });
  }

  // 3. Ahora sí, convertir a número
  const lat = Number(latParam);
  const lon = Number(lonParam);
  const alt = Number(searchParams.get('alt') ?? 0);

  // 4. ¿Son números válidos y están en rango?
  if (Number.isNaN(lat) || lat < -90 || lat > 90 || Number.isNaN(lon) || lon < -180 || lon > 180) {
    return Response.json({ error: 'lat o lon fuera de rango' }, { status: 400 });
  }

  const start = new Date();
  start.setUTCMinutes(0, 0, 0);
  const stop = new Date(start.getTime() + 14 * 60 * 60 * 1000);

  const objects = [];
  for (const obj of SKY_OBJECTS) {
    const points = await fetchHorizons({
      id: obj.id, lat, lon, alt, start, stop, step: '30 m',
    });
    objects.push({ ...obj, points });
  }

  return Response.json(objects);
}