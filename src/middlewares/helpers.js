//Verifica se se a string possui apenas letras entre a-z, A-Z, ou entre À-ÿ seguindo a UTF-16
function possuiApenasLetras(string){

    return /^[a-zA-Z\s\u00C0-\u00FF]+$/.test(string)
    
}
//Verifica se a data fornecida é posterior a 2014 se sim, retorna true, se não, retorna false
function depoisDe2014(data){

    let dataMinima = new Date("2014/12/31")
    let dataComparar = new Date(data)

    return (dataComparar > dataMinima)
}

//Verifica se a data fornecida é anterior a data atual(hoje) se sim, retorna true, se não, retorna false
function dataAntesHoje(data) {
    
    let hoje = new Date()
    let dataComparar = new Date(data)
    hoje.setHours(0,0,0,0)
    dataComparar.setHours(0,0,0,0)

    return (dataComparar.getTime() < hoje.getTime())
}

module.exports = { possuiApenasLetras, depoisDe2014, dataAntesHoje }