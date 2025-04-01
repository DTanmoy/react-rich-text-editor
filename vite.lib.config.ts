import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { 
            runtime: 'automatic',
            importSource: 'react'
          }],
        ],
        presets: [
          ['@babel/preset-env', { 
            modules: false,
            targets: {
              esmodules: true
            }
          }],
          ['@babel/preset-react', { 
            runtime: 'automatic',
            development: process.env.NODE_ENV === 'development',
            importSource: 'react'
          }],
        ],
      },
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    dts({
      include: ['src/lib/**/*', 'src/components/**/*'],
      exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx'],
      rollupTypes: true,
      insertTypesEntry: true,
      outDir: 'dist',
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@/*': ['src/*']
        }
      }
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ReactRichTextEditor',
      formats: ['es'],
      fileName: (format) => `react-rich-text-editor.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@mui/material',
        '@mui/icons-material',
        '@emotion/react',
        '@emotion/styled',
        '@mui/material/styles',
        '@mui/material/colors',
        '@mui/material/utils',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@mui/material': 'MuiMaterial',
          '@mui/icons-material': 'MuiIconsMaterial',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
          '@mui/material/styles': 'MuiStyles',
          '@mui/material/colors': 'MuiColors',
          '@mui/material/utils': 'MuiUtils',
        },
        inlineDynamicImports: false,
        preserveModules: true,
        compact: true,
        exports: 'named',
        generatedCode: {
          preset: 'es2015',
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          symbols: false,
        },
      },
    },
    minify: false,
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: '',
    target: ['es2015'],
    cssCodeSplit: true,
    cssMinify: true,
    write: true,
    copyPublicDir: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
    exclude: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/styles',
      '@mui/material/colors',
      '@mui/material/utils',
    ],
    esbuildOptions: {
      target: 'es2015',
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime'],
    alias: {
      'react': resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': resolve(__dirname, 'node_modules/react/jsx-runtime')
    }
  }
}); 