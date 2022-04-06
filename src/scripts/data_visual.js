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
            .attr("class", "line")
            .attr("id", (d, i) => { return "line"+i })
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

        svg.selectAll(".line").style("opacity", "1");

        svg.selectAll(".line").each(function(d,i) {
            let totalLength = svg.select("#line" + i).node().getTotalLength();
            svg.selectAll("#line"+i)
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(2500)
                .delay(100 * i)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0)
                .style("stroke-width", 3);
        })

        let toolTip = d3.select("#chart-tool-tip");
        const tooltipLine = svg.append('line').attr("class", "tool-tip-line");

        let tipBox = svg./*selectAll().data(players).enter().*/append('rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('opacity', 0)
            .on('mousemove', () => {
                if ((d3.mouse(tipBox.node())[0]) > 1050) {
                    if (toolTip) toolTip.style('display', 'none');
                    if (tooltipLine) tooltipLine.style('display', 'none');
                } else {
                const season = Math.floor((x.invert(d3.mouse(tipBox.node())[0])));
                
                tooltipLine.attr('stroke', 'black')
                    .attr('x1', x(season))
                    .attr('x2', x(season))
                    .attr('y1', 30)
                    .attr('y2', this.height)
                    .style('display', 'inline');

                toolTip.html(season)
                    .style('display', 'inline')
                    .style('left', d3.event.pageX + 20 + "px")
                    .style('top', d3.event.pageY - 20 + "px")
                    .selectAll()
                    .data(players).enter()
                    .append('div')
                    .style('color', d => d.color)
                    .html(d => { 
                        let metric;
                        d.values.forEach((value) => {
                            if(value.season === season) {
                                metric = value.metric;
                            }
                        });
                        return `${d.key}: ${metric}`}
                        );
                }
            })
            .on('mouseout', () => {
                if (toolTip) toolTip.style('display', 'none');
                if (tooltipLine) tooltipLine.style('display', 'none');
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
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .style("font-weight", 600)
            .call(d3.axisBottom(x)
                .tickFormat(d3.format('d'))
                .tickSize(0));

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

        let toolTip = d3.select("#chart-tool-tip");

        // Show the bars
        let bars = svg.append("g")
            .selectAll("g")
            .data(chartData)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + x(d.season) + ",0)"; })
        
        bars.selectAll("rect")
            .data(function (d) { return players.map(function (key) { return { key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("width", xSubgroup.bandwidth())
            .attr("y", function (d) { return y(0); })
            .attr("height", function (d) { 
                if(this.height - y(0) < 0) {
                    return this.height;
                } else {
                    return this.height - y(0); 
                }
            }.bind(this))
            .attr("fill", function (d) { return color(d.key); })
            .attr("value", function (d) {return d.value})
            .attr("idx", function(d) {return d.idx})
            .on("mouseover", function (d) {  
                toolTip.style("left", d3.event.pageX + 10 + "px")
                toolTip.style("top", d3.event.pageY - 35 + "px")
                toolTip.style("display", "inline-block")
                toolTip.style("opacity", "0.9");

                //Get the data associated with bar hovered over
                let barData = this.__data__

                toolTip.html(barData.key + "<br>" + barData.value);
                
                d3.select(this)
                    .style("fill", "#FFFF99")
                    .style("stroke", "Black")
                    .style("stroke-width", "1.8px")
                    .style("stroke-opacity", "1");
                
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("fill", color(d.key))
                    .transition().duration(200)
                    .style("stroke-opacity", "0");

                toolTip.style("display", "none")
            });
        
        bars.selectAll("rect")
            .transition()
            .delay(function (d) { return Math.random() * 1000; })
            .duration(1000)
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return this.height - y(d.value); }.bind(this));

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
            .attr("id", "svg")
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

    getColor(playerNames) {
        return d3.scaleOrdinal()
            .domain(playerNames)
            .range(['#003f5c','#7a5195','#bc4f90','#ef5675','#ff764a','#ffa600']);
    }

    //add legend to the current chart
    addLegend(players, color) {
        let legend = d3.select("svg")
            .selectAll('g.legend')
            .data(players)
            .enter()
            .append("g")
            .attr("class", "legend")
            .style("opacity", "0");

        legend.append("circle")
            .attr("cx", 1100)
            .attr('cy', (d, i) => i * 30 + 350)
            .attr("r", 6)
            .style("fill", d => color(d.key))

        legend.append("text")
            .attr("x", 1120)
            .attr("y", (d, i) => i * 30 + 355)
            .text(d => d.key);

        legend.append("text")
            .attr("x", 1120)
            .attr("y", 320)
            .style("fill", "black")
            .style("font-size", 16)
            .style("font-family", "Arial Black")
            .text("Player Name")

        legend.transition().duration(500).delay(function (d, i) { return 1300 + 100 * i; }).style("opacity", "1");
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