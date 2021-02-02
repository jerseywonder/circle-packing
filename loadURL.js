var fetch = require('node-fetch');

function loadURL(url) {

    let response = await fetch(url)

    let json = await response.json()

    let results = await json.sheets

    return results

}

module.exports = loadURL