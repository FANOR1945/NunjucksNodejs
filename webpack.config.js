// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './public/js/main.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            reserved: ['renderers', 'initComponents'], // Variables a proteger
            toplevel: true, // Ofuscar a nivel global
            properties: {
              regex: /^_/, // No ofuscar propiedades que empiecen con _
            },
          },
          compress: {
            drop_console: true, // Elimina console.log
            drop_debugger: true,
            pure_funcs: ['console.info', 'console.debug'], // Elimina estas funciones
            passes: 3, // Más pasos para mejor compresión
            unsafe: true, // Optimizaciones "inseguras" pero efectivas
            unsafe_math: true, // Optimizaciones matemáticas
            unsafe_methods: true, // Optimizaciones de métodos
            unsafe_proto: true, // Optimizaciones de prototipos
          },
          format: {
            comments: false, // Elimina todos los comentarios
            beautify: false, // No formatear el código
            ecma: 2020, // Versión ECMAScript
          },
          ecma: 2020, // Especifica versión ECMAScript
          keep_classnames: false, // Ofuscar nombres de clases
          keep_fnames: false, // Ofuscar nombres de funciones
        },
        extractComments: false,
        parallel: true, // Usar múltiples núcleos
      }),
    ],
  },
  mode: 'production',
  performance: {
    hints: 'warning', // Mostrar advertencias de rendimiento
    maxEntrypointSize: 512000, // 500KB
    maxAssetSize: 512000, // 500KB
  },
};