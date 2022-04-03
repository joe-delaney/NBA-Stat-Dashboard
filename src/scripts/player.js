export default class Player {
    constructor(options) {
        this.fname = options.first_name;
        this.lname = options.last_name;
        this.id = options.id; 

        this.ppg = []; //points per game
        this.apg = []; //assists per game
        this.rpg = []; //rebounds per game
        this.spg =  []; //steals per game
        this.fg_pct = []; //fg percentage
        this.fg3_pct = []; //3 point percentage
    }

    updateAverages(season, averages) {
        season = parseInt(season);
        if(averages) {
            this.ppg.push([season, averages.pts]);
            this.apg.push([season, averages.ast]);
            this.rpg.push([season, averages.reb]);
            this.spg.push([season, averages.stl]);
            this.fg_pct.push([season, averages.fg_pct])
            this.fg3_pct.push([season, averages.fg3_pct])
        } else {
            this.ppg.push([season, 0]);
            this.apg.push([season, 0]);
            this.rpg.push([season, 0]);
            this.spg.push([season, 0]);
            this.fg_pct.push([season, 0])
            this.fg3_pct.push([season, 0])
        }
        this.sortAverages();
    }

    sortAverages() {
        this.ppg = this.ppg.sort((a, b) => a[0] > b[0] ? 1 : -1 );
        this.apg = this.apg.sort((a, b) => a[0] > b[0] ? 1 : -1 );
        this.rpg = this.rpg.sort((a, b) => a[0] > b[0] ? 1 : -1 );
        this.spg = this.spg.sort((a, b) => a[0] > b[0] ? 1 : -1 );
        this.fg_pct = this.fg_pct.sort((a, b) => a[0] > b[0] ? 1 : -1 );
        this.fg3_pct = this.fg3_pct.sort((a, b) => a[0] > b[0] ? 1 : -1 );
    }

    resetAverages() {
        this.ppg = [];
        this.apg = [];
        this.rpg = [];
        this.spg = [];
        this.fg_pct = [];
        this.fg3_pct = [];
    }
}