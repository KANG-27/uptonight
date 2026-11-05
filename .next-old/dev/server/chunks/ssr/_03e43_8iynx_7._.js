(()=>{"use strict";module.exports = [
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function Home() {
    const [objects, setObjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [place, setPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [hourIndex, setHourIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('locating');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        navigator.geolocation.getCurrentPosition(async (pos)=>{
            setStatus('loading');
            const { latitude, longitude, altitude } = pos.coords;
            const alt = (altitude ?? 0) / 1000; // el navegador da metros, Horizons quiere km
            fetch(`/api/place?lat=${latitude}&lon=${longitude}`).then((r)=>r.json()).then(setPlace).catch(()=>setPlace(null));
            setLocation({
                lat: latitude,
                lon: longitude,
                alt: alt
            });
            try {
                const res = await fetch(`/api/sky?lat=${latitude}&lon=${longitude}&alt=${alt}`);
                if (!res.ok) throw new Error((await res.json()).error);
                setObjects(await res.json());
                setStatus('ready');
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Error desconocido');
                setStatus('error');
            }
        }, ()=>{
            setError('Necesitamos tu ubicación para saber qué cielo ves');
            setStatus('error');
        });
    }, []);
    if (status === 'locating') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-8",
        children: "Buscando tu ubicación…"
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 56,
        columnNumber: 37
    }, this);
    if (status === 'loading') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-8",
        children: "Consultando a la NASA…"
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 57,
        columnNumber: 36
    }, this);
    if (status === 'error') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "p-8 text-red-500",
        children: error
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 58,
        columnNumber: 34
    }, this);
    function getStatus(point) {
        if (point.elevation < 0) {
            return 'Bajo el horizonte';
        }
        if (point.daylight) {
            return 'Es de día no se ve';
        }
        if (point.elevation < 10) {
            return `Muy bajo (${point.elevation.toFixed(0)}°), puede taparlo algún edificio`;
        }
        return `Visible: mira a ${point.azimuth.toFixed(0)}°, a ${point.elevation.toFixed(0)}° de altura`;
    }
    function formatCoords(lat, lon) {
        const fmt = new Intl.NumberFormat('es-CO', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        });
        const ns = lat >= 0 ? 'N' : 'S';
        const eo = lon >= 0 ? 'E' : 'O';
        return `${fmt.format(Math.abs(lat))}° ${ns} · ${fmt.format(Math.abs(lon))}° ${eo}`;
    }
    function nightLabel(now = new Date()) {
        // Antes de las 6 a. m., "esta noche" empezó ayer
        const start = new Date(now);
        if (now.getHours() < 6) start.setDate(start.getDate() - 1);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        const weekday = (d)=>new Intl.DateTimeFormat('es-CO', {
                weekday: 'long'
            }).format(d);
        const month = (d)=>new Intl.DateTimeFormat('es-CO', {
                month: 'long'
            }).format(d);
        const capitalize = (s)=>s.charAt(0).toUpperCase() + s.slice(1);
        const from = `${capitalize(weekday(start))} ${start.getDate()}`;
        const to = `${weekday(end)} ${end.getDate()} de ${month(end)}`;
        return start.getMonth() === end.getMonth() ? `${from} al ${to}` : `${from} de ${month(start)} al ${to}`;
    }
    const placeName = place?.area ?? place?.city ?? 'tu ubicación';
    const time = objects[0]?.points[hourIndex]?.timeUTC;
    const max = Math.max((objects[0]?.points.length ?? 1) - 1, 0);
    const progress = max > 0 ? hourIndex / max * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 bg-[#0A0F1D]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-start mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-[#deb453] font-medium tracking-[0.2em]",
                        children: "UPTONIGHT"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-[#A8A293]",
                        children: location ? formatCoords(location.lat, location.lon) : ''
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: [
                    "El cielo de esta noche sobre ",
                    placeName
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-[#A8A293]",
                children: nightLabel()
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "Noche cerrada: ",
                            new Date().toLocaleDateString('es-CO', {
                                dateStyle: 'long'
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: time && new Intl.DateTimeFormat('es-CO', {
                                    hour: 'numeric',
                                    minute: '2-digit'
                                }).format(new Date(time))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        className: "sky-range",
                        min: 0,
                        max: max,
                        value: hourIndex,
                        onChange: (e)=>setHourIndex(Number(e.target.value)),
                        style: {
                            '--progress': `${progress}%`
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "space-y-3",
                children: objects.map((obj)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "border rounded-lg p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: obj.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: getStatus(obj.points[hourIndex])
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 141,
                                columnNumber: 13
                            }, this)
                        ]
                    }, obj.id, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
}),
];})()

//# sourceMappingURL=_03e43_8iynx_7._.js.map