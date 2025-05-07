import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nunjucks from 'nunjucks';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configuración de Nunjucks para API
const env = nunjucks.configure(path.join(__dirname, '../views'), {
  autoescape: true,
  noCache: process.env.NODE_ENV !== 'production'
});


// Renderizado de templates
router.post('/render-template', (req, res) => {
  try {
    const { template, context } = req.body;
    const rendered = env.renderString(template, context || {});
    res.json({ success: true, html: rendered });
  } catch (error) {
    console.error('Template rendering error:', error);
    res.status(500).json({
      success: false,
      error: 'Error al renderizar la plantilla'
    });
  }
});

// Gestión de rutas de la aplicación
router.get('/routes', (req, res) => {
  try {
    const routes = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../config/routes.json'))
    );

    const processRoutes = (routesArray, basePath = '') => {
      return routesArray.map(route => {
        const fullPath = path.join(basePath, route.path);
        const result = {
          path: fullPath,
          view: route.view,
          private: route.private || false,
          title: route.title,
          mdname: route.mdname || '',
        };

        if (route.children) {
          result.children = processRoutes(route.children, fullPath);
        }

        return result;
      });
    };

    const allRoutes = processRoutes(routes);
    const filtered = allRoutes.filter(r => 
      req.user ? r.private !== false : r.private === false
    );

    res.json(filtered);
  } catch (err) {
    console.error('Error loading routes:', err);
    res.status(500).json({ error: 'Error al cargar las rutas' });
  }
});

export default router;