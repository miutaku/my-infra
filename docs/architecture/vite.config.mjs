import { defineConfig } from 'vite';
import { LikeC4VitePlugin } from 'likec4/vite-plugin';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./viewer/', import.meta.url));
const workspace = fileURLToPath(new URL('./', import.meta.url));
export default defineConfig(({mode}) => ({
  root, base: './',
  plugins: [LikeC4VitePlugin({workspace, ai:'disabled'}), ...(mode === 'standalone' ? [viteSingleFile()] : [])],
  build: {outDir: mode === 'standalone' ? '../standalone' : '../dist', emptyOutDir:true},
  server: {host:'127.0.0.1'},
}));
