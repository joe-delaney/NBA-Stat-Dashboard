# NBA Statistics Dashboard

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

## Visualize Bar Chart
![Bar Chart Demo](https://user-images.githubusercontent.com/65872033/162226664-b7af1e5f-55b6-4416-96ac-bcb38f2251f9.gif)

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
