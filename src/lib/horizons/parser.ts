
export interface SkyPoint {
    timeUTC: string;
    azimuth: number;
    elevation: number;
    magnitude: number | null;
    daylight: boolean;
}

const MONTHS: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

export function parseHorizons(text: string): SkyPoint[] {
    const inicio = text.indexOf('$$SOE');
    const fin = text.indexOf('$$EOE');
    if (inicio === -1 || fin === -1) {
        throw new Error('Respuesta de Horizons sin datos: ' + text.slice(0, 200));
    }
    const bloque = text.slice(inicio + 5, fin);
    return bloque
        .split('\n')
        .filter(line => line.trim() !== '')
        .map((line) => {
            // sacar las partes de la línea
            const symbols = line.slice(19, 21);
            const numbers = line.slice(21).trim().split(/\s+/).map(Number);
            const [date, time] = line.slice(1, 18).split(' ');
            const [year, month, day] = date.split('-');
            const dateUTC = `${year}-${MONTHS[month]}-${day}T${time}:00Z`;
            const mag = numbers[2];

            return {
                timeUTC: dateUTC,
                azimuth: numbers[0],
                elevation: numbers[1],
                magnitude: mag === undefined || Number.isNaN(mag) ? null : mag,
                daylight: symbols.includes('*'),
            };
        });
};

