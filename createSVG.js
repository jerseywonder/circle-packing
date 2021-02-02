const D3Node    = require('d3-node');
const d3n   = new D3Node();
const d3    = d3n.d3;

function createSVG(data, width, height, getColour) {

	var svg = d3n.createSVG(width, height)
					.attr("preserveAspectRatio", "xMinYMin meet")
					.attr("viewBox", `0 0 ${width} ${height}`)
					.classed("svg-content", true);

	var g = svg.append("g")

    var elem = svg.selectAll("g")
        .data(data)

    /*Create and place the "blocks" containing the circle and the text */  
    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", function(d){return `translate(${d.x},${d.y})`})

    /*Create the circle for each block */
    var circle = elemEnter.append("circle")
        .attr("r", function(d){return d.r} )
        .style("fill", function(d) { 
            return getColour(d.data.group)
        })
        .style("fill-opacity", function(d) {
            return (d.data.display) ? 1 : 0.5 ;
        })

    /* Create the text for each block */
    /*
    elemEnter.append("text")
        .attr("dx", function(d){return 0})
        .text(function(d){return d.data.name})
        .style("text-anchor", "middle")
        */


	return d3n.svgString()

}

module.exports = createSVG