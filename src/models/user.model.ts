import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
class User extends Model {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    userName!: string;

    @Column({ type: DataType.STRING })
    displayPicture!: string;
}

export default User;
