const Responsavel = require("../models/responsavel")
const Tarefa = require("../models/tarefa")
const Sequelize = require("sequelize")

//Retorna uma lista JSON de tarefas pendentes de determinado responsável
async function listarTarefasPendentesPorResponsavel(idResponsavel){
    return await Tarefa.findAll({
        where: {
            [Sequelize.Op.and]:[
                {responsavel: parseInt(idResponsavel)},
                {expirou: false},
                {finalizado: false}
            ]
        }
    })
} 

//CRUD

//Retorna uma lista JSON contendo todas as tarefas de todos os responsáveis
async function listar(){
    return await Tarefa.findAll()
}

//Cria um novo registro de uma tarefa
async function criar(dados){

    const responsavelEncontrado = await Responsavel.findByPk(dados.responsavel)

    if(responsavelEncontrado){
        const novaTarefa = await Tarefa.create(dados)
        return novaTarefa
    }
    
    throw new Error("Não foi possível encontrar o Responsável")
}

//A partir do id de uma tarefa, realiza a atualização dos dados do mesma
async function atualizar(idTarefa,dados){

    const tarefaEncontrada = await Tarefa.findByPk(idTarefa)

    if(tarefaEncontrada){
        
        if((dados.finalizado != null) || dados.data_conclusao ){

            if(tarefaEncontrada.expirou){
                throw new Error("Não é possível finalizar ou modificar a data de uma tarefa que já expirou.")
                
            }else{
                //Somente modifica a data de conclusao e o campo finalizado caso a tarefa não tenha expirado
                tarefaEncontrada.data_conclusao = dados.data_conclusao ?? tarefaEncontrada.data_conclusao
                tarefaEncontrada.finalizado = dados.finalizado ?? tarefaEncontrada.finalizado
            }
        }
        //Permite modificar título e descrição mesmo que o prazo da tarefa já tenha expirado   
        tarefaEncontrada.titulo = dados.titulo ?? tarefaEncontrada.titulo
        tarefaEncontrada.descricao = dados.descricao ?? tarefaEncontrada.descricao

        await tarefaEncontrada.save()
        
        return tarefaEncontrada
    }

    throw new Error("Tarefa não encontrada")
}

//A partir do id de uma tarefa, realiza a exclusão da mesma
async function remover(idTarefa){

    const tarefa = await Tarefa.findByPk(idTarefa) 

    if(tarefa){
        await tarefa.destroy()
        return tarefa
    }
    
    throw new Error("Tarefa não encontrada")
}

module.exports = { 
    listarTarefasPendentesPorResponsavel, 
    listar, 
    criar, 
    atualizar, 
    remover 
}