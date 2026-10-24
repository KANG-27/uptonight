import { parseHorizons, SkyPoint } from './parser';

const BASE_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';

interface HorizonsQuery {
    id: string;     // '599'
    lat: number;
    lon: number;
    alt: number;    // en km
    start: Date;
    stop: Date;
    step: string;   // '30 m', '1 h'
}

export async function fetchHorizons(q: HorizonsQuery): Promise<SkyPoint[]> {
    const params: Record<string, string> = {
        format: 'text',
        COMMAND: q.id,
        MAKE_EPHEM: 'YES',
        EPHEM_TYPE: 'OBSERVER',
        CENTER: 'coord@399',
        COORD_TYPE: 'GEODETIC',
        SITE_COORD: `${q.lon},${q.lat},${q.alt}`,
        START_TIME: formatHorizonsDate(q.start),
        STOP_TIME: formatHorizonsDate(q.stop),
        STEP_SIZE: q.step,
        QUANTITIES: '4,9',
    };

    const query = Object.entries(params)
        .map(([key, value]) =>
            key === 'format' ? `${key}=${value}` : `${key}='${encodeURIComponent(value)}'`
        )
        .join('&');

    const res = await fetch(`${BASE_URL}?${query}`);
    if (!res.ok) {
        throw new Error(`Horizons respondió ${res.status}`);
    }

    const text = await res.text();
    return parseHorizons(text);
}

function formatHorizonsDate(d: Date): string {
    return d.toISOString().slice(0, 16).replace('T', ' ');
}