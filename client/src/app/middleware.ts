import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Paths that require authentication
const protectedPaths = [
  "/api/users",
  "/api/admin",
  "/api/orders",    // Add if you have order routes
  "/api/products",  // Add if you have product routes that need auth
];

// Public paths that don't require authentication
const publicPaths = [
  "/api/auth/signup",
  "/api/auth/login",
  "/api/auth/verify", // If you have email verification
  "/api/public",      // Any other public APIs
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // Check if the current path is explicitly public
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path)
  );

  // Skip middleware for public paths
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Apply authentication for protected paths
  if (isProtectedPath) {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Access token required" },
        { status: 401 }
      );
    }

    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);

      // Add user info to request headers for API routes to use
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-role', decoded.role);

      // Restrict admin routes to Official role only
      if (pathname.startsWith("/api/admin") && decoded.role !== "Official") {
        return NextResponse.json(
          { success: false, message: "Admin access required" },
          { status: 403 }
        );
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/admin/:path*",
    "/api/orders/:path*",
    "/api/auth/:path*",
  ],
};