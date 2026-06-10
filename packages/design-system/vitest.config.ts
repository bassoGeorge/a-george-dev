import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // setupFiles: ['@ageorgedev/testing-config/react-jsdom-test-setup.ts'],
    setupFiles: ['src/react-jsdom-test-setup.ts'],
    include: ['src/**/*.spec.{ts,tsx}'],
  },
})
