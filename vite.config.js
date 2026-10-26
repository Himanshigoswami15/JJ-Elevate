import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Vite dev server middleware to execute Neon serverless API endpoints during local dev
function neonApiPlugin() {
  return {
    name: 'neon-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0];

        // Parse body
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const rawBody = Buffer.concat(buffers).toString();
        let parsedBody = null;
        if (rawBody) {
          try {
            parsedBody = JSON.parse(rawBody);
          } catch {
            parsedBody = rawBody;
          }
        }
        req.body = parsedBody;

        // Parse query params
        const searchParams = new URL(req.url, 'http://localhost').searchParams;
        req.query = Object.fromEntries(searchParams.entries());

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        try {
          if (urlPath === '/api/health') {
            const { default: handler } = await import('./api/health.js');
            return await handler(req, res);
          }
          if (urlPath === '/api/content') {
            const { default: handler } = await import('./api/content.js');
            return await handler(req, res);
          }
          if (urlPath === '/api/contact') {
            const { default: handler } = await import('./api/contact.js');
            return await handler(req, res);
          }
          if (urlPath === '/api/inquiries') {
            const { default: handler } = await import('./api/inquiries.js');
            return await handler(req, res);
          }
        } catch (err) {
          console.error('[Neon API Dev Middleware Error]:', err);
          res.statusCode = 500;
          return res.json({ success: false, error: err.message });
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), neonApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
