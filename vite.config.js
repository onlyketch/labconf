import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default defineConfig({
  plugins: [
    viteImagemin({
      pngquant: {
        quality: [0.7, 0.8], 
        speed: 4,
      },
      mozjpeg: {
        quality: 75,
      },
      webp: {
        quality: 75,
      },
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
})