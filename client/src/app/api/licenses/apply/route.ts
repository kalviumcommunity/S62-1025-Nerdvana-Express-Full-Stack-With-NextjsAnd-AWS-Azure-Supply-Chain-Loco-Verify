import { PrismaClient, LicenseStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { vendorId, licenseType } = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      // ✅ Step 1 — ensure vendor exists
      const vendor = await tx.user.findUnique({ where: { id: vendorId } });
      if (!vendor) throw new Error("Vendor not found");

      // ✅ business rule: Only vendors can apply
      if (vendor.role !== Role.VENDOR)
        throw new Error("Only Vendors can apply");

      // ✅ Step 2 — create license
      const license = await tx.license.create({
        data: {
          vendorId,
          licenseType,
        },
      });

      // ❌ Force rollback example
      if (licenseType === "INVALID") {
        throw new Error("Forced rollback test");
      }

      return license;
    });

    return NextResponse.json(
      { success: true, license: result },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
