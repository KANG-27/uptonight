'use client';

import { useId } from 'react';

/**
 * Mini modelos de cada cuerpo, dibujados en SVG con degradados
 * (sin imágenes externas). El id es el de Horizons.
 */
export function PlanetIcon({ id, size = 36, className = '' }: { id: string; size?: number; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const p = (name: string) => `${uid}-${name}`;
  const isSaturn = id === '699';

  // Luz que viene de arriba a la izquierda: da volumen a la esfera
  const shade = (
    <>
      <radialGradient id={p('shade')} cx="35%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
        <stop offset="45%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
      </radialGradient>
      <clipPath id={p('clip')}>
        <circle cx="50" cy="50" r="40" />
      </clipPath>
    </>
  );

  let body: React.ReactNode;

  switch (id) {
    case '301': // Luna
      body = (
        <>
          <defs>
            {shade}
            <radialGradient id={p('base')} cx="40%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#e9e6df" />
              <stop offset="100%" stopColor="#9c978d" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('base')})`} />
          <g clipPath={`url(#${p('clip')})`} fill="#7d786f" fillOpacity="0.55">
            <ellipse cx="38" cy="38" rx="12" ry="9" />
            <ellipse cx="58" cy="32" rx="8" ry="6" />
            <ellipse cx="62" cy="55" rx="11" ry="8" />
            <ellipse cx="42" cy="62" rx="7" ry="5" />
            <circle cx="70" cy="72" r="3" />
            <circle cx="30" cy="52" r="2.5" />
            <circle cx="52" cy="76" r="2" />
          </g>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('shade')})`} />
        </>
      );
      break;

    case '299': // Venus
      body = (
        <>
          <defs>
            {shade}
            <linearGradient id={p('base')} x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0%" stopColor="#fbecc4" />
              <stop offset="50%" stopColor="#e8c98a" />
              <stop offset="100%" stopColor="#c99b56" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('base')})`} />
          <g clipPath={`url(#${p('clip')})`} fill="none" stroke="#fff6dc" strokeOpacity="0.35" strokeWidth="4">
            <path d="M5 35 Q30 25 55 38 T100 30" />
            <path d="M0 55 Q35 45 60 58 T100 52" />
            <path d="M5 74 Q35 66 60 76 T100 70" />
          </g>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('shade')})`} />
        </>
      );
      break;

    case '499': // Marte
      body = (
        <>
          <defs>
            {shade}
            <radialGradient id={p('base')} cx="40%" cy="38%" r="70%">
              <stop offset="0%" stopColor="#f0956a" />
              <stop offset="100%" stopColor="#a84a26" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('base')})`} />
          <g clipPath={`url(#${p('clip')})`}>
            <g fill="#6e2b14" fillOpacity="0.45">
              <path d="M20 48 Q35 40 48 50 Q58 58 75 50 Q70 62 52 64 Q32 66 20 48Z" />
              <ellipse cx="66" cy="34" rx="9" ry="5" />
              <ellipse cx="34" cy="72" rx="8" ry="4" />
            </g>
            <ellipse cx="50" cy="12" rx="16" ry="6" fill="#fff" fillOpacity="0.85" />
          </g>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('shade')})`} />
        </>
      );
      break;

    case '599': // Júpiter
      body = (
        <>
          <defs>{shade}</defs>
          <g clipPath={`url(#${p('clip')})`}>
            <rect x="0" y="0" width="100" height="100" fill="#e2c9a3" />
            <rect x="0" y="22" width="100" height="7" fill="#b9875c" />
            <rect x="0" y="34" width="100" height="5" fill="#f1e2c6" />
            <rect x="0" y="42" width="100" height="9" fill="#a8704a" />
            <rect x="0" y="55" width="100" height="6" fill="#f1e2c6" />
            <rect x="0" y="63" width="100" height="8" fill="#b9875c" />
            <rect x="0" y="75" width="100" height="5" fill="#cfa880" />
            <ellipse cx="64" cy="60" rx="8" ry="4.5" fill="#b4502e" />
          </g>
          <circle cx="50" cy="50" r="40" fill={`url(#${p('shade')})`} />
        </>
      );
      break;

    case '699': // Saturno
      body = (
        <>
          <defs>
            {shade}
            <linearGradient id={p('base')} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f3e0b0" />
              <stop offset="50%" stopColor="#ddbf83" />
              <stop offset="100%" stopColor="#b8945a" />
            </linearGradient>
          </defs>
          <g transform="rotate(-18 50 50)">
            {/* Mitad trasera del anillo */}
            <path d="M5 50 A45 13 0 0 1 95 50" fill="none" stroke="#cdb27a" strokeWidth="6" strokeOpacity="0.8" />
            <path d="M5 50 A45 13 0 0 1 95 50" fill="none" stroke="#0a0f1d" strokeWidth="1" strokeOpacity="0.6" />
          </g>
          <g transform="translate(50 50) scale(0.62) translate(-50 -50)">
            <circle cx="50" cy="50" r="40" fill={`url(#${p('base')})`} />
            <g clipPath={`url(#${p('clip')})`} fill="#a8854e" fillOpacity="0.35">
              <rect x="0" y="36" width="100" height="6" />
              <rect x="0" y="56" width="100" height="5" />
            </g>
            <circle cx="50" cy="50" r="40" fill={`url(#${p('shade')})`} />
          </g>
          <g transform="rotate(-18 50 50)">
            {/* Mitad delantera del anillo, pasa por encima del planeta */}
            <path d="M5 50 A45 13 0 0 0 95 50" fill="none" stroke="#e6cf98" strokeWidth="6" />
            <path d="M5 50 A45 13 0 0 0 95 50" fill="none" stroke="#0a0f1d" strokeWidth="1" strokeOpacity="0.6" />
          </g>
        </>
      );
      break;

    default:
      body = <circle cx="50" cy="50" r="40" fill="#C9A45C" />;
  }

  return (
    <svg
      viewBox={isSaturn ? '0 0 100 100' : '8 8 84 84'}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {body}
    </svg>
  );
}
