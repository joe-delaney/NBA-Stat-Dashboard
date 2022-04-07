# NBA Statistics Dashboard <img src="https://user-images.githubusercontent.com/65872033/162228109-b0beb6e8-3281-4b06-b710-d462465c0cf7.png" width="150" height="150" /> 


# Description
The NBA Statistics Dashboard provides the average NBA fan with the ability to manipulate and analyze player-specific data in an easy and interactive way. The goal of this dashboard is to allow users to understand the NBA data trends and player comparisons that they are the most interested in. Users will have complete control to select any past or present NBA players and compare them across a variety of seasons, metrics, and data visualizations.

**Try it out for yourself here: [NBA Statistics Dashboard](https://nba-stats-dashboard.herokuapp.com/)**

# Technologies, Libraries, APIs
* Vanilla Javascript
* HTML5 / CSS3
* The D3 library to render the data visualizations
* The [balldontlie API](https://www.balldontlie.io/#introduction) to source the NBA statistics data
* Webpack and Babel to bundle and transpile the source Javascript code
* npm to manage project dependencies

# Dashboard Functionality
## How to Use
<img width="718" alt="About Modal" src="https://user-images.githubusercontent.com/65872033/162224188-449e7046-23e8-4c7e-87b3-fcedd25b8212.png">

## Player Search and Selection
![Search-and-select-player-demo](https://user-images.githubusercontent.com/65872033/162221416-5e01a43d-054e-406f-8a0e-77a5ee25d3c2.gif)

## Visualize Line Chart
![Line Chart Demo](https://user-images.githubusercontent.com/65872033/162226309-857f67e1-927b-4cd5-a7d9-7c7be96b6715.gif)
```js
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

        //Set Color Scheme
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

        //Animate the lines
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

        //Add toolTip and related line
        let toolTip = d3.select("#chart-tool-tip");
        const tooltipLine = svg.append('line').attr("class", "tool-tip-line");

        let tipBox = svg.append('rect')
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
```

## Visualize Bar Chart
![Bar Chart Demo](https://user-images.githubusercontent.com/65872033/162226664-b7af1e5f-55b6-4416-96ac-bcb38f2251f9.gif)
```js
    drawBarChart(seasons, chartData) {
        let svg = this.getSVG();

        //Create values array for Y axis - min and max
        let values = [];
        chartData.forEach((row) => {
            Object.keys(row).forEach((key) => {
                if(key !== "season" && key !== 'metricLabel') {
                    values.push(row[key]);
                }
            })
        })

        //Get each player name for subgroups
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
            .domain([0, d3.max(values, d => d * 1.25)])
            .range([this.height, 30]);
        svg.append("g")
            .call(d3.axisLeft(y));
        this.addYAxisLabel(svg);

        //Set Color Scheme
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
            .attr("height", function (d,i) { return this.height - y(0);}.bind(this))
            .attr("fill", function (d) { return color(d.key); })
            .attr("value", function (d) {return d.value})
            .attr("idx", function(d) {return d.idx})
            .on("mouseover", function (d) {  
                //Add toolTip on hover
                toolTip.style("left", d3.event.pageX + 10 + "px")
                toolTip.style("top", d3.event.pageY - 35 + "px")
                toolTip.style("display", "inline-block")
                toolTip.style("opacity", "0.9");

                //Get the data associated with bar hovered over
                let barData = this.__data__

                toolTip.html(barData.key + "<br>" + barData.value);
                
                //Add styling to bar on hover
                d3.select(this)
                    .style("fill", "#FFFF99")
                    .style("stroke", "Black")
                    .style("stroke-width", "1.8px")
                    .style("stroke-opacity", "1");
                
            })
            .on("mouseout", function (d) {
                //Remove styling on mouseout
                d3.select(this)
                    .style("fill", color(d.key))
                    .transition().duration(200)
                    .style("stroke-opacity", "0");

                //Remove tooltip on mouseout
                toolTip.style("display", "none")
            });
        
        //Animate bars
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
 ```

# Functionality & MVPs
With the NBA Statistics Dashboard, users will be able to:
* Search for past or present NBA players by name
* Select multiple past or present NBA players for comparison
* Select the timeframe (start season and end season) to analyze
* Choose from common NBA statistics and metrics such as points-per-game (ppg)
* Toggle between different data visualizations to best present the data
* Hover over data visualizations to highlight specific statistics
* Download their data visualization as a PNG file

# Future Considerations
* Add options for showing statistics by NBA Team
* Add additional, more complex data visualizations (i.e. animated bar chart race)
* Create a user-driven simulation based on statistics / shot probabilities of players

# Additional Code Snippets
## Data Visualization Helper Methods
```js
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
```
## Search Player
```js
//Searches for a player and adds him if found
//list elements will be appended to the search bar when the search returns more than one player
    searchPlayer(query) {
        if(this.players.length === 6) {
            alert("Maximum number of players selected");
            this.searchInput.value = '';
        } else if(query.length > 0) {
            DataFetcher.getPlayer(query)
            .then(result => {
                let playerData = result.data;
                if(playerData.length === 0) {
                    let li = document.createElement("li");
                    li.innerHTML = `No players found`;
                    li.classList.add("no-results");
                    this.searchResults.append(li);
                } else if(playerData.length === 1) {
                    if(!this.alreadySelected(playerData[0])) {
                        this.addPlayer(new Player(playerData[0]));
                        this.searchInput.value = '';

                        //Sort by player id to match API pull
                        this.players = this.players.sort((a, b) => a.id > b.id ? 1 : -1);
                        this.updateSelectedPlayers();
                    } else {
                        let li = document.createElement("li");
                        li.innerHTML = `Player is already selected`;
                        li.classList.add("no-results");
                        this.searchResults.append(li);
                    }
                } else {
                    playerData = playerData.sort((a,b) => a.last_name > b.last_name ? 1: -1);
                    playerData.forEach((player) => {
                        let li = document.createElement("li");
                        li.innerHTML = `${player.first_name} ${player.last_name}, ${player.team.abbreviation}`;
                        li.setAttribute("data-first-name", player.first_name);
                        li.setAttribute("data-last-name", player.last_name);
                        li.setAttribute("data-id", player.id);
                        li.classList.add("search-result");
                        this.searchResults.append(li);
                    })
                }
            });
        }
    }
 ```
