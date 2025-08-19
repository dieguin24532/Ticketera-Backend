import { DataTypes } from "sequelize";
import db from '../../config/db.js';

const Pedidos = db.define('pedidos', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
    },
    cliente: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    ruc_cedula: DataTypes.STRING,
    cantidad: DataTypes.INTEGER
})

export default Pedidos;