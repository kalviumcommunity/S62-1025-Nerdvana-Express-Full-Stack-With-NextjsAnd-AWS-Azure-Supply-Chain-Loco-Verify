import { PrismaClient, LicenseStatus } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: any) {
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
}
