const services = require("../services/responsavel")

function listarResponsavelSemPendencia(req,res){
    services.listarResponsavelSemPendencia()
        .then((listaResponsaveis) => {
            return res.status(200).send({
                message: "Lista de responsaveis sem pendencias",
                responsaveis: listaResponsaveis
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function listarTarefasDoResponsavel(req, res){
    services.listarTarefasDoResponsavel(req.params.id)
        .then((listaDeTarefas) => {

            return res.status(200).send({
                message: "lista de tarefas",
                id_usuario: req.params.id,
                tarefas: listaDeTarefas
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function listar(req,res){
    services.listar()
        .then((listaResponsaveis) => {
            return res.status(200).send({
                message: "Lista de Responsáveis",
                responsaveis: listaResponsaveis
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function criar(req,res){
    services.criar(req.body)
        .then((novoResponsavel) => {
            return res.status(201).send({
                message: "Responsável criado com sucesso",
                tarefa: novoResponsavel
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function atualizar(req,res){
    services.atualizar(req.params.id, req.body)
        .then((responsavelAtualizado) => {
            return res.status(200).send({
                message: "Responsável atualizado com sucesso",
                tarefa: responsavelAtualizado
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

function remover(req,res){
    services.remover(req.params.id)
        .then((responsavelRemovido) => {
            return res.status(200).send({
                message: "Responsável removido com sucesso",
                tarefa: responsavelRemovido
            }
        )
    }, (error) => {
        return res.status(500).send({ 
            message: error.message
        })
    })
}

module.exports = { 
    listarResponsavelSemPendencia, 
    listarTarefasDoResponsavel,
    listar, 
    criar, 
    atualizar, 
    remover 
}