import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/errorHandler";

// The middleware attaches headers x-user-id and x-user-role
// So we can read them directly here.

export async function POST(req: NextRequest) {
  try {
    const vendorId = req.headers.get("x-user-id");
    const role = req.headers.get("x-user-role");

    if (!vendorId) {
      return NextResponse.json(
        { error: "Authorization required" },
        { status: 401 }
      );
    }

    if (role !== "Vendor" && role !== "VENDOR") {
      return NextResponse.json(
        { error: "Only vendors can apply" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { licenseType, shopName, contactName, contactEmail, contactPhone } =
      body;

    if (!licenseType) {
      return NextResponse.json(
        { error: "License type is required" },
        { status: 400 }
      );
    }

    // Create license record
    const license = await prisma.license.create({
      data: {
        vendorId,
        licenseType,
        shopName,
        contactName,
        contactEmail,
        contactPhone,
      },
    });

    return NextResponse.json({ id: license.id }, { status: 201 });
  } catch (error) {
    return handleError(error, "POST /api/licenses/apply");
  }
}
