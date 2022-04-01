export default class Player {
    constructor(options) {
        this.fname = options.first_name;
        this.lname = options.last_name;
        this.id = options.id; 

        this.ppg = [];
        this.apg = [];
        this.rpg = [];
    }

    updateAverages(averages) {
        this.ppg.push(averages.pts);
        this.apg.push(averages.ast);
        this.rpg.push(averages.dreb + averages.oreb);
    }

    resetAverages() {
        this.ppg = [];
        this.apg = [];
        this.rpg = [];
    }
}