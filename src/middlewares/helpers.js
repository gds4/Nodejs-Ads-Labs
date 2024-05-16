//verifica se se a string possui apenas letras entre a-z, A-Z, ou entre À-ÿ seguindo a UTF-16
function possuiApenasLetras(string){

    return /^[a-zA-Z\s\u00C0-\u00FF]+$/.test(string)
    
}

function depoisDe2014(data){

    let dataMinima = new Date("2014/12/31")
    let dataComparar = new Date(data)

    return (dataComparar > dataMinima)
}


function dataAntesHoje(data) {
    
    let hoje = new Date()
    let dataComparar = new Date(data)
    hoje.setHours(0,0,0,0)
    dataComparar.setHours(0,0,0,0)

    return (dataComparar.getTime() < hoje.getTime())
}

module.exports = { possuiApenasLetras, depoisDe2014, dataAntesHoje }