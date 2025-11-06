import { defineConfig } from 'prisma/config'
import "dotenv/config";

export default defineConfig({
  seed: {
    runner: 'tsx',
    file: 'prisma/seed.ts',
    }
});