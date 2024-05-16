const helpers = require("./helpers")

//Realiza as validações referentes ao nome do responsável no momento da criação
function checkNomeCriacao(req, res, next){
    if(!req.body.nome){
        return res.status(400).send({ message: "Você deve fornecer um nome."})
    }
    if(req.body.nome.length < 3){
        return res.status(400).send({ message: "O nome deve possuir no mínimo três caracteres"})   
    }
    
    if(!helpers.possuiApenasLetras(req.body.nome)){
        return res.status(400).send({ message: "O nome deve possuir apenas letras"})
    }
    

    return next()
}

//Realiza as validações referentes ao nome do responsável no momento da atualização
function checkNomeAtualizacao(req, res, next){

    if(req.body.nome){

        if(req.body.nome.length < 3){
            return res.status(400).send({ message: "O nome deve possuir no mínimo três caracteres"})   
        }
        
        if(!helpers.possuiApenasLetras(req.body.nome)){
            return res.status(400).send({ message: "O nome deve possuir apenas letras"})
        }
    }

    return next()
}

//Realiza as validações referentes à data de nascimento do Responsável no momento da criação
function checkDataNascimentoCriacao(req, res, next){
    if(!req.body.data_nascimento){
        return res.status(400).send({ message: "Você deve fornecer a data de nascimento."})
    }

    if(helpers.depoisDe2014(req.body.data_nascimento)){
        return res.status(400).send({ message: "O responsável deve ter nascido no mínimo em 2014."})
    }

    return next()
}

//Realiza as validações referentes à data de nascimento do Responsável no momento da atualização
function checkDataNascimentoAtualizacao(req, res, next){
    
    if(req.body.data_nascimento){
        if(helpers.depoisDe2014(req.body.data_nascimento)){
            return res.status(400).send({ message: "O responsável deve ter nascido no mínimo em 2014."})
        }
    }
    return next()
}

//Realiza as validações referentes ao título da tarefa
function checkTitulo(req, res, next){
    if(!req.body.titulo){
        return res.status(400).send({ message: "Você deve fornecer um título para a tarefa."})
    }

    return next()
}

//Realiza as validações referentes à data de conclusão da tarefa no momento da criação
function checkDataConclusaoCriacao(req, res, next){
    if(!req.body.data_conclusao){
        return res.status(400).send({ message: "Você deve fornecer uma data de conclusão da tarefa."})
    }

    if(helpers.dataAntesHoje(req.body.data_conclusao)){
        return res.status(400).send({ message: "A data de conclusão da tarefa não pode ser anterior a hoje"})
    }

    return next()
}

//Realiza as validações referentes à data de conclusão da tarefa no momento da atualização
function checkDataConclusaoAtualizacao(req, res, next){
    if(req.body.data_conclusao){
        if(helpers.dataAntesHoje(req.body.data_conclusao)){
            return res.status(400).send({ message: "A data de conclusão da tarefa não pode ser anterior a hoje"})
        }
    }
    return next()
}

//Realiza as validações referentes ao responsavel(chave estrangeira da tarefa)
function checkResponsavel(req, res, next){
    if(!req.body.responsavel){
        return res.status(400).send({ message: "Você deve fornecer um responsável"})
    }
    return next()
}

module.exports = { 
    checkNomeCriacao, 
    checkNomeAtualizacao,
    checkDataNascimentoCriacao, 
    checkDataNascimentoAtualizacao,
    checkTitulo, 
    checkDataConclusaoCriacao,
    checkDataConclusaoAtualizacao,
    checkResponsavel
}