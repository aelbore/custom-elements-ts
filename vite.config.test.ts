import { defineConfig } from 'vite'

import tsconfigPaths from 'vite-tsconfig-paths'
import viteTestPlugin from 'vite-plugin-test'

export default defineConfig({
  plugins: [  
    tsconfigPaths(),
    viteTestPlugin({ dir: 'test' })
  ]
})