var fetch = require('node-fetch');

async function loadURL(url) {

    let response = await fetch(url)

    let json = await response.json()

    let results = await json.sheets.Sheet1

    return results

}

module.exports = loadURL