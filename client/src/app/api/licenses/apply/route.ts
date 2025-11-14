import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { handleError } from "../../../../lib/errorHandler"; // ADD THIS IMPORT

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { vendorId, licenseType } = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      // ✅ Step 1 — ensure vendor exists
      const vendor = await tx.user.findUnique({ where: { id: vendorId } });
      if (!vendor) {
        const error = new Error("Vendor not found");
        error.name = "NotFoundError";
        throw error;
      }

      // ✅ business rule: Only vendors can apply
      if (vendor.role !== Role.VENDOR) {
        const error = new Error("Only Vendors can apply");
        error.name = "ValidationError";
        throw error;
      }

      // ✅ Step 2 — create license
      const license = await tx.license.create({
        data: {
          vendorId,
          licenseType,
        },
      });

      // ❌ Force rollback example
      if (licenseType === "INVALID") {
        const error = new Error("Forced rollback test");
        error.name = "ValidationError";
        throw error;
      }

      return license;
    });

    return NextResponse.json(
      { success: true, license: result },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "POST /api/licenses/apply"); // REPLACE ERROR HANDLING
  }
}
