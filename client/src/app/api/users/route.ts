import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token missing or invalid format" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🧠 Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };

    // 🧩 Fetch user from DB (optional but recommended)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Access granted. Token is valid.", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { error: "Invalid or expired token", details: error.message },
      { status: 403 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
