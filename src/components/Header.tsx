'use client';

export function Header({ location }: { location: { lat: number; lon: number } | null }) {

    function formatCoords(lat: number, lon: number): string {
        const fmt = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
        const ns = lat >= 0 ? 'N' : 'S';
        const eo = lon >= 0 ? 'E' : 'O';
        return `${fmt.format(Math.abs(lat))}° ${ns} · ${fmt.format(Math.abs(lon))}° ${eo}`;
    }

    return (
        <header className="flex justify-between items-start mb-6">
                <span className="text-[12px] text-[#deb453] font-medium tracking-[0.2em]">UPTONIGHT</span>
                <span className="text-[12px] text-[#A8A293]">
                    {location ? formatCoords(location.lat, location.lon) : ''}
                </span>
        </header>
    );
}