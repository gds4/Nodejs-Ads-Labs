const database = require("../database/database")
const Sequelize = require("sequelize")



const Responsavel = database.define(
    "responsaveis",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nome: {
            type: Sequelize.STRING(100),
            allowNull: false
        
        },

        data_nascimento: {
            type: Sequelize.DATE,
            allowNull: false
        }

    }, {
        timestamp: true
    }
)



module.exports = Responsavel