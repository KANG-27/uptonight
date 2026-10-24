import { readFileSync } from 'fs';
import { join } from 'path';
import { test, expect } from 'vitest';
import { parseHorizons } from './parser';

const load = (name: string) =>
    readFileSync(join(process.cwd(), 'src/lib/horizons/fixtures', name), 'utf8');

const jupiter = parseHorizons(load('jupiter.txt'));
const mars = parseHorizons(load('mars.txt'));

test('Jupiter tiene 13 filas', () => expect(jupiter).toHaveLength(13));

test('Júpiter a las 07:00 UTC', () =>
    expect(jupiter[7]).toEqual({
        timeUTC: '2026-10-25T07:00:00Z',
        azimuth: 76.231502,
        elevation: 9.445335,
        magnitude: -1.969,
        daylight: false,
    }));

test('detecta el día', () => expect(jupiter[11].daylight).toBe(true));

test('Marte sin magnitud', () => expect(mars[0].magnitude).toBeNull());