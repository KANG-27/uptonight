'use client';

import { useEffect, useState } from 'react';

interface SkyPoint {
  timeUTC: string;
  azimuth: number;
  elevation: number;
  magnitude: number | null;
  daylight: boolean;
}

interface SkyObject {
  id: string;
  name: string;
  points: SkyPoint[];
}

export default function Home() {
  const [objects, setObjects] = useState<SkyObject[]>([]);
  const [status, setStatus] = useState<'locating' | 'loading' | 'ready' | 'error'>('locating');
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setStatus('loading');
        const { latitude, longitude, altitude } = pos.coords;
        const alt = (altitude ?? 0) / 1000; // el navegador da metros, Horizons quiere km
        try {
          const res = await fetch(`/api/sky?lat=${latitude}&lon=${longitude}&alt=${alt}`);
          if (!res.ok) throw new Error((await res.json()).error);
          setObjects(await res.json());
          setStatus('ready');
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Error desconocido');
          setStatus('error');
        }
      },
      () => {
        setError('Necesitamos tu ubicación para saber qué cielo ves');
        setStatus('error');
      }
    );
  }, []);

  if (status === 'locating') return <p className="p-8">Buscando tu ubicación…</p>;
  if (status === 'loading') return <p className="p-8">Consultando a la NASA…</p>;
  if (status === 'error') return <p className="p-8 text-red-500">{error}</p>;

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">UpTonight</h1>
      <ul className="space-y-3">
        {objects.map((obj) => (
          <li key={obj.id} className="border rounded-lg p-4">
            <p className="font-medium">{obj.name}</p>
            {/* TODO: mostrar si es visible ahora y hacia dónde mirar */}
          </li>
        ))}
      </ul>
    </main>
  );
}