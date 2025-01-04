import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react';  

// Adjust base if deploying to a specific subpath  
const isProduction = process.env.NODE_ENV === 'production';  

export default defineConfig({  
  plugins: [react()],  
  base: './', // Update '/your-repo-name/' for GitHub Pages or custom path  
  build: {  
    outDir: 'dist',  
    assetsDir: 'assets', // Store assets in the dist/assets folder  
  },  
});