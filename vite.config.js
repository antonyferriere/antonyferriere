import { defineConfig } from 'vite';
import { execFileSync } from 'node:child_process';

// Templates are rendered at build time, never shipped as a client framework.
export default defineConfig({
  server: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  preview: { host: '0.0.0.0', port: 4173, strictPort: true, allowedHosts: ['terminal.local'] },
  build: { target: 'es2022', assetsInlineLimit: 0 },
  plugins: [{
    name: 'editorial-html',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.mjs') && (file.includes('/src/') || file.includes('/scripts/'))) {
        execFileSync(process.execPath, ['scripts/render.mjs']);
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  }],
});
