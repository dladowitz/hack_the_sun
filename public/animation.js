/*global $:false, d3:false, Exception:false, window:false, chartData:false, console:false */
'use strict';

var milestones = [
    {name: "Diamond Ring", amount: 4500, number: 1},
    {name: "Costa Rica Family Vacation", amount: 11000, number: 2},
    {name: "College Fund for Jennie", amount: 30000, number: 3},
    {name: "Home Renovation", /*no amount,*/ number: 4}
];



var margin = {top: 0, right: 80, bottom: 20, left: 250},
    width = 50000,
    height = 400 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(d3.time.month);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.value); });

var svg = d3.select("#d3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function render(data) {
    color = d3.scale.category10().domain(["grid", "solar"]);

    data.forEach(function (d) {
        d.date = parseDate(d.date);
    });

    var series = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {date: d.date, value: +d.values[(name === "grid" ? 0 : 1)]};
            })
        };
    });

    x.domain(d3.extent(data, function (d) { return d.date; }));

    y.domain([
        d3.min(series, function (c) { return d3.min(c.values, function (v) { return v.value; }); }),
        d3.max(series, function (c) { return d3.max(c.values, function (v) { return v.value; }); })
    ]);

  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  /*
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");
  */

    var source = svg.selectAll(".source")
                  .data(series)
                  .enter().append("g")
                  .attr("class", "source");

    source.append("path")
        .attr("class", "line")
        .attr("d", function (d) { return line(d.values); })
        .style("stroke", function (d) { return color(d.name); });

    // source.append("text")
    //     .datum(function (d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
    //     .attr("transform", function (d) { return "translate(" + x(d.value.date) + "," + y(d.value) + ")"; })
    //     .attr("x", 3)
    //     .attr("dy", ".35em")
    //     .text(function (d) { return d.name; });

    //move the chart over and add labels for lines
    // $("#d3 svg").css("margin-left", 300);
    svg.append("text")
        .attr("x", -220)
        .attr("y", data[0].values[0])
        .attr("font-size", "26")
        .text("Cost from the grid");

    svg.append("text")
        .attr("x", -180)
        .attr("y", data[0].values[1] + 290)
        .attr("font-size", "26")
        .text("Cost with solar");

    console.log("Render done");

    $("#d3 svg").animate(
        {"margin-left": -50000 + window.innerWidth / 2},
        {
            duration: 30000,
            easing: "easeInOutQuad",
            progress: function (animation, progress, remaining) {
                //retrieve the index within the array based upon the % to the array length
                var indexToDataArray = Math.ceil(progress * data.length),
                    item = data[indexToDataArray],
                    dt = item.date,
                    saved = item.totalSavings;

                if (indexToDataArray >= data.length) {
                    indexToDataArray = data.length;
                }

                //get the data
                $("#theDate").text(dt.getFullYear());

                //retrieve the sum
                $("#totalSaved").text(
                    "$" + Number(saved).toLocaleString('en')
                );

                //if savings is enough to trigger milestone, show the milestone
                $.each(milestones, function (idx, milestone) {
                    if (saved >= milestone.amount && $("#m" + milestone.number).css("display") === "none") {
                        //if milestone hasn't been shown yet

                        //add the milestone to the graph
                        svg.append("svg:image")
                            .attr('x', -1 * parseInt($("svg").css("margin-left"), 10) + window.innerWidth * 0.5)
                            .attr('y', y(item.values[0] - item.values[1]) - 150)
                            .attr('width', 256)
                            .attr('height', 256)
                            .attr("xlink:href", "/assets/milestones/HTS-Milestone-0" + milestone.number + ".png")
                            .attr("class", "milestone");

                        $("#m" + milestone.number).show(500);
                    }
                });

                if (progress >= 0.98) {
                    //add the last milestone
                    svg.append("svg:image")
                        .attr('x', x(data[data.length - 2].date) - 90)
                        .attr('y', y(data[data.length - 2].values[0] - data[data.length - 2].values[1]) - 70)
                        .attr('width', 256)
                        .attr('height', 256)
                        .attr("xlink:href", "/assets/milestones/HTS-Milestone-04.png")
                        .attr("class", "milestone");

                    $("#m4").show(500);
                }
            },
            complete: function () {
                console.log("animation 1 done");
            }
        }
    );
}

if (chartData) {
    var sum = 0;

    render(chartData.data.map(function (row) {
        sum += row[1] - row[2];
        return { date: row[0], values: [row[1], row[2]], totalSavings: sum };
    }));
} else {
    console.log("can't find data");
}
