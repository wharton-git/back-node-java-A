import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config.js';

class User extends Model { }

User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true
});

export default User;