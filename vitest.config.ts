import react from '@vitejs/plugin-react'
import * as path from 'path'
import * as VitestConfig from 'vitest/config'

export default VitestConfig.defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    includeSource: ['app/**/*.{ts,tsx}'],
    exclude: ['node_modules', 'e2e'],
    coverage: {
      exclude: ['app/mocks.tsx'],
      reporter: process.env.CI ? 'json' : 'html-spa',
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
    },
  },
})
