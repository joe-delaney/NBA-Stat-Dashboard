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

    updateAverages(averages) {
        if(averages) {
            this.ppg.push(averages.pts);
            this.apg.push(averages.ast);
            this.rpg.push(averages.reb);
            this.spg.push(averages.stl);
            this.fg_pct.push(averages.fg_pct)
            this.fg3_pct.push(averages.fg3_pct)
        } else {
            this.ppg.push(0);
            this.apg.push(0);
            this.rpg.push(0);
            this.spg.push(0);
            this.fg_pct.push(0)
            this.fg3_pct.push(0)
        }
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