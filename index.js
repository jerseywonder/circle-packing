// Node modules

var fs = require('fs')

var chroma = require("chroma-js")

// Your data downloaded as a CSV and converted to JSON. Next step... fetch the data directly from the googledoc

// var data = require("./data.json")

// Javascript to create nodes

var createNodes = require('./createNodes');

// Javascript to create SVG... 

var createSVG = require('./createSVG');

// Javascript to load data from googledoc

var fetch = require('./loadURL');

fetch("https://interactive.guim.co.uk/docsdata/1bzh9J_sllSSrbYGi_STtgioQ6kYBUPz9Lg_eP8wrsTw.json").then( (data) => wrangle(data))

// The wrangle function is where we are formatting the data

function wrangle(data) {

    var allCompanies = data.map(item => item.Grouping)

    var companySet = new Set(allCompanies) 

    var companies = Array.from(companySet);

    var colours = companies.map(item => chroma.random())

    var getColour = function(type) {

        var index = companies.indexOf(type); 

        return colours[index]

    };

    var json = companies.map( (item, index) => {

    	return { name : item, group : item }

    })

    var obj = {
        "name" : "Gaming companies",
        "display" : false,
        "children": []
    }

    json.forEach( item => {
        var child = {}
        child.name = item.name
        child.group = item.group
        child.display = false
        var shortlist = data.filter( cat => cat.Grouping === item.name)
        child.children = shortlist.map( (final,index) => {
            return { "name": final["Company name"], "display" : true, "size" : final["Headcount (approx)"], "group" : final.Grouping  }
        })
        obj.children.push(child)
    })

    // The data formatting ends here. Now we make a preview SVG and output a sample of the JSON

    var width = 1000

    var height = 1000 

    var nodes = createNodes(obj, width, height)

    var svg = createSVG(nodes, width, height, getColour)

    writeSVG(svg)

    writer(obj)

}

function writeSVG(svg) {

    fs.writeFile("games.svg", svg, function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("Completed SVG")

    }); 
}

function writer(data) {

    console.log(JSON.stringify(data))

    fs.writeFile("preview.json", JSON.stringify(data), function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("Complete")

    }); 
}


