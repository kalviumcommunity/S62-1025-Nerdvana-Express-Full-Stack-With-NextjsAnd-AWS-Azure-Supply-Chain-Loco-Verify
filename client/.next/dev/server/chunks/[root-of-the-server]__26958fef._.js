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
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>logger
]);
const logger = {
    info: (message, meta)=>{
        console.log(JSON.stringify({
            level: "info",
            message,
            meta,
            timestamp: new Date().toISOString()
        }));
    },
    error: (message, meta)=>{
        console.error(JSON.stringify({
            level: "error",
            message,
            meta,
            timestamp: new Date().toISOString()
        }));
    },
    warn: (message, meta)=>{
        console.warn(JSON.stringify({
            level: "warn",
            message,
            meta,
            timestamp: new Date().toISOString()
        }));
    },
    debug: (message, meta)=>{
        console.debug(JSON.stringify({
            level: "debug",
            message,
            meta,
            timestamp: new Date().toISOString()
        }));
    }
};
}),
"[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/lib/errorHandler.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleError",
    ()=>handleError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/lib/logger.ts [app-route] (ecmascript)");
;
;
function handleError(error, context) {
    const isProd = ("TURBOPACK compile-time value", "development") === "production";
    // Determine the appropriate status code
    let statusCode = 500;
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
        errorMessage = error.message;
        // Handle different error types
        if (error.name === 'ValidationError') {
            statusCode = 400;
        } else if (error.name === 'NotFoundError') {
            statusCode = 404;
        } else if (error.name === 'UnauthorizedError') {
            statusCode = 401;
        }
    }
    // Construct the error response
    const errorResponse = {
        success: false,
        message: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : errorMessage
    };
    // Include stack trace only in development
    if (!isProd && error instanceof Error && error.stack) {
        errorResponse.stack = error.stack;
    }
    // Include additional error details in development
    if (!isProd && error instanceof Error && error.details) {
        errorResponse.details = error.details;
    }
    // Log the error with structured data
    __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error(`Error in ${context}`, {
        message: errorMessage,
        statusCode: statusCode,
        stack: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : error instanceof Error ? error.stack : "No stack",
        context: context,
        timestamp: new Date().toISOString()
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(errorResponse, {
        status: statusCode
    });
}
// Helper function to get user-friendly production messages
function getProductionMessage(statusCode) {
    const messages = {
        400: "Invalid request. Please check your input.",
        401: "Authentication required. Please log in.",
        403: "You don't have permission to access this resource.",
        404: "The requested resource was not found.",
        500: "Something went wrong. Please try again later.",
        503: "Service temporarily unavailable. Please try again later."
    };
    return messages[statusCode] || "Something went wrong. Please try again later.";
}
}),
"[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/app/api/test/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$src$2f$lib$2f$errorHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/S62-1025-Nerdvana-Express-Full-Stack-With-NextjsAnd-AWS-Azure-Supply-Chain-Loco-Verify/client/src/lib/errorHandler.ts [app-route] (ecmascript)"); // ADD THIS IMPORT
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET() {
    try {
        await prisma.$connect();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "✅ Prisma connection successful!"
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$S62$2d$1025$2d$Nerdvana$2d$Express$2d$Full$2d$Stack$2d$With$2d$NextjsAnd$2d$AWS$2d$Azure$2d$Supply$2d$Chain$2d$Loco$2d$Verify$2f$client$2f$src$2f$lib$2f$errorHandler$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleError"])(error, "GET /api/test"); // REPLACE ERROR HANDLING
    } finally{
        await prisma.$disconnect();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__26958fef._.js.map