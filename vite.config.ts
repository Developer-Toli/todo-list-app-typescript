import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@elements': resolve(__dirname, './src/elements'),
      '@formatter': resolve(__dirname, './src/formatter'),
      '@storage': resolve(__dirname, './src/storage'),
      '@utils': resolve(__dirname, './src/utils'),
      '@state': resolve(__dirname, './src/state'),
      '@interfaces': resolve(__dirname, './src/interfaces'),
      '@renderer': resolve(__dirname, './src/renderer')
    }
  }
});
