const Sequelize  = require("sequelize");
const Responsavel = require("../models/responsavel")
const Tarefa = require("../models/tarefa")

//Retorna uma lista JSON de responsáveis sem pendencias
async function listarResponsavelSemPendencia(){

    //Seleciona as tarefas pendentes juntamente com os responsaveis associados
    const tarefasPendentes = await Tarefa.findAll({
        include: [Responsavel],
        where: {
            [Sequelize.Op.and]:[
                {finalizado: false},
                {expirou: false}
            ]
        }
    })

    //Separa os responsáveis associados às tarefas, obtendo somente uma lista com os ids dos responsaveis que possuem pendências - [1,2,3]
    const responsaveisComTarefasIds= tarefasPendentes.map(tarefa => tarefa.responsavei.id);
    
    // Obtém uma lista de responsáveis que não possuem pendências, excluindo aqueles cujos IDs estão em 'responsaveisComTarefasIds'
    const listaDeResponsaveis = Responsavel.findAll({
        where: {
            id: {
                [Sequelize.Op.notIn] : responsaveisComTarefasIds
            }
        }
    })
  
    return listaDeResponsaveis
}

//Retorna uma lista JSON com as tarefas de um determinado responsável
async function listarTarefasDoResponsavel(idResponsavel){
    const responsavel = await Responsavel.findByPk(idResponsavel)
    if(responsavel){
        return await Tarefa.findAll({ 
            where: { 
                responsavel: idResponsavel 
            }
        })
    }
    
    throw new Error("Responsavel nao encontrado")
}


//CRUD

//Retorna uma lista JSON de responsáveis
async function listar(){
    return await Responsavel.findAll()
}

//Cria um novo registro de um responsável
async function criar(dados){
    const novoResponsavel = await Responsavel.create(dados)
    return novoResponsavel
}

//A partir do id de um responsável, realiza a atualização dos dados do mesmo
async function atualizar(idResponsavel, dados){
    const pessoaEncontrada = await Responsavel.findByPk(idResponsavel)
    
    if(pessoaEncontrada){
        pessoaEncontrada.nome = dados.nome ?? pessoaEncontrada.nome
        pessoaEncontrada.data_nascimento = dados.data_nascimento ?? pessoaEncontrada.data_nascimento
        await pessoaEncontrada.save()
        return pessoaEncontrada
    }

    throw new Error("Responsavel nao encontrado")
}

//A partir do id de um responsável, realiza a exclusão do mesmo
async function remover(idResponsavel){
    const responsavelEncontrado = await Responsavel.findByPk(idResponsavel) 

    if(responsavelEncontrado){
       await responsavelEncontrado.destroy()
       return responsavelEncontrado
    }
    
    throw new Error("Responsável não encontrado")
}


module.exports = { 
    listarResponsavelSemPendencia, 
    listarTarefasDoResponsavel,
    listar, 
    criar, 
    atualizar, 
    remover 
}