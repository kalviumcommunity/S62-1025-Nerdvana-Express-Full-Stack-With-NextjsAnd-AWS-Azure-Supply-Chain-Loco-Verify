import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, LicenseStatus } from '@prisma/client';
import { errorHandler } from '@/lib/errorHandler';
import { authMiddleware } from '@/lib/authMiddleware';

const prisma = new PrismaClient();

// GET /api/admin/licenses - Get licenses with admin filters and approval queue
export async function GET(request: NextRequest) {
  try {
    // Apply authentication middleware - admin only
    const authResponse = await authMiddleware(request, ['OFFICIAL']);
    if (authResponse) return authResponse;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status') as LicenseStatus;
    const type = searchParams.get('type');
    const needsAttention = searchParams.get('needsAttention') === 'true';
    const skip = (page - 1) * limit;

    // Build where clause for admin filtering
    const where: any = {};
    if (status) where.status = status;
    if (type) where.licenseType = type;
    
    // Filter for licenses needing attention (expiring soon or pending)
    if (needsAttention) {
      where.OR = [
        { status: 'PENDING' },
        { status: 'PENDING_RENEWAL' },
        {
          status: 'APPROVED',
          expiresAt: {
            lte: new Date(new Date().setDate(new Date().getDate() + 30)) // Expiring in 30 days
          }
        }
      ];
    }

    // Fetch licenses with admin details
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
            email: true,
            phone: true
          }
        }
      },
      orderBy: needsAttention 
        ? [{ status: 'asc' }, { expiresAt: 'asc' }] 
        : { createdAt: 'desc' }
    });

    // Get total count and statistics
    const total = await prisma.license.count({ where });
    
    const statusStats = await prisma.license.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    const typeStats = await prisma.license.groupBy({
      by: ['licenseType'],
      _count: {
        licenseType: true
      }
    });

    // Get approval queue count
    const pendingCount = await prisma.license.count({
      where: { status: { in: ['PENDING', 'PENDING_RENEWAL'] } }
    });

    // Get expiring soon count
    const expiringSoonCount = await prisma.license.count({
      where: {
        status: 'APPROVED',
        expiresAt: {
          lte: new Date(new Date().setDate(new Date().getDate() + 30))
        }
      }
    });

    return NextResponse.json({
      data: licenses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      statistics: {
        byStatus: statusStats,
        byType: typeStats,
        pendingCount,
        expiringSoonCount,
        totalLicenses: total
      },
      filters: {
        status,
        type,
        needsAttention
      }
    });

  } catch (error) {
    return errorHandler(error);
  }
}

// POST /api/admin/licenses/bulk-action - Bulk approve/reject licenses
export async function POST(request: NextRequest) {
  try {
    // Apply authentication middleware - admin only
    const authResponse = await authMiddleware(request, ['OFFICIAL']);
    if (authResponse) return authResponse;

    const body = await request.json();
    const { licenseIds, action, reason } = body;

    if (!licenseIds || !Array.isArray(licenseIds) || !action) {
      return NextResponse.json(
        { error: 'License IDs array and action are required' },
        { status: 400 }
      );
    }

    if (!['APPROVE', 'REJECT'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be APPROVE or REJECT' },
        { status: 400 }
      );
    }

    const newStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';

    // Update licenses in bulk
    const result = await prisma.license.updateMany({
      where: {
        id: { in: licenseIds },
        status: { in: ['PENDING', 'PENDING_RENEWAL'] } // Only update pending licenses
      },
      data: {
        status: newStatus,
        reviewedAt: new Date(),
        reviewNotes: reason || `Bulk ${action.toLowerCase()}ed`
      }
    });

    return NextResponse.json({
      message: `Successfully ${action.toLowerCase()}d ${result.count} licenses`,
      data: {
        action,
        processedCount: result.count,
        totalRequested: licenseIds.length
      }
    });

  } catch (error) {
    return errorHandler(error);
  }
}
