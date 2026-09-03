import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },
});
