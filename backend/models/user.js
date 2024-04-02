import { DataTypes, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/postgres");
const User = sequelize.define("User", {
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: () => uuidv4(),
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "customer",
});
sequelize.sync();
export default User;
