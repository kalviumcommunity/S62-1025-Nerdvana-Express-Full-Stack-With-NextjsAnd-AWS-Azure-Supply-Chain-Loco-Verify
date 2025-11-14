import { PrismaClient, LicenseStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { handleError } from "../../../../lib/errorHandler"; // ADD THIS IMPORT

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    // ADD TRY BLOCK
    const { id } = params;

    const licenses = await prisma.license.findMany({
      where: { vendorId: id, status: LicenseStatus.APPROVED },
      select: {
        id: true,
        licenseType: true,
        expiryDate: true,
      },
      orderBy: {
        applicationDate: "desc",
      },
      take: 10,
    });

    return NextResponse.json({ licenses });
  } catch (error) {
    return handleError(error, "GET /api/licenses/vendor/[id]"); // ADD ERROR HANDLING
  } finally {
    await prisma.$disconnect(); // ADD FINALLY BLOCK
  }
}
