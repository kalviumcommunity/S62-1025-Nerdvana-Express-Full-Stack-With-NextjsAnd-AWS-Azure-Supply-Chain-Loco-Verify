import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LicenseStatus } from '@prisma/client';
import { errorHandler } from '@/lib/errorHandler';
import { authMiddleware } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// GET /api/licenses - List all licenses with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Apply authentication middleware
    const authResponse = await authMiddleware(request);
    if (authResponse) return authResponse;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status') as LicenseStatus;
    const vendorId = searchParams.get('vendorId');
    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const where: any = {};
    if (status) where.status = status;
    if (vendorId) where.vendorId = vendorId;

    // Fetch licenses with pagination and filtering
    const licenses = await prisma.license.findMany({
      skip,
      take: limit,
      where,
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            businessName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Get total count for pagination info
    const total = await prisma.license.count({ where });

    return NextResponse.json({
      data: licenses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        status,
        vendorId
      }
    });

  } catch (error) {
    return errorHandler(error);
  }
}

// POST /api/licenses - Simple license creation (for admin/official use)
export async function POST(request: NextRequest) {
  try {
    // Apply authentication middleware - allow both officials and vendors
    const authResponse = await authMiddleware(request, ['OFFICIAL', 'VENDOR']);
    if (authResponse) return authResponse;

    const body = await request.json();

    // Basic validation
    if (!body.vendorId || !body.licenseType) {
      return NextResponse.json(
        { error: 'Vendor ID and license type are required' },
        { status: 400 }
      );
    }

    // Create new license (simpler version without the complex business logic in apply/)
    const license = await prisma.license.create({
      data: {
        vendorId: body.vendorId,
        licenseType: body.licenseType,
        station: body.station,
        validityPeriod: body.validityPeriod || 12,
        status: body.status || 'PENDING',
        documents: body.documents || []
      },
      include: {
        vendor: {
          select: {
            name: true,
            businessName: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: 'License created successfully',
        data: license 
      },
      { status: 201 }
    );

  } catch (error) {
    return errorHandler(error);
  }
}