# NBA Statistics Dashboard

# Background
The NBA Statistics Dashboard provides the average NBA fan with the ability to manipulate and analyze player-specific data in an easy and interactive way. The goal of this dashboard is to allow users to understand the NBA data trends and player comparisons that they are the most interested in. Users will have complete control to select any past or present NBA players and compare them across a variety of seasons, metrics, and data visualizations (see the **Functionality & MVP** and **Bonus** sections for more info).

# Functionality & MVPs
With the NBA Statistics Dashboard, users will be able to:
* Search for past or present NBA players by name
* Select multiple past or present NBA players for comparison
* Select the timeframe (start season and end season) to analyze
* Choose from common NBA statistics and metrics such as points-per-game (ppg)
* Toggle between different data visualizations to best present the data

# Wireframes
<img width="875" alt="NBA Statistics Dashboard Wireframe" src="https://user-images.githubusercontent.com/65872033/161177294-63b4ea8c-eaf3-4515-b9e1-d41300b33ee4.png">

* Nav links include links to this project's Github repo, my LinkedIn, and the **About** modal.
* The main content on the page will be the selected data visualization / chart.
* To the left of the chart, there will be a key of the current chart showing the current selected players. 
* To the bottom right of the chart, there will be a dropdown that allows the user to select the type of chart to display.
* On top of the chart, there will be the user inputs in the form of a search bar for the player name and dropdowns to select the start season, the end season, and the metric.

# Technologies, Libraries, APIs
This project will be implemented with the following technologies:
* The D3 library to render the data visualizations
* The balldontlie API to source the NBA statistics data
* Webpack and Babel to bundle and transpile the source Javascript code
* npm to manage project dependencies

# Implementation Timeline
* **Friday Afternoon & Weekend:** Setup project, including getting webpack up and running. Spend time understanding and getting comfortable pulling data from the API. Practice rendering different kinds of charts and data visualizations using the D3 library. 
* **Monday:** Spend the day connecting the data sourced from the API to the data visualizations created by the D3 library. Start to get simple charts displaying on the webpage after a successful data pull from the API.
* **Tuesday:** Implement the user search feature and make sure that the website transitions from a successful search to the correct data visualization. Begin to implement more complex data visualizations and add them to the options for the user to select.
* **Wednesday:** Finish implementing the more complex data visualizations and any other remaining user functionality. Upgrade the styling of the application using CSS to make it look visually appealing. If there is time, start on the bonuses.
* **Thursday Morning:** Deploy to GitHub and rewrite this proposal as a production README.

# Bonus Features
As this is an interactive user dashboard, there are many additional options that can be implemented for the user to choose from. Some potential updates include:
* Add options for showing statistics by NBA Team
* Add additional, more complex data visualizations (i.e. animated bar chart race)
* Create a user-driven simulation based on statistics / shot probabilities of players
