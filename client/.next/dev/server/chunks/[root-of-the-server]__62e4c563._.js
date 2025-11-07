module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/app/api/admin/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
;
;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
async function GET(request) {
    try {
        const authHeader = request.headers.get("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Authorization token missing"
            }, {
                status: 401
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].verify(token, JWT_SECRET);
        // ✅ Restrict to Official users only
        if (decoded.role !== "Official") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Access denied. Officials only."
            }, {
                status: 403
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Welcome Official! You have full access."
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Admin route error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Invalid or expired token",
            details: error.message
        }, {
            status: 403
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__62e4c563._.js.map