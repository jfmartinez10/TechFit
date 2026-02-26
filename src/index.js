import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import clasesRoutes   from './routes/clases.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import './cron/tareas.js';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clases',   clasesRoutes);
app.use('/api/reservas', reservasRoutes);

app.get('/', (_req, res) => res.json({ ok: true, api: 'TechFit' }));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));