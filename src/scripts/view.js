import DataFetcher from "./data_fetcher";
import Player from "./player";

export default class View {
    constructor() {
        this.players = [];
        this.seasons = [];

        //Save HTML Elements related to user search form
        this.searchForm = document.querySelector(".player-search-form")
        this.searchInput = document.querySelector(".player-search-input")
        this.handleSearch = this.handleSearch.bind(this);
        this.searchForm.addEventListener("submit", this.handleSearch);

        //Save HTML Elements related to user inputs
        this.otherInputsForm = document.querySelector(".other-inputs");
        this.startSeasonToggle = document.querySelector("#start-season");
        this.endSeasonToggle = document.querySelector("#end-season");
        this.metricToggle = document.querySelector("#metric")
        this.handleSubmit = this.handleSubmit.bind(this);
        this.otherInputsForm.addEventListener("submit", this.handleSubmit);
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
            } else {
                this.addPlayer(new Player(playerData[0]));
            }
        });
    }

    //Event handler for "add player / search" button
    handleSearch(e) {
        e.preventDefault();
        let input  = this.searchInput.value
        this.searchPlayer(input);
        this.searchInput.value = '';
    }

    //Gets the season averages for all seasons selected by user
    iterateSeasons(start, end) {
        for(let i = start; i <= end; i++) {
            this.getSeasonAverages(i);
            this.seasons.push(parseInt(i));
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
        this.iterateSeasons(start, end);
        console.log(this.players);
        console.log(this.seasons)
    }

    //Gets the season data for one season
    //If we have hit the end season input, do what we need with data
    getSeasonAverages(season) {
        DataFetcher.getSeasonAverages(season, this.players)
            .then(data => {
                let averages = data.data;
                this.players = this.players.sort((a, b) => a.id > b.id ? 1 : -1);
                this.players.forEach((player, idx) => {
                    player.updateAverages(averages[idx]);
                })
            })
            .then(res => {
                if(parseInt(season) === parseInt(this.endSeasonToggle.value)) {
                    this.players.forEach((player) => {
                        console.log(`${player.fname}: ${this.getMetric(this.metricToggle.value, player)}`)
                    });
                }
            });
    }

    //Prints out the currently selected players to the console
    //Mainly used for debugging, can delete once functional
    printPlayers() {
        console.log(this.players);
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

}
