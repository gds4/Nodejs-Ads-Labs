const services = require("../services/tarefa")


function listarTarefasPendentesPorResponsavel(req,res){
    services.listarTarefasPendentesPorResponsavel(req.params.idResponsavel)
        .then((listaDePendencias) => {
            return res.status(200).send({
                message: "Lista de Pendencias",
                tarefas: listaDePendencias
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
} 


function listar(req, res){
    services.listar(req.query)
        .then((listaDeTarefas) => {
            return res.status(200).send({
                message: "tarefa criada com sucesso",
                tarefas: listaDeTarefas
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function criar(req, res){
    services.criar(req.body)
        .then((tarefaCriada) => {
            return res.status(201).send({
                message: "tarefa criada com sucesso",
                tarefa: tarefaCriada
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function atualizar(req, res){
    services.atualizar(req.params.id,req.body)
        .then((tarefaAtualizada) => {
            return res.status(200).send({
                message: "tarefa atualizada com sucesso",
                tarefa: tarefaAtualizada
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function remover(req, res){
    services.remover(req.params.id)
        .then((tarefaRemovida) => {
            return res.status(200).send({
                message: "tarefa removida com sucesso",
                tarefa: tarefaRemovida
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

module.exports = { 
    listarTarefasPendentesPorResponsavel, 
    listar, 
    criar, 
    atualizar, 
    remover 
}