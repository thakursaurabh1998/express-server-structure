import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/connections';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: { type: DataTypes.STRING, unique: true },
    name: DataTypes.STRING,
    profilePicture: { type: DataTypes.STRING, allowNull: true }
});

export default User;
