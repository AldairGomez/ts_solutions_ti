import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function apiDevServerPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          try {
            let body = '';
            for await (const chunk of req) {
              body += chunk;
            }
            const parsedBody = body ? JSON.parse(body) : {};
            const { default: handler } = await server.ssrLoadModule('/api/chat.ts');
            
            const vercelRes: any = {
              statusCode: 200,
              status(code: number) {
                this.statusCode = code;
                res.statusCode = code;
                return this;
              },
              json(data: any) {
                res.statusCode = this.statusCode || 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return this;
              }
            };
            
            const vercelReq = Object.assign(req, { body: parsedBody });
            await handler(vercelReq, vercelRes);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Aseguramos que las variables del archivo .env estén en process.env
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), apiDevServerPlugin()],
    base: '/',
    ssgOptions: {
      dirStyle: 'nested',
      includedRoutes(paths, routes) {
        const langs = ['es', 'en'];
        const pages = ['/', '/servicios', '/contacto'];
        // Generar todas las combinaciones, ej: /es, /es/servicios
        const dynamicRoutes = langs.flatMap(lang => 
          pages.map(page => page === '/' ? `/${lang}` : `/${lang}${page}`)
        );
        // Incluir también la raíz '/'
        return ['/', ...dynamicRoutes];
      }
    }
  };
});
