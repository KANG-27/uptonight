'use client';

import { Header } from '@/components/Header';
import { PlanetList } from '@/components/PlanetList';
import { SkyCompass } from '@/components/SkyCompass';
import { TimeSlider } from '@/components/TimeSlider';
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
  const [place, setPlace] = useState<{ area: string | null; city: string | null } | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number; alt: number | null } | null>(null);
  const [hourIndex, setHourIndex] = useState(0);
  const [status, setStatus] = useState<'locating' | 'loading' | 'ready' | 'error'>('locating');
  const [error, setError] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setStatus('loading');
        const { latitude, longitude, altitude } = pos.coords;
        const alt = (altitude ?? 0) / 1000; // el navegador da metros, Horizons quiere km
        fetch(`/api/place?lat=${latitude}&lon=${longitude}`)
          .then((r) => r.json())
          .then(setPlace)
          .catch(() => setPlace(null));

        setLocation({ lat: latitude, lon: longitude, alt: alt });
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




  function nightLabel(now: Date = new Date()): string {
    // Antes de las 6 a. m., "esta noche" empezó ayer
    const start = new Date(now);
    if (now.getHours() < 6) start.setDate(start.getDate() - 1);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const weekday = (d: Date) => new Intl.DateTimeFormat('es-CO', { weekday: 'long' }).format(d);
    const month = (d: Date) => new Intl.DateTimeFormat('es-CO', { month: 'long' }).format(d);
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const from = `${capitalize(weekday(start))} ${start.getDate()}`;
    const to = `${weekday(end)} ${end.getDate()} de ${month(end)}`;

    return start.getMonth() === end.getMonth()
      ? `${from} al ${to}`
      : `${from} de ${month(start)} al ${to}`;
  }

  const placeName = place?.area ?? place?.city ?? 'tu ubicación';





  return (
    <main className="min-h-screen p-8 bg-[#0A0F1D] text-[#EDE6D6]">

      <Header location={location} />

      <section className="grid grid-cols-2 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h1>El cielo de esta noche sobre {placeName}</h1>
          <p className="text-sm text-[#A8A293]">
            {nightLabel()}
          </p>

          <TimeSlider objects={objects} hourIndex={hourIndex} setHourIndex={setHourIndex} />
          <PlanetList objects={objects} hourIndex={hourIndex} />
        </div>

        <div className="relative w-full aspect-square">
          <SkyCompass
            objects={objects.map((obj) => ({
              id: obj.id,
              name: obj.name,
              color: '#E07A5A',
              azimuth: obj.points[hourIndex].azimuth,
              elevation: obj.points[hourIndex].elevation,
              pastPath: obj.points.slice(0, hourIndex + 1),   // desde el inicio hasta ahora
              futurePath: obj.points.slice(hourIndex),        // desde ahora hasta el final
            }))}
          />
        </div>

      </section>
    </main>
  );
}