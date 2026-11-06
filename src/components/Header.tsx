'use client';

export function Header({ location }: { location: { lat: number; lon: number } | null }) {

    function formatCoords(lat: number, lon: number): string {
        const fmt = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        const ns = lat >= 0 ? 'N' : 'S';
        const eo = lon >= 0 ? 'E' : 'O';
        return `${fmt.format(Math.abs(lat))}° ${ns} · ${fmt.format(Math.abs(lon))}° ${eo}`;
    }

    return (
        <header className="mb-10 flex items-start justify-between border-b border-[#1C2335] pb-4 font-mono">
                <span className="text-[11px] tracking-[0.25em] text-[#C9A45C]">UPTONIGHT</span>
                <span className="text-[11px] tracking-[0.1em] text-[#A8A293]">
                    {location ? formatCoords(location.lat, location.lon) : ''}
                </span>
        </header>
    );
}