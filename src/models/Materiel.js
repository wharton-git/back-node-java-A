import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config.js';

class Materiel extends Model { }

Materiel.init({
    designation: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    etat: {
        type: DataTypes.ENUM("Mauvais", "Bon", "Abimé"),
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    }
}, {
    sequelize,
    modelName: 'Materiel',
    timestamps: true
});

export default Materiel;