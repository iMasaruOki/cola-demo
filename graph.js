hljs.initHighlightingOnLoad();
var width = 1024;
var height = 900;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var d3cola = cola.d3adaptor(d3)
    .size([width, height]);

function draw_json() {
    var nodeRadius = 15;
    var graph = JSON.parse(document.getElementById('graph').value);
	graph.nodes.forEach(function (v) { v.height = v.width = 2 * nodeRadius; });
    var groupenable = document.getElementById('group').checked;
    d3.select('svg').remove();

    var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

    var groupMap = {};
    if (groupenable == true) {
	graph.nodes.forEach(function (v, i) {
	    var g = v.group;
	    if (typeof groupMap[g] == 'undefined') {
		groupMap[g] = [];
	    }
	    groupMap[g].push(i);
	    v.width = v.height = 40;
	    g.padding = 20;
	});
    }

    var groups = [];
    if (groupenable == true) {
	for (var g in groupMap) {
	    groups.push({ id: g, leaves: groupMap[g] });
	}
    }
    d3cola
	.nodes(graph.nodes)
	.links(graph.links)
	.groups(groups)
	.jaccardLinkLengths(120, 0.7)
	.avoidOverlaps(true)
	.start(20, 0, 10);

    var group = svg.selectAll('.group')
	.data(groups)
	.enter().append('rect')
	.classed("group", true)
	.attr('rx',5)
	.attr('ry',5)
	.style("fill", function (d) { return color(d.id); })
	.call(d3cola.drag);

    var link =
	svg.selectAll(".link")
	.data(graph.links)
	.enter().append("line")
	.attr("class", "link")
	.style("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node =
	svg.selectAll(".node")
	.data(graph.nodes)
	.enter().append("circle")
	.attr("class", "node")
	.attr("r", nodeRadius)
	.style("fill", function (d) { return color(d.group); })
	.call(d3cola.drag);

    var label =
	svg.selectAll("text")
	.data(graph.nodes)
	.enter().append("text")
	.text( function(d) { return d.name; })
	.attr("text-anchor", "middle")
	.style("font-size", 12)
	.call(d3cola.drag);

    node.append("title")
	.text(function (d) { return d.name; });

    d3cola.on("tick", function() {
	link
	    .attr("x1", function(d) { return d.source.x; })
	    .attr("y1", function(d) { return d.source.y; })
	    .attr("x2", function(d) { return d.target.x; })
	    .attr("y2", function(d) { return d.target.y; });

	node
	    .attr("cx", function(d) { return d.x; })
	    .attr("cy", function(d) { return d.y; });

	label
	    .attr("x", function(d) { return d.x; })
	    .attr("y", function(d) { return d.y - 20; });

        group
	    .attr('x', function (d) { return d.bounds.x; })
	    .attr('y', function (d) { return d.bounds.y; })
	    .attr('width', function (d) { return d.bounds.width(); })
	    .attr('height', function(d) { return d.bounds.height(); });
    });
}

$(function() {
    $('button').click(function() {
	if ($(this).val() != "update") {
	    $('#graph').load($(this).val());
	}
    });
});
