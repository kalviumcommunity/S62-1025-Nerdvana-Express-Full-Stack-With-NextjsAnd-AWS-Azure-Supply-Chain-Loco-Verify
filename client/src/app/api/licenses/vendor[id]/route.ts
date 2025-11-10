import { PrismaClient, LicenseStatus } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface RouteParams {
  id: string;
}

export async function GET(_req: Request, context: { params: RouteParams }) {
  const { id } = context.params;

  try {
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

    return NextResponse.json({ success: true, licenses }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
