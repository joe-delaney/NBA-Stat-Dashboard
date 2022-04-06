import DataFetcher from "./data_fetcher";
import Player from "./player";
import DataVisual from "./data_visual";
import SaveSVGAsPNG from "./saveSVGAsPNG";

export default class View {
    constructor() {
        this.players = [];
        this.seasons = [];

        //Save HTML Elements related to user search form
        this.searchForm = document.querySelector(".player-search-form")
        this.searchInput = document.querySelector(".player-search-input")
        this.handleSearch = this.handleSearch.bind(this);
        this.searchForm.addEventListener("submit", this.handleSearch);
        this.searchResults = document.querySelector(".search-results");
        this.handleSearchResultClicked = this.handleSearchResultClicked.bind(this);
        this.searchResults.addEventListener("click", this.handleSearchResultClicked);
        this.clearSearchResults = this.clearSearchResults.bind(this);
        this.searchInput.addEventListener("input", this.clearSearchResults);

        //Save HTML Elements related to selected players bar
        this.selectedPlayersList = document.querySelector(".selected-players");
        this.removePlayer = this.removePlayer.bind(this);
        this.selectedPlayersList.addEventListener("click", this.removePlayer)

        //Save HTML Elements related to user inputs
        this.otherInputsForm = document.querySelector(".other-inputs");
        this.startSeasonToggle = document.querySelector("#start-season");
        this.endSeasonToggle = document.querySelector("#end-season");
        this.metricToggle = document.querySelector("#metric");
        this.chartToggle = document.querySelector("#chart");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.otherInputsForm.addEventListener("submit", this.handleSubmit);

        //Save HTML Element related to chart
        this.downloadButton = document.querySelector('.download');
        this.downloadButtonClicked = this.downloadButtonClicked.bind(this);
        this.downloadButton.addEventListener("click", this.downloadButtonClicked);
        this.downloadButton.classList.toggle("hide");

        this.visual = new DataVisual();
    }

    //Adds player to current user selection
    addPlayer(player) {
        this.players.push(player);
    }

    //Searches for a player and adds him if found
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

    //Event handler for "add player / search" button
    handleSearch(e) {
        e.preventDefault();
        let input  = this.searchInput.value
        this.searchPlayer(input);
    }

    //Event handler for selecting search results
    handleSearchResultClicked(e) {
        if (e.target.matches('li')) {
            let options = {
                first_name: e.target.getAttribute("data-first-name"),
                last_name: e.target.getAttribute("data-last-name"),
                id: parseInt(e.target.getAttribute("data-id"))
            }

            if(!this.alreadySelected(options)) {
                this.addPlayer(new Player(options));
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
        }
    }

    clearSearchResults(e) {
        //Reset the search results list
        while (this.searchResults.firstChild) {
            this.searchResults.removeChild(this.searchResults.firstChild);
        }
    }

    //Gets the season averages for all seasons selected by user
    iterateSeasons(start, end, numSeasons) {
        for(let i = start; i <= end; i++) {
            this.getSeasonAverages(i, numSeasons);
        }
    }

    //Event handler for "visualize data" button
    //Reset player averages and currently selected seasons
    //Fetch new season data
    handleSubmit(e) {
        e.preventDefault();

        if(this.players.length  === 0 ) {
            alert("Please select a player first");
        } else {
            if(!this.downloadButton.classList.contains("hide")) {
                this.downloadButton.classList.toggle("hide");
            }
            this.reset();
            let start = this.startSeasonToggle.value;
            let end = this.endSeasonToggle.value;
            let numSeasons = parseInt(end) - parseInt(start) + 1   
            
            if(parseInt(end) >= parseInt(start)) {
                this.iterateSeasons(start, end, numSeasons);
            } else {
                alert("End Season can't be before Start Season");
            }
        }
    }

    //Gets the season data for one season
    //If we have hit the end season input, do what we need with data
    getSeasonAverages(season, numSeasons) {
        DataFetcher.getSeasonAverages(season, this.players)
            .then(data => {
                let averages = data.data;
                // //Sort by player id to match API pull
                // this.players = this.players.sort((a, b) => a.id > b.id ? 1 : -1);

                //Loop handles updating player data for correct player
                //Need to keep track of averages idx because of the way
                //API returns data.
                let averages_idx = 0;
                this.players.forEach((player) => {
                    if(averages && averages_idx < averages.length && averages[averages_idx].player_id === player.id) {
                        player.updateAverages(parseInt(season), averages[averages_idx]);
                        averages_idx++;
                    } else {
                        player.updateAverages(parseInt(season));
                    }
                })
            })
            .then(res => {
                //It doesn't matter what order the stats come in, just need
                //to make sure that we have them all before doing anything else
                this.seasons.push(parseInt(season));
                this.seasons = this.seasons.sort();
                if(this.seasons.length === numSeasons) {
                    let chartData = this.getChartData(this.metricToggle.value);
                    this.visual.reset();
                    this.visual.drawChart(this.chartToggle.value, this.seasons, chartData);
                    setTimeout(() => this.downloadButton.classList.toggle("hide"), 1500);
                }
            });
    }

    //Resets player average arrays and seasons array in preparation for new data
    reset() {
        this.players.forEach((player) => player.resetAverages());
        this.seasons = [];
    }

    //returns the selected metric array for a given player 
    getMetric(metric, player) {
        switch (metric) {
            case "ppg":
                return player.ppg;
            case "apg":
                return player.apg;
            case "rpg":
                return player.rpg;
            case "spg":
                return player.spg;
            case "fg_pct":
                return player.fg_pct;
            case "fg3_pct":
                return player.fg3_pct;
            default:
                break;
        }
    }

    getChartData(metric) {
        //Data must be organized differently depending on chart selected
        let chartData = [];
        if(this.chartToggle.value === "line") {
            let metricLabel = this.metricToggle.value;
            this.players.forEach((player) => {
                let metricData = this.getMetric(metric, player);
                metricData.forEach((metric)=> {
                    chartData.push({
                        season: metric[0],
                        name: `${player.fname} ${player.lname}`,
                        metric: metric[1],
                        metricLabel: metricLabel
                    })
                });
            });
        } else if(this.chartToggle.value === "bar") {
            let metricLabel = this.metricToggle.value;
            this.seasons.forEach((season, idx) => {
                let row = {"season": season};
                this.players.forEach((player) => {
                    row[`${player.fname} ${player.lname}`] = this.getMetric(metric, player)[idx][1];
                })
                row[`metricLabel`] = metricLabel;
                chartData.push(row);
            })
        }
        return chartData;
    }

    alreadySelected(playerData) {
        let found = false;
        this.players.forEach((player) => {
            if(player.id === playerData.id) found = true;
        });
        return found;
    }

    removePlayer(e) {
        if (e.target.matches('button')) {
            let idx = e.target.id
            this.players.splice(idx, 1);
            this.updateSelectedPlayers();
        }
    }

    updateSelectedPlayers() {
        //Reset the selected players list
        while (this.selectedPlayersList.firstChild) {
            this.selectedPlayersList.removeChild(this.selectedPlayersList.firstChild);
        }

        //Reset the search results list
        while (this.searchResults.firstChild) {
            this.searchResults.removeChild(this.searchResults.firstChild);
        }

        //Append all players to the list
        this.players.forEach( (player, idx) => {
            let li = document.createElement("li");
            li.classList.add("selected-player")

            let label = document.createElement("label");
            label.classList.add("selected-player-label");
            label.innerHTML = `${player.fname} ${player.lname}`;

            let button = document.createElement("button");
            button.classList.add("remove-player-button");
            button.id = `${idx}`
            button.innerHTML = "x";

            li.append(label);
            li.append(button);
            this.selectedPlayersList.append(li);
        })
    }

    downloadButtonClicked(e) {
        saveSvgAsPng(document.getElementById("svg"), "nba-stats-chart.png", {backgroundColor: "white"});
    }
}
