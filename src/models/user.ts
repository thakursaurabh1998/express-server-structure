import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/connections';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: DataTypes.STRING,
    displayPicture: { type: DataTypes.STRING }
});

export default User;
