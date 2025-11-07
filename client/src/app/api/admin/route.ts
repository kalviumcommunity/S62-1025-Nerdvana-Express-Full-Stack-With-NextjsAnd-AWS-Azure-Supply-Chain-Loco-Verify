import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };

    // ✅ Restrict to Official users only
    if (decoded.role !== "Official") {
      return NextResponse.json(
        { success: false, message: "Access denied. Officials only." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Welcome Official! You have full access." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin route error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token", details: error.message },
      { status: 403 }
    );
  }
}
