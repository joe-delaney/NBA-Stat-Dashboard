import DataFetcher from "./data_fetcher";
import Player from "./player";
import DataVisual from "./data_visual";

export default class View {
    constructor() {
        this.players = [];
        this.seasons = [];

        //Save HTML Elements related to user search form
        this.searchForm = document.querySelector(".player-search-form")
        this.searchInput = document.querySelector(".player-search-input")
        this.handleSearch = this.handleSearch.bind(this);
        this.searchForm.addEventListener("submit", this.handleSearch);

        //Save HTML Elements related to selected players bar
        this.selectedPlayersList = document.querySelector(".selected-players");

        //Save HTML Elements related to user inputs
        this.otherInputsForm = document.querySelector(".other-inputs");
        this.startSeasonToggle = document.querySelector("#start-season");
        this.endSeasonToggle = document.querySelector("#end-season");
        this.metricToggle = document.querySelector("#metric")
        this.handleSubmit = this.handleSubmit.bind(this);
        this.otherInputsForm.addEventListener("submit", this.handleSubmit);

        this.visual = new DataVisual();
    }

    //Adds player to current user selection
    addPlayer(player) {
        this.players.push(player);
    }

    //Searches for a player and adds him if found
    searchPlayer(query) {
        DataFetcher.getPlayer(query)
        .then(result => {
            let playerData = result.data;
            if(playerData.length === 0) {
                alert("There are no players that match that name");
            } else if(playerData.length > 1) {
                alert("Please Narrow Your Search");
            }
            else {
                if(!this.alreadySelected(playerData)) {
                    this.addPlayer(new Player(playerData[0]));
                    this.searchInput.value = '';
                    //Sort by player id to match API pull
                    this.players = this.players.sort((a, b) => a.id > b.id ? 1 : -1);
                    this.updateSelectedPlayers();
                } else {
                    alert("Player is already selected");
                }
            }
        });
    }

    //Event handler for "add player / search" button
    handleSearch(e) {
        e.preventDefault();
        let input  = this.searchInput.value
        this.searchPlayer(input);
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
        this.reset();
        let start = this.startSeasonToggle.value;
        let end = this.endSeasonToggle.value;
        let numSeasons = parseInt(end) - parseInt(start) + 1        
        this.iterateSeasons(start, end, numSeasons);
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
                    console.log(this.seasons.length);
                    console.log(numSeasons);
                    this.players.forEach((player) => {
                        console.log(`${player.fname}: ${this.getMetric(this.metricToggle.value, player)}`)
                    })
                    let chartData = this.getChartData(this.metricToggle.value);
                    this.visual.reset();
                    this.visual.drawLineChart(this.seasons, chartData);
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
        let chartData = [];
        let metricLabel = this.metricToggle.value;
        this.players.forEach((player) => {
            let metricData = this.getMetric(metric, player);
            metricData.forEach((metric)=> {
                chartData.push({
                    season: metric[0],
                    name: player.fname + " " + player.lname,
                    metric: metric[1],
                    metricLabel: metricLabel
                })
            });
        });
        return chartData;
    }

    alreadySelected(playerData) {
        let found = false;
        this.players.forEach((player) => {
            if(player.id === playerData[0].id) found = true;
        });
        return found;
    }

    updateSelectedPlayers() {
        //Reset the list
        while (this.selectedPlayersList.firstChild) {
            this.selectedPlayersList.removeChild(this.selectedPlayersList.firstChild);
        }

        //Append all players to the list
        this.players.forEach( (player) => {
            let li = document.createElement("li");
            li.innerHTML = `${player.fname} ${player.lname}`;
            li.classList.add("selected-player")
            this.selectedPlayersList.append(li);
        })
    }

}
