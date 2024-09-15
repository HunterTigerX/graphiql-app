import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { config } from 'dotenv';

config({ path: '.env.test' });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/config/config.ts'],
    exclude: ['.next', 'node_modules', 'jest-setup.js'],
    coverage: {
      exclude: [
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.d.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
        '.next',
        'node_modules',
        'jest-setup.js',
        'next.config.mjs',
        'jest.config.ts',
        'vitest.config.ts',
        'next-env.d.ts',
      ],
    },
  },
});
