import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// ✅ GET route — Verify token, fetch user, and authorize by role
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing or invalid format" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };

    // 🧩 Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 🧠 Role-based access example
    if (user.role !== "Vendor" && user.role !== "Official") {
      return NextResponse.json(
        { success: false, message: "Access denied. Invalid role." },
        { status: 403 }
      );
    }

    // ✅ Success — send user info
    return NextResponse.json(
      {
        success: true,
        message: `Access granted. Hello ${user.role === "Official" ? "Official" : "Vendor"}!`,
        user,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token", details: error.message },
      { status: 403 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
