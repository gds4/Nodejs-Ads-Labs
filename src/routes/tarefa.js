const express = require("express")
const controller = require("../controllers/tarefa")
const middlewares = require("../middlewares/middlewares")

const router = express.Router()

router.get("/pendente/:idResponsavel", controller.listarTarefasPendentesPorResponsavel)

//CRUD
router.get("/", controller.listar)
router.post("/",middlewares.checkResponsavel, middlewares.checkTitulo, middlewares.checkDataConclusaoCriacao, controller.criar)
router.put("/:id", middlewares.checkDataConclusaoAtualizacao, controller.atualizar)
router.delete("/:id", controller.remover)

module.exports = router