function resize() {
    width = parseInt(d3.select("#viz").style("width")), width = width - margin.left - margin.right, height = width * mapRatio, projection.translate([width / 2, height / 2]).center(pennsylvania_center).scale(width * [mapRatio + mapRatioAdjuster]), svg.style("width", width + "px").style("height", height + "px"), svg.selectAll("path").attr("d", path)
}

function zoomed() {
    features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
}
var margin = {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
    },
    width = parseInt(d3.select("#viz").style("width")),
    width = width - margin.left - margin.right,
    mapRatio = .5,
    height = width * mapRatio,
    mapRatioAdjuster = 7;
pennsylvania_center = [-77.5, 40.8];
var projection = d3.geo.mercator().center(pennsylvania_center).translate([width / 2, height / 2]).scale(width * [mapRatio + mapRatioAdjuster]),
    zoom = d3.behavior.zoom().translate([0, 0]).scale(1).scaleExtent([1, 3]).on("zoom", zoomed);
d3.select(window).on("resize", resize);
var svg = d3.select("#viz").append("svg").attr("width", width).attr("height", height).call(zoom),
    path = d3.geo.path().projection(projection),
    features = svg.append("g");
d3.json("/public/assets/js/json/americas/united-states/pennsylvania/pa_counties-topojson.json", function(t, e) {
    if (t) return console.error(t);
    topojson.feature(e, e.objects.pa_counties);
    features.selectAll("path").data(topojson.feature(e, e.objects.pa_counties).features).enter().append("path").attr("d", path).attr("fill", "#e8d8c3").attr("stroke", "#404040").attr("stroke-width", .45).on("mousemove", function(t) {
        d3.select("#tooltip").style("top", d3.event.pageY + 20 + "px").style("left", d3.event.pageX + 20 + "px").select("#county-name-tooltip").text(t.properties.NAME), d3.select("#county-name").text(t.properties.NAME), d3.select("#tooltip").classed("hidden", !1)
    }).on("mouseout", function() {
        d3.select("#tooltip").classed("hidden", !0)
    })
});