import Player from './player'
import View from './view'

const DataFetcher = {
    getPlayer: async function(query) {
        const response = await fetch(`/search?searchTerm=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const playerData = await response.json() 
        return playerData;
    },

    getSeasonAverages: async function(season, players) {
        let playerIds = [];
        players.forEach((player) => {
            playerIds.push(player.id);
        })
        const response = await fetch(`/season-average?season=${encodeURIComponent(season)}&playerId=${encodeURIComponent(JSON.stringify(playerIds))}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const playerData = await response.json()
        return playerData;
    }
}

export default DataFetcher;