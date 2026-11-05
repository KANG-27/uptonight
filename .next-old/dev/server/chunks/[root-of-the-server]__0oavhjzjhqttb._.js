module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/sky/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/horizons/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$objects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/horizons/objects.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    // 1. Leer los parámetros como texto (todavía sin convertir)
    const latParam = searchParams.get('lat');
    const lonParam = searchParams.get('lon');
    // 2. ¿Vinieron?
    if (latParam === null || lonParam === null) {
        return Response.json({
            error: 'lat y lon son obligatorios'
        }, {
            status: 400
        });
    }
    // 3. Ahora sí, convertir a número
    const lat = Number(latParam);
    const lon = Number(lonParam);
    const alt = Number(searchParams.get('alt') ?? 0);
    // 4. ¿Son números válidos y están en rango?
    if (Number.isNaN(lat) || lat < -90 || lat > 90 || Number.isNaN(lon) || lon < -180 || lon > 180) {
        return Response.json({
            error: 'lat o lon fuera de rango'
        }, {
            status: 400
        });
    }
    const start = new Date();
    start.setUTCMinutes(0, 0, 0);
    const stop = new Date(start.getTime() + 14 * 60 * 60 * 1000);
    const objects = [];
    for (const obj of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$objects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SKY_OBJECTS"]){
        const points = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchHorizons"])({
            id: obj.id,
            lat,
            lon,
            alt,
            start,
            stop,
            step: '30 m'
        });
        objects.push({
            ...obj,
            points
        });
    }
    return Response.json(objects);
}
}),
"[project]/src/lib/horizons/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchHorizons",
    ()=>fetchHorizons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/horizons/parser.ts [app-route] (ecmascript)");
;
const BASE_URL = 'https://ssd.jpl.nasa.gov/api/horizons.api';
async function fetchHorizons(q) {
    const params = {
        format: 'text',
        COMMAND: q.id,
        MAKE_EPHEM: 'YES',
        EPHEM_TYPE: 'OBSERVER',
        CENTER: 'coord@399',
        COORD_TYPE: 'GEODETIC',
        SITE_COORD: `${q.lon},${q.lat},${q.alt}`,
        START_TIME: formatHorizonsDate(q.start),
        STOP_TIME: formatHorizonsDate(q.stop),
        STEP_SIZE: q.step,
        QUANTITIES: '4,9'
    };
    const query = Object.entries(params).map(([key, value])=>key === 'format' ? `${key}=${value}` : `${key}='${encodeURIComponent(value)}'`).join('&');
    const res = await fetch(`${BASE_URL}?${query}`);
    if (!res.ok) {
        throw new Error(`Horizons respondió ${res.status}`);
    }
    const text = await res.text();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$horizons$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseHorizons"])(text);
}
function formatHorizonsDate(d) {
    return d.toISOString().slice(0, 16).replace('T', ' ');
}
}),
"[project]/src/lib/horizons/objects.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SKY_OBJECTS",
    ()=>SKY_OBJECTS
]);
const SKY_OBJECTS = [
    {
        id: '301',
        name: 'Luna'
    },
    {
        id: '299',
        name: 'Venus'
    },
    {
        id: '499',
        name: 'Marte'
    },
    {
        id: '599',
        name: 'Júpiter'
    },
    {
        id: '699',
        name: 'Saturno'
    }
];
}),
"[project]/src/lib/horizons/parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseHorizons",
    ()=>parseHorizons
]);
const MONTHS = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
};
function parseHorizons(text) {
    const inicio = text.indexOf('$$SOE');
    const fin = text.indexOf('$$EOE');
    if (inicio === -1 || fin === -1) {
        throw new Error('Respuesta de Horizons sin datos: ' + text.slice(0, 200));
    }
    const bloque = text.slice(inicio + 5, fin);
    return bloque.split('\n').filter((line)=>line.trim() !== '').map((line)=>{
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
            daylight: symbols.includes('*')
        };
    });
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0oavhjzjhqttb._.js.map