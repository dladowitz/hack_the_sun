/*global d3:false */

function render(data) {
    'use strict';

    var margin = {top: 25, right: 20, bottom: 30, left: 60},
        width = 950 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom,
        parseDate = d3.time.format("%Y-%m-%d").parse,
        xGrid = true,
        x = d3.time.scale()
            .range([0, width]),
        y = d3.scale.linear()
            .range([height, 0]),
        line,
        svg;

    //remove these
    var yGrid = false,
        options = {};
        //labelDataPoints = true;

    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.count = +d.count;
    });


    // var xAxis = d3.svg.axis()
    //     .scale(x)
    //     .orient("bottom");
    // if(options.xAxisTicks && options.xAxisTicks.interval && options.xAxisTicks.amount)
    //     xAxis = xAxis.ticks(options.xAxisTicks.interval, options.xAxisTicks.amount);

    // var yAxis = d3.svg.axis()
    //     .scale(y)
    //     .orient("left")
    //     .ticks(yTicks);

    svg = d3.select("#d3").append("svg")
        .attr("class", "lineChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return (d.date); }));
    y.domain(d3.extent(data, function (d) { return d.count; }));

    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis);

    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis)
    //   .append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", ".71em")
    //     .style("text-anchor", "end")
    //     .text(yAxisLabel);

    if (xGrid || yGrid) {
        var rules = svg.selectAll("g.rule")
            .data(x.ticks(10))
            .enter().append("svg:g")
            .attr("class", "rule");

        if (xGrid) {
           // Draw grid lines
            rules.append("svg:line")
                .attr("class", function (d) { return d ? null : "axis"; })
                .data(options.xAxisTicks && options.xAxisTicks.interval && options.xAxisTicks.amount ? x.ticks(options.xAxisTicks.interval, options.xAxisTicks.amount) : x.ticks())
                .attr("x1", x)
                .attr("x2", x)
                .attr("y1", 0)
                .attr("y2", height - 1);
        }
    }

    line = d3.svg.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.count); });

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    /*
    if (labelDataPoints) {
        //show a dot at each datapoint
        svg.selectAll(".dataLabel")
            .data(data)
            .enter().append("text")
            .attr("class", "dataLabel")
            .text(function (d, i) { return (i > 0 ? d.count : ""); })
            .attr("text-anchor", "middle")
            .attr("x", function (d) { return x(d.date); })
            .attr("y", function (d) { return y(d.count) - 9; });

        //show a dot at each datapoint
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function (d) { return x(d.date); })
            .attr("cy", function (d) { return y(d.count); });
    }
    */

    console.log("Render done");
}

var data = [
        { date: "2015-04-18", count: 10 + 10 * Math.random() },
        { date: "2015-04-19", count: 10 + 10 * Math.random() },
        { date: "2015-04-20", count: 10 + 10 * Math.random() },
        { date: "2015-04-21", count: 10 + 10 * Math.random() },
    ];

render(data);

console.log(data[0].count);

