export default class DataVisual {
    constructor() {
        //set the dimensions of the graph
         this.margin = { top: 10, right: 30, bottom: 30, left: 60 },
            this.width = 1300 - this.margin.left - this.margin.right,
            this.height = 600 - this.margin.top - this.margin.bottom;
    }

    //Used as a controller to direct to the correct draw chart method
    drawChart(tag, seasons, chartData) {
        this.metricLabel = chartData[0].metricLabel;
        switch (tag) {
            case "line":
                this.drawLineChart(seasons, chartData);
                break;
            case "bar":
                this.drawBarChart(seasons, chartData);
                break;
            default:
                break;
        } 

    }

    drawLineChart(seasons, chartData) {
        let svg = this.getSVG();

        //Group the data by player
        let players = d3.nest()
            .key(d => d.name)
            .entries(chartData);

        // X axis
        let x = d3.scaleLinear()
            .domain(d3.extent(chartData, d => d.season))
            .range([0, 1000]);
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom()
                .scale(x)
                .tickFormat(d3.format('d'))
                .tickValues(d3.range(Math.min.apply(Math, seasons), Math.max.apply(Math, seasons) + 1, 1)));
        this.addXAxisLabel(svg);

        // Y axis
        let y = d3.scaleLinear()
            .domain([d3.min(chartData, d=>d.metric)*.95, d3.max(chartData, d => d.metric)])
            .range([this.height, 30]);
        svg.append("g")
            .call(d3.axisLeft().scale(y));
        this.addYAxisLabel(svg);

        let playerNames = players.map(function (d) { return d.key }) // list of players
        let color = this.getColor(playerNames);

        // Add the lines
        svg.selectAll(".line")
            .data(players)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 3)
            .attr("d", function (d) {
                return d3.line()
                    .curve(d3.curveCardinal)
                    .defined(d => d.metric !== 0)
                    .x(d => x(d.season))
                    .y(d => y(d.metric))
                    (d.values)
            })    
            
        this.addLegend(players, color);
        this.addTitle(seasons);
    }

    drawBarChart(seasons, chartData) {
        let svg = this.getSVG();

        //Create values array from Y axis - min and max
        let values = [];
        chartData.forEach((row) => {
            Object.keys(row).forEach((key) => {
                if(key !== "season" && key !== 'metricLabel') {
                    values.push(row[key]);
                }
            })
        })

        //Get each player for subgroups (remove season and metriclabel)
        let players = chartData.map((row) => Object.keys(row));
        players = players[0].slice(1, players[0].length-1);
        
        // X axis
        let x = d3.scaleBand()
            .domain(seasons)
            .range([0, 1000])
            .padding([0.2])
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x)
                .tickFormat(d3.format('d')));
        this.addXAxisLabel(svg);

        // X Axis - subgroup for players
        let xSubgroup = d3.scaleBand()
            .domain(players)
            .range([0, x.bandwidth()])

        //Y Axis
        var y = d3.scaleLinear()
            .domain([d3.min(values, d => d) * .50, d3.max(values, d => d)*1.25])
            .range([this.height, 30]);
        svg.append("g")
            .call(d3.axisLeft(y));
        this.addYAxisLabel(svg);

        let color = this.getColor(players);

        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(chartData)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + x(d.season) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return players.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect")
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function (d) {return this.height - y(d.value); }.bind(this))
            .attr("fill", function (d) { return color(d.key); });

        let legendData = players.map((player) => { return {key: player, value: player}});
        this.addLegend(legendData, color);
        this.addTitle(seasons);
    }

    //Clear the current chart
    reset() {
        d3.selectAll("svg").remove();
    }

    //The following methods will be used by each chart

    //get label based on selected metric
    getLabel(metricLabel) {
        switch (metricLabel) {
            case "ppg":
                return "Points per Game";
            case "apg":
                return "Assists per Game";
            case "rpg":
                return "Rebounds per Game";
            case "spg":
                return "Steals per Game";
            case "fg_pct":
                return "Field Goal %";
            case "fg3_pct":
                return "3pt %";
            default:
                break;
        }
    }

    //return the svg to render the chart on
    getSVG() {
        return d3.select("#data-visualization")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + this.margin.left + "," + this.margin.top + ")");
    }

    addXAxisLabel(svg) {
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("x", 520)
            .attr("y", this.height + 28)
            .text("Season");
    }

    addYAxisLabel(svg) {
        svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("x", -this.height / 3)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(this.getLabel(this.metricLabel));
    }

    //["#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5", "#ffa300", "#dc0ab4", "#b3d4ff", "#00bfa0"]
    getColor(playerNames) {
        return d3.scaleOrdinal()
            .domain(playerNames)
            .range(['#003f5c','#7a5195','#bc4f90','#ef5675','#ff764a','#ffa600']);
    }

    //add legend to the current chart
    addLegend(players, color) {
        var legend = d3.select("svg")
            .selectAll('g.legend')
            .data(players)
            .enter()
            .append("g")
            .attr("class", "legend");

        legend.append("circle")
            .attr("cx", 1100)
            .attr('cy', (d, i) => i * 30 + 350)
            .attr("r", 6)
            .style("fill", d => color(d.key))

        legend.append("text")
            .attr("x", 1120)
            .attr("y", (d, i) => i * 30 + 355)
            .text(d => d.key);
    }

    //add title to the current chart
    addTitle(seasons) {
        d3.select("svg")
            .append("text")
            .attr("x", this.margin.left)
            .attr("y", 20)
            .attr("text-anchor", "left")
            .text(`${this.getLabel(this.metricLabel)} from ${seasons[0]} to ${seasons[seasons.length - 1]}`)
            .style("fill", "black")
            .style("font-size", 16)
            .style("font-family", "Arial Black")
    }

}