import { DataTypes } from "sequelize";
import sequelize from "../database.js";


const Produto = sequelize.define("Produto", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})


export default Produto