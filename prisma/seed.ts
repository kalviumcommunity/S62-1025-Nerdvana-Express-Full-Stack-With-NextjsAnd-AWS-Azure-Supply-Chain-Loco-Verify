import { PrismaClient, Role, LicenseStatus } from '@prisma/client';

// 1. Initialize the Prisma Client
const prisma = new PrismaClient();

// Helper to calculate a future date for expiry
const getExpiryDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// 2. Define the main seeding logic function
async function main() {
  console.log('Start seeding...');

  // --- Clean up existing data (Optional, but recommended for fresh seeding) ---
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
  // FIX APPLIED: Using backticks (`) for template literals
  console.log(`Created Admin User: ${adminUser.email}`);

  // --- Create Vendor Users and Licenses ---

  // VENDOR 1: Approved License
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
          expiryDate: getExpiryDate(365), // Expires in 1 year
          idProofLink: 'https://cdn.locoverify.com/docs/vendor1_id',
          shopPhotoLink: 'https://cdn.locoverify.com/photos/vendor1_shop',
        },
      },
    },
  });
  // FIX APPLIED: Using backticks (`) for template literals
  console.log(`Created Vendor 1 (Approved): ${vendor1.email}`);
  
  // VENDOR 2: Pending License (New Application)
  const vendor2 = await prisma.user.upsert({
    where: { email: 'vendor2@shop.com' },
    update: {},
    create: {
      email: 'vendor2@shop.com',
      password: 'hashed_vendor_password_123',
      name: 'Bob Smith',
      shopName: 'Bob\'s Repair Services',
      phone: '555-0202',
      role: Role.VENDOR,
      licenses: {
        create: {
          licenseType: 'General Service License',
          status: LicenseStatus.PENDING,
          applicationDate: new Date(Date.now() - 86400000), // Applied yesterday
          idProofLink: 'https://cdn.locoverify.com/docs/vendor2_id',
          shopPhotoLink: 'https://cdn.locoverify.com/photos/vendor2_shop',
        },
      },
    },
  });
  // FIX APPLIED: Using backticks (`) for template literals
  console.log(`Created Vendor 2 (Pending): ${vendor2.email}`);

  // VENDOR 3: Expired License
  const vendor3 = await prisma.user.upsert({
    where: { email: 'vendor3@shop.com' },
    update: {},
    create: {
      email: 'vendor3@shop.com',
      password: 'hashed_vendor_password_123',
      name: 'Clara Barton',
      shopName: 'Clara\'s Corner Store',
      phone: '555-0303',
      role: Role.VENDOR,
      licenses: {
        create: {
          licenseType: 'Retail Permit',
          status: LicenseStatus.EXPIRED,
          issueDate: new Date(Date.now() - 730 * 86400000), // Issued 2 years ago
          expiryDate: new Date(Date.now() - 365 * 86400000), // Expired 1 year ago
          idProofLink: 'https://cdn.locoverify.com/docs/vendor3_id',
          shopPhotoLink: 'https://cdn.locoverify.com/photos/vendor3_shop',
        },
      },
    },
  });
  // FIX APPLIED: Using backticks (`) for template literals
  console.log(`Created Vendor 3 (Expired): ${vendor3.email}`);


  console.log('Seeding finished successfully. 🌱');
}

// 3. Execute the main function, catch errors, and disconnect
main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });