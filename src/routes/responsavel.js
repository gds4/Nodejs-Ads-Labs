const express = require("express")
const controller = require("../controllers/responsavel")
const middlewares = require("../middlewares/middlewares")


const router = express.Router()

router.get("/sem-pendencia/", controller.listarResponsavelSemPendencia)
router.get("/:id/tarefas", controller.listarTarefasDoResponsavel )

//CRUD 
router.get("/", controller.listar)
router.post("/", middlewares.checkNomeCriacao, middlewares.checkDataNascimentoCriacao, controller.criar)
router.put("/:id", middlewares.checkNomeAtualizacao,middlewares.checkDataNascimentoAtualizacao, controller.atualizar)
router.delete("/:id", controller.remover)

module.exports = router