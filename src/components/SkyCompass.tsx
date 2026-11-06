'use client';

interface CompassObject {
    id: string;
    name: string;
    color: string;
    azimuth: number;
    elevation: number;
    pastPath: { azimuth: number; elevation: number }[];
    futurePath: { azimuth: number; elevation: number }[];
}

function toXY(azimuth: number, elevation: number) {
    const r = (90 - elevation) / 90 * 50;
    const rad = (azimuth * Math.PI) / 180;
    return {
        x: 50 + Math.sin(rad) * r,
        y: 50 - Math.cos(rad) * r,
    };
}

function toTrail(path: { azimuth: number; elevation: number }[]): string {
    return path
        .filter((p) => p.elevation >= 0)          // solo lo que está sobre el horizonte
        .map((p) => {
            const { x, y } = toXY(p.azimuth, p.elevation);
            return `${x},${y}`;
        })
        .join(' ');
}

export function SkyCompass({ objects }: { objects: CompassObject[] }) {
    const visible = objects.filter((o) => o.elevation >= 0);
    const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
    const numbers = Array.from({ length: 12 }, (_, i) => i * 30).filter((n) => n % 90 !== 0);

    return (
        <div className="relative mx-auto aspect-square w-full max-w-130">
            <div className="absolute inset-0 rounded-full border border-[#C9A45C]/60 bg-[#0E1527]" />

            {/* Anillos de 30° y 60° de elevación */}
            <div className="absolute inset-[4.67%] rounded-full border border-[#C9A45C]/50" />
            <div className="absolute inset-[16.67%] rounded-full border border-dashed border-[#C9A45C]/20" />
            <div className="absolute inset-[33.33%] rounded-full border border-dashed border-[#C9A45C]/20" />

            {/* Puntos cardinales */}
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[#C9A45C]">N</span>
            <span className="absolute -right-7 top-1/2 -translate-y-1/2 text-[#EDE6D6]">E</span>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[#EDE6D6]">S</span>
            <span className="absolute -left-7 top-1/2 -translate-y-1/2 text-[#EDE6D6]">O</span>

            {/* Cruz del cenit */}
            <div className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-[#C9A45C]/60" />
            <div className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-[#C9A45C]/60" />

            {ticks.map((deg) => (
                <div
                    key={deg}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${deg}deg)` }}
                >
                    <div
                        className={`absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#C9A45C] ${deg % 15 === 0 ? 'h-3' : 'h-1.5'
                            }`}
                    />
                </div>
            ))}

            {numbers.map((number) => (
                <div
                    key={number}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${number}deg)` }}
                >
                    <span
                        className="absolute -top-6 left-1/2 text-[11px] text-[#A8A293]"
                        style={{ transform: `translateX(-50%) rotate(${-number}deg)` }}
                    >
                        {number}
                    </span>
                </div>
            ))}

            {/* Los planetas */}
            {visible.map((o) => {
                const { x, y } = toXY(o.azimuth, o.elevation);
                return (
                    <div
                        key={o.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: o.color }} />
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm text-[#EDE6D6]">
                            {o.name}
                        </span>
                    </div>
                );
            })}
            <svg
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                {objects.map((o) => (
                    <g key={o.id}>
                        {/* Lo que falta: tenue y punteado */}
                        <polyline
                            points={toTrail(o.futurePath)}
                            fill="none"
                            stroke="#EDE6D6"
                            strokeOpacity={0.2}
                            strokeWidth={1.5}
                            strokeDasharray="2 4"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Lo recorrido: del color del planeta, más visible */}
                        <polyline
                            points={toTrail(o.pastPath)}
                            fill="none"
                            stroke={o.color}
                            strokeOpacity={0.6}
                            strokeWidth={2}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </g>
                ))}
            </svg>
        </div >
    );
}