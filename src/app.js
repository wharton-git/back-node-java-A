import express from 'express';
import materielRoutes from './routes/materielRoutes.js';
import './database/index.js'; 
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.use('/materiels', materielRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});