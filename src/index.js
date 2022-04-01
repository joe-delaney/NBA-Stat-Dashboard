import DataFetcher from "./scripts/data_fetcher";
import View from "./scripts/view";
import Player from "./scripts/player"


document.addEventListener("DOMContentLoaded", () => {
    let view = new View();
    // debugger;
    view.searchPlayer("Morant");
    view.searchPlayer("lebron");
    view.searchPlayer("carmelo");
    view.searchPlayer("garnett");
    view.searchPlayer("westbrook");
});