const DIRECTIONS = [
  ['N', 'norte'], ['NNE', 'norte-noreste'], ['NE', 'noreste'], ['ENE', 'este-noreste'],
  ['E', 'este'], ['ESE', 'este-sureste'], ['SE', 'sureste'], ['SSE', 'sur-sureste'],
  ['S', 'sur'], ['SSO', 'sur-suroeste'], ['SO', 'suroeste'], ['OSO', 'oeste-suroeste'],
  ['O', 'oeste'], ['ONO', 'oeste-noroeste'], ['NO', 'noroeste'], ['NNO', 'norte-noroeste'],
] as const;

/** Azimut (0° = norte, 90° = este) a punto cardinal de 16 direcciones. */
export function direction(azimuth: number) {
  const i = Math.round((((azimuth % 360) + 360) % 360) / 22.5) % 16;
  return { short: DIRECTIONS[i][0], long: DIRECTIONS[i][1] };
}

export const formatHour = (iso: string) =>
  new Intl.DateTimeFormat('es-CO', { hour: 'numeric', minute: '2-digit' }).format(new Date(iso));
