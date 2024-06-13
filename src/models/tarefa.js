const database = require("../database/database")
const Sequelize = require("sequelize")
const Responsavel = require("./responsavel")


const Tarefa = database.define( "tarefas",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    titulo: { 
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: Sequelize.TEXT,

    data_conclusao: {
        type: Sequelize.DATE,
        allowNull: false
    },
        

    finalizado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    expirou: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Tarefa.belongsTo(Responsavel, { foreignKey: "responsavel" })

Tarefa.addHook("beforeSave", (tarefa, options) => {
    const dataAtual = new Date()
    const dataConclusao = new Date(tarefa.data_conclusao)
    dataAtual.setHours(0,0,0,0)
    dataConclusao.setHours(0,0,0,0)

    if (dataAtual > dataConclusao) {
        tarefa.expirou = true
    }else{
        tarefa.expirou = false
    }
})


module.exports = Tarefa