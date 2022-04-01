import DataFetcher from "./data_fetcher";
import Player from "./player";

export default class View {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    searchPlayer(query) {
        DataFetcher.getPlayer(query)
        .then(result => {
            let playerData = result.data[0];
            this.addPlayer(new Player(playerData));

            //Do whatever you need to do in here after player is saved
            this.printPlayers();
        });
    }

    printPlayers() {
        console.log(this.players);
    }

}
