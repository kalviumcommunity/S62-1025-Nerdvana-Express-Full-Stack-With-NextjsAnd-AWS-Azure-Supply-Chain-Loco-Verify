# Loco Verify

## Problem Statement
Railway vendors such as tea stalls and bookshops still depend on manual, paper-based processes for license applications and renewals. How can digitizing this workflow improve efficiency, transparency, and accessibility for both vendors and railway officers?

## Solution
Loco Verify streamlines the entire vendor license management process — from initial registration to verification, approval, and periodic renewal. Vendors can upload essential documents online, while officials can seamlessly review, verify, and manage approvals through a unified dashboard.

---

## Key Features

- **Vendor Onboarding:** Vendors can easily register by submitting their ID proofs, shop images, and selecting the relevant license category.
- **Digital Review System:** Authorized officers can digitally inspect uploaded documents and approve or decline license requests.
- **Renewal Requests:** Vendors can conveniently initiate renewal requests before license expiry, ensuring uninterrupted operations.
- **Automated Notifications:** (Optional) Email or SMS alerts keep vendors informed about approval updates and upcoming renewal dates.

---

## Technology Stack

- **Next.js** — For building both the user interface and backend APIs within one framework.
- **PostgreSQL + Prisma ORM** — Handles structured vendor data with efficient schema management.
- **AWS S3** — Provides secure and scalable cloud storage for uploaded verification documents.
- **GitHub Actions** — Powers continuous integration and deployment workflows for smooth updates.

---

## Folder Structure
src/
├── app/ # Page routes and layouts powered by Next.js App Router
├── components/ # Modular UI elements such as forms, tables, and alerts
├── lib/ # Helper functions, API utilities, and database connections
├── prisma/ # Prisma schema definitions and migration records
├── styles/ # Centralized and component-specific style sheets



---

## Setup Instructions

1. Clone the repository and move into the project directory:
   ```bash
   git clone https://github.com/yourusername/loco-verify.git
   cd loco-verify
Install required dependencies:

npm install

Create a .env file with the following values:

DATABASE_URL=your_postgres_connection_string
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
NEXT_PUBLIC_AWS_S3_BUCKET=your_s3_bucket_name

Apply database migrations:


npx prisma migrate dev
Launch the development server:

npm run dev

Open the app in your browser at:

http://localhost:3000

## Reflection
This setup ensures a clean separation of concerns, making collaboration between developers smoother and the project easy to scale. It encourages maintainability, allowing new features like analytics or vendor performance tracking to be integrated with minimal friction.

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


## Prisma Setup Summary

- Installed Prisma ORM and generated initial setup with `npx prisma init`.
- Configured the database connection using `DATABASE_URL` in `.env`.
- Defined data models for Vendors, Licenses, and Admins in `schema.prisma`.
- Ran `npx prisma migrate dev` to apply schema changes to the database.
- Generated the Prisma client for use in the app’s API routes.

Screenshot : ![alt text](image.png)