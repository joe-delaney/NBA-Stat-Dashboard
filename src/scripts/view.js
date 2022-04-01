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
            }
            
            //Do whatever you need to do in here after player is saved
            this.printPlayers();
        });
    }

    handleSearch(e) {
        e.preventDefault();
        let input  = this.searchInput.value
        this.searchPlayer(input);
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
        console.log(this.players[0]);
    }

    getSeasonAverages(season) {
        DataFetcher.getSeasonAverages(season, this.players[0].id)
            .then(data => {
                let averages = data.data[0];
                this.players[0].updateAverages(averages);
                // console.log(data.data[0])
            });
    }

    printPlayers() {
        console.log(this.players);
    }

    resetPlayerAverages() {
        this.players.forEach((player) => player.resetAverages());
    }

}
