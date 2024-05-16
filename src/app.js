require("dotenv").config({ path: ".env" })
require("./database/database")

const express = require("express")

const tarefaRoute = require("./routes/tarefa")
const responsavelRoute = require("./routes/responsavel")

const app = express()
app.use(express.json())


app.use("/responsavel", responsavelRoute)
app.use("/tarefa", tarefaRoute)


app.listen(process.env.PORT, console.log(`Servidor escutando na porta ${process.env.PORT}`))


module.exports = app