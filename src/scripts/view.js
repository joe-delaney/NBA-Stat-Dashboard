import DataFetcher from "./data_fetcher";
import Player from "./player";

export default class View {
    constructor() {
        this.players = [];

        this.searchForm = document.querySelector(".player-search-form")
        this.searchInput = document.querySelector(".player-search-input")
        this.handleSearch = this.handleSearch.bind(this);
        this.searchForm.addEventListener("submit", this.handleSearch);

        this.otherInputsForm = document.querySelector(".other-inputs");
        this.startSeasonToggle = document.querySelector("#start-season");
        this.endSeasonToggle = document.querySelector("#end-season");
        this.metricToggle = document.querySelector("#metric")
        this.handleSubmit = this.handleSubmit.bind(this);
        this.otherInputsForm.addEventListener("submit", this.handleSubmit);
    }

    addPlayer(player) {
        this.players.push(player);
    }

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
                //Do whatever you need to do in here after player is saved
                this.printPlayers();
            }

        });
    }

    handleSearch(e) {
        e.preventDefault();
        let input  = this.searchInput.value
        this.searchPlayer(input);
        this.searchInput.value = '';
    }

    iterateSeasons(start, end) {
        for(let i = start; i <= end; i++) {
            this.getSeasonAverages(i);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.resetPlayerAverages();
        let start = this.startSeasonToggle.value;
        let end = this.endSeasonToggle.value;
        this.iterateSeasons(start, end);
        console.log(this.players);

        
        // console.log(this.getMetric(this.metricToggle.value, this.players[0]));
    }

    getSeasonAverages(season) {
        DataFetcher.getSeasonAverages(season, this.players)
            .then(data => {
                debugger;
                let averages = data.data;
                this.players = this.players.sort((a, b) => a.id > b.id ? 1 : -1);
                this.players.forEach((player, idx) => {
                    player.updateAverages(averages[idx]);
                })
            })
            .then(res => {
                this.players.forEach((player) => {
                    console.log(`${player.fname}: ${this.getMetric(this.metricToggle.value, player)}`)
                });
            });
    }

    printPlayers() {
        console.log(this.players);
    }

    resetPlayerAverages() {
        this.players.forEach((player) => player.resetAverages());
    }

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
