import sequelize from './config.js';
import Materiel from '../models/Materiel.js';

const db = {
    sequelize,
    Materiel
};

sequelize.sync({ alter: true }) 
    .then(() => console.log('Base de données synchronisée'))
    .catch(err => console.error('Erreur de synchronisation:', err));

export default db;