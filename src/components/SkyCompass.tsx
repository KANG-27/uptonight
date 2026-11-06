'use client';

import { direction, formatHour } from '@/lib/sky';
import { PlanetIcon } from './PlanetIcon';

interface CompassObject {
    id: string;
    name: string;
    color: string;
    azimuth: number;
    elevation: number;
    timeUTC?: string;
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

interface SkyCompassProps {
    objects: CompassObject[];
    selectedId?: string | null;
    onSelect?: (id: string | null) => void;
}

const fmtDeg = (n: number) =>
    new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export function SkyCompass({ objects, selectedId = null, onSelect }: SkyCompassProps) {
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

            {/* Caminos: todos, o solo el del planeta seleccionado */}
            <svg
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
            >
                {objects
                    .filter((o) => !selectedId || o.id === selectedId)
                    .map((o) => {
                        const selected = o.id === selectedId;
                        return (
                            <g key={o.id}>
                                {/* Lo que falta: tenue y punteado */}
                                <polyline
                                    points={toTrail(o.futurePath)}
                                    fill="none"
                                    stroke="#EDE6D6"
                                    strokeOpacity={selected ? 0.45 : 0.2}
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
                                    strokeOpacity={selected ? 0.9 : 0.6}
                                    strokeWidth={selected ? 2.5 : 2}
                                    strokeLinecap="round"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </g>
                        );
                    })}
            </svg>

            {/* Los planetas: al hacer clic se seleccionan y muestran sus coordenadas */}
            {visible.map((o) => {
                const { x, y } = toXY(o.azimuth, o.elevation);
                const selected = o.id === selectedId;
                const dimmed = selectedId !== null && !selected;
                const tooltipBelow = y < 25; // cerca del borde de arriba, mostrarlo abajo

                return (
                    <div
                        key={o.id}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity ${
                            dimmed ? 'opacity-30' : ''
                        } ${selected ? 'z-20' : 'z-10'}`}
                        style={{ left: `${x}%`, top: `${y}%` }}
                    >
                        <button
                            type="button"
                            onClick={() => onSelect?.(selected ? null : o.id)}
                            aria-pressed={selected}
                            aria-label={`${o.name}: azimut ${fmtDeg(o.azimuth)}°, altura ${fmtDeg(o.elevation)}°`}
                            className={`relative flex items-center justify-center rounded-full transition-transform hover:scale-125 ${
                                selected ? 'scale-125 ring-1 ring-[#C9A45C] ring-offset-2 ring-offset-[#0E1527]' : ''
                            }`}
                        >
                            <PlanetIcon id={o.id} size={o.id === '699' ? 26 : 18} />
                        </button>

                        {!selected && (
                            <span className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap leading-tight">
                                <span className="block font-serif text-sm text-[#EDE6D6]">{o.name}</span>
                                <span className="block font-mono text-[10px] text-[#C9A45C]">
                                    {o.elevation.toFixed(0)}°
                                </span>
                            </span>
                        )}

                        {selected && (
                            <div
                                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#C9A45C]/40 bg-[#0A0F1D]/95 px-3 py-2 shadow-lg ${
                                    tooltipBelow ? 'top-full mt-3' : 'bottom-full mb-3'
                                }`}
                            >
                                <p className="font-serif text-base leading-tight text-[#EDE6D6]">{o.name}</p>
                                <p className="font-mono text-[11px] text-[#A8A293]">
                                    Az {fmtDeg(o.azimuth)}° ({direction(o.azimuth).short}) · Alt {fmtDeg(o.elevation)}°
                                </p>
                                {o.timeUTC && (
                                    <p className="font-mono text-[10px] text-[#A8A293]/80">a las {formatHour(o.timeUTC)}</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div >
    );
}