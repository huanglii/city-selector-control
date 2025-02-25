import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({
    // 配置选项
    include: ['src'],       // 需要生成声明文件的文件夹
    outputDir: './types',   // 输出目录
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CitySelectorControl'
    }
  }
})
