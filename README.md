# Loco Verify

## Problem Statement
Railway vendors (like tea stalls or bookshops) still rely on paper-based licenses and renewals. How can digital verification simplify their onboarding and compliance?

## Solution
Loco Verify automates the entire vendor license lifecycle — from application submission to verification, approval, and renewal. Vendors can easily upload necessary documents online, and railway officers can digitally verify and manage licenses efficiently.

---

## Key Features

- **Vendor Registration:** Vendors submit their ID proof, shop photo, and select license type through an intuitive form.
- **Digital Verification:** Admin users can review submitted documents and approve or reject license applications.
- **License Renewal:** Vendors can request license renewal before expiry, ensuring continuity.
- **Email/SMS Notifications:** Optional stretch goal to notify vendors of approval status or renewal reminders.

---

## Technology Stack

- **Next.js** — Frontend UI and API routes for backend logic.
- **PostgreSQL + Prisma** — For robust and scalable database management of vendor data.
- **AWS S3** — Secure storage for uploaded documents such as ID proofs and shop photos.
- **GitHub Actions** — Automated CI/CD pipeline for deployment.

---

## Folder Structure
src/
├── app/ # Routes and pages using Next.js App Router
├── components/ # Reusable UI components like forms, buttons, cards
├── lib/ # Utility functions, database connection, API helpers
├── prisma/ # Prisma schema and migration files
├── styles/ # Global and component-level CSS styles


---

## Setup Instructions

1. Clone repo and enter directory:

   ```bash
   git clone https://github.com/yourusername/loco-verify.git
   cd loco-verify

2. Install dependencies:

    npm install

3. Create .env with:

DATABASE_URL=your_postgres_connection_string
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
NEXT_PUBLIC_AWS_S3_BUCKET=your_s3_bucket_name


4. Run migrations:

npx prisma migrate dev


Start dev server:

npm run dev


Visit http://localhost:3000

Reflection

This structure keeps code modular and scalable, allowing team members to work independently on routes, components, and  logic. It supports future feature additions and smooth maintenance.

![Local app running](./screenshot.png)

## TypeScript & ESLint Configuration

Strict TypeScript Mode
Ensures better type safety and reduces runtime errors by enforcing strict rules like noImplicitAny, noUnusedLocals, and consistent casing.

ESLint + Prettier Setup

ESLint detects code issues and ensures best practices.

Prettier automatically formats code for readability.

Configurations enforce semicolons, double quotes, and prevent console logs.

Pre-Commit Hooks (Husky + lint-staged)
Automatically runs lint and formatting checks before commits, ensuring all code entering the repo is clean and consistent.
