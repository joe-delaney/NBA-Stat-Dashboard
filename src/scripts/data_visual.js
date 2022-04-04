export default class DataVisual {
    constructor() {
        //set the dimensions of the graph
         this.margin = { top: 10, right: 30, bottom: 30, left: 60 },
            this.width = 1300 - this.margin.left - this.margin.right,
            this.height = 600 - this.margin.top - this.margin.bottom;
    }

    drawChart(tag, seasons, chartData) {
        switch (tag) {
            case "line":
                this.drawLineChart(seasons, chartData);
            default:
                break;
        } 

    }

    drawLineChart(seasons, chartData) {
        let metricLabel = chartData[0].metricLabel;

        this.svg = d3.select("#data-visualization")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + this.margin.left + "," + this.margin.top + ")");

        //Group the data by player
        let players = d3.nest()
            .key(d => d.name)
            .entries(chartData);

        // Scale the X axis
        let x = d3.scaleLinear()
            .domain(d3.extent(chartData, d => d.season))
            .range([0, 1000]);

        //Add the X axis
        this.svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom()
                .scale(x)
                .tickFormat(d3.format('d'))
                .tickValues(d3.range(Math.min.apply(Math, seasons), Math.max.apply(Math, seasons) + 1, 1)));
        
        this.svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("x", 520)
            .attr("y", this.height + 30)
            .text("Season");

        //Scale the Y axis
        let y = d3.scaleLinear()
            .domain([d3.min(chartData, d=>d.metric)*.95, d3.max(chartData, d => d.metric)])
            .range([this.height, 30]);

        // Add Y axis
        this.svg.append("g")
            .call(d3.axisLeft().scale(y));
        
        this.svg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("x", -this.height / 3)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text(this.getYAxisLabel(metricLabel));

        console.log(players);

        let res = players.map(function (d) { return d.key }) // list of players
        let color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])


        // Add the lines
        this.svg.selectAll(".line")
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
            
        //add legend
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
            .text(d => d.key)
        
        //add title
        d3.select("svg")
            .append("text")
            .attr("x", this.margin.left)
            .attr("y", 20)
            .attr("text-anchor", "left")
            .text(`${this.getYAxisLabel(metricLabel)} from ${seasons[0]} to ${seasons[seasons.length-1]}`)
            .style("fill", "black")
            .style("font-size", 16)
            .style("font-family", "Arial Black")
    }

    //Clear the current chart
    reset() {
        d3.selectAll("svg").remove();
    }

    getYAxisLabel(metricLabel) {
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
}