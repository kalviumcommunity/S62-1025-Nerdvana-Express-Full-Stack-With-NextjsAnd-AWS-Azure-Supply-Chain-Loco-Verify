import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$connect();
    return NextResponse.json({ message: "✅ Prisma connection successful!" });
  } catch (error) {
    console.error("❌ Prisma connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
