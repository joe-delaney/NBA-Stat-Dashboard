export default class DataVisual {
    constructor() {

    }

    drawLineChart(seasons, chartData) {
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

        //Group the data by player
        let players = d3.nest()
            .key(d => d.name)
            .entries(chartData);

        // Scale the X axis
        let x = d3.scaleLinear()
            .domain(d3.extent(chartData, d => d.season))
            .range([0, width]);

        //Add the X axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom()
                .scale(x)
                .tickFormat(d3.format('d'))
                .ticks(seasons.length));

        //Scale the Y axis
        let y = d3.scaleLinear()
            .domain(d3.extent(chartData, d => d.metric))
            .range([height, 0]);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft().scale(y));

        console.log(players);

        let res = players.map(function (d) { return d.key }) // list of players
        let color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])


        // Add the lines
        svg.selectAll(".line")
            .data(players)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 2)
            .attr("d", function (d) {
                return d3.line()
                    .defined(d => d.metric !== 0)
                    .x(d => x(d.season))
                    .y(d => y(d.metric))
                    (d.values)
            })       
    }

    //Clear the current chart
    reset() {
        d3.selectAll("svg").remove();
    }
}