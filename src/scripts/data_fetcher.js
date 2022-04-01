import Player from './player'
import View from './view'

const DataFetcher = {
    getPlayer: async function(query) {
        const response = await fetch(`/api?searchTerm=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const playerData = await response.json() 
        return playerData;
    }
}

export default DataFetcher;