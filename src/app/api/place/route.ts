export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return Response.json({ error: 'lat y lon son obligatorios' }, { status: 400 });
  }

  // Redondear a ~100 m: suficiente para el barrio y no expones la casa exacta
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat.toFixed(3)}&lon=${lon.toFixed(3)}&zoom=14&accept-language=es`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'UpTonight/0.1 (kevinandresrg@gmail.com)' },
    next: { revalidate: 86400 }, // caché de un día: los barrios no se mueven
  });

  if (!res.ok) {
    return Response.json({ area: null, city: null, country: null });
  }

  const data = await res.json();
  const a = data.address ?? {};

  return Response.json({
    area: a.suburb ?? a.city_district ?? a.neighbourhood ?? a.quarter ?? null,
    city: a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? null,
    country: a.country ?? null,
  });
}