// prisma/seed.ts
import { PrismaClient, Role, LicenseStatus } from '@prisma/client';

const prisma = new PrismaClient();

const getExpiryDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

async function main() {
  console.log('Start seeding...');

  await prisma.license.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleaned up existing User and License records.');
  
  // --- Create Admin User ---
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@locoverify.com' },
    update: {},
    create: {
      email: 'admin@locoverify.com',
      password: 'hashed_admin_password_123',
      name: 'System Administrator',
      role: Role.ADMIN,
    },
  });
  console.log(`Created Admin User: ${adminUser.email}`);

  // --- Create Vendor Users and Licenses ---
  const vendor1 = await prisma.user.upsert({
    where: { email: 'vendor1@shop.com' },
    update: {},
    create: {
      email: 'vendor1@shop.com',
      password: 'hashed_vendor_password_123',
      name: 'Jane Doe',
      shopName: 'Jane\'s Fresh Produce',
      phone: '555-0101',
      role: Role.VENDOR,
      licenses: {
        create: {
          licenseType: 'Food Vendor Permit',
          status: LicenseStatus.APPROVED,
          issueDate: new Date(),
          expiryDate: getExpiryDate(365),
          idProofLink: 'https://cdn.locoverify.com/docs/vendor1_id',
          shopPhotoLink: 'https://cdn.locoverify.com/photos/vendor1_shop',
        },
      },
    },
  });
  console.log(`Created Vendor 1 (Approved): ${vendor1.email}`);
  
  // ... rest of your seed code
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });