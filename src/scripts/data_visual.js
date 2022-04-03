export default class DataVisual {
    constructor() {

    }

    drawLineChart(seasons, metrics) {
        //set the dimensions of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 580 - margin.top - margin.bottom;

        let svg = d3.select("#data-visualization")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        let data = []; 
        for (let i = 0; i < seasons.length; i++) {
            data.push({ x: seasons[i], y: metrics[i][1] });
        }

        // Add X axis
        let x = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.x; }), d3.max(data, function (d) { return d.x; })])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickFormat(d3.format('0f')));

        // Add Y axis
        let y = d3.scaleLinear()
            .domain([d3.min(data, function (d) { return d.y; })*.90, d3.max(data, function (d) { return d.y; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.x) })
                .y(function (d) { return y(d.y) })
            )

    }

    //Clear the current chart
    reset() {
        d3.selectAll("svg").remove();
    }
}