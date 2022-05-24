//The code in this file is used to run the demos of the line and bar charts
const Demo = {
    async demoLineChart() {
        //exit out of about modal
        this.aboutModal.aboutModal.style.display = "none";
        this.initialInstructions.style.display = "none";

        //Disable buttons while demo is running
        this.otherInputsForm.classList.toggle("disabled");
        this.searchForm.classList.toggle("disabled");
        this.demoLineButton.classList.toggle('disabled');
        this.demoBarButton.classList.toggle('disabled');

        this.players = [];
        this.seasons = [];
        this.updateSelectedPlayers();
        await this.sleep(150);
        this.searchInput.value = "L";
        await this.sleep(150);
        this.searchInput.value = "Le";
        await this.sleep(150);
        this.searchInput.value = "Leb";
        await this.sleep(150);
        this.searchInput.value = "Lebr";
        await this.sleep(150);
        this.searchInput.value = "Lebro";
        await this.sleep(150);
        this.searchInput.value = "Lebron";
        await this.sleep(500);
        this.searchPlayer("Lebron");
        await this.sleep(1000);
        this.searchInput.value = "S";
        await this.sleep(150);
        this.searchInput.value = "St";
        await this.sleep(150);
        this.searchInput.value = "Ste";
        await this.sleep(150);
        this.searchInput.value = "Step";
        await this.sleep(150);
        this.searchInput.value = "Steph";
        await this.sleep(150);
        this.searchInput.value = "Stephe";
        await this.sleep(150);
        this.searchInput.value = "Stephen";
        await this.sleep(150);
        this.searchInput.value = "Stephen ";
        await this.sleep(150);
        this.searchInput.value = "Stephen C";
        await this.sleep(150);
        this.searchInput.value = "Stephen Cu";
        await this.sleep(150);
        this.searchInput.value = "Stephen Cur";
        await this.sleep(500);
        this.searchPlayer("Stephen Cur");
        await this.sleep(500);
        this.searchInput.value = "G";
        await this.sleep(150);
        this.searchInput.value = "Gi";
        await this.sleep(150);
        this.searchInput.value = "Gia";
        await this.sleep(150);
        this.searchInput.value = "Giann";
        await this.sleep(150);
        this.searchInput.value = "Gianni";
        await this.sleep(150);
        this.searchInput.value = "Giannis";
        await this.sleep(150);
        this.searchInput.value = "Giannis";
        await this.sleep(150);
        this.searchInput.value = "Giannis ";
        await this.sleep(150);
        this.searchInput.value = "Giannis A";
        await this.sleep(500);
        this.searchPlayer("Giannis A");
        await this.sleep(500);
        this.startSeasonToggle.value = 2013;
        await this.sleep(750);
        this.endSeasonToggle.value = 2020;
        this.metricToggle.value = 'ppg'
        this.chartToggle.value = 'line';
        await this.sleep(750);
        let start = this.startSeasonToggle.value;
        let end = this.endSeasonToggle.value;
        let numSeasons = parseInt(end) - parseInt(start) + 1;
        this.loading.classList.toggle("hide");
        if (!this.downloadButton.classList.contains("hide")) {
            this.downloadButton.classList.toggle("hide");
        }
        this.iterateSeasons(start, end, numSeasons);
        await this.sleep(750);

        //Re-enable buttons
        this.searchForm.classList.toggle("disabled");
        this.demoLineButton.classList.toggle('disabled');
        this.demoBarButton.classList.toggle('disabled');
    },

    async demoBarChart() {
        //exit out of about modal
        this.aboutModal.aboutModal.style.display = "none";
        this.initialInstructions.style.display = "none";

        //Disable buttons while demo is running
        this.searchForm.classList.toggle("disabled");
        this.otherInputsForm.classList.toggle("disabled");
        this.demoLineButton.classList.toggle('disabled');
        this.demoBarButton.classList.toggle('disabled');

        this.players = [];
        this.seasons = [];
        this.updateSelectedPlayers();
        await this.sleep(150);
        this.searchInput.value = "L";
        await this.sleep(150);
        this.searchInput.value = "Le";
        await this.sleep(150);
        this.searchInput.value = "Leb";
        await this.sleep(150);
        this.searchInput.value = "Lebr";
        await this.sleep(150);
        this.searchInput.value = "Lebro";
        await this.sleep(150);
        this.searchInput.value = "Lebron";
        await this.sleep(500);
        this.searchPlayer("Lebron");
        await this.sleep(1000);
        this.searchInput.value = "G";
        await this.sleep(150);
        this.searchInput.value = "Gi";
        await this.sleep(150);
        this.searchInput.value = "Gia";
        await this.sleep(150);
        this.searchInput.value = "Giann";
        await this.sleep(150);
        this.searchInput.value = "Gianni";
        await this.sleep(150);
        this.searchInput.value = "Giannis";
        await this.sleep(150);
        this.searchInput.value = "Giannis";
        await this.sleep(150);
        this.searchInput.value = "Giannis ";
        await this.sleep(150);
        this.searchInput.value = "Giannis A";
        await this.sleep(500);
        this.searchPlayer("Giannis A");
        await this.sleep(1000);
        this.searchInput.value = "S";
        await this.sleep(150);
        this.searchInput.value = "St";
        await this.sleep(150);
        this.searchInput.value = "Ste";
        await this.sleep(150);
        this.searchInput.value = "Step";
        await this.sleep(150);
        this.searchInput.value = "Steph";
        await this.sleep(150);
        this.searchInput.value = "Stephe";
        await this.sleep(150);
        this.searchInput.value = "Stephen";
        await this.sleep(150);
        this.searchInput.value = "Stephen ";
        await this.sleep(150);
        this.searchInput.value = "Stephen C";
        await this.sleep(150);
        this.searchInput.value = "Stephen Cu";
        await this.sleep(150);
        this.searchInput.value = "Stephen Cur";
        await this.sleep(500);
        this.searchPlayer("Stephen Cur");
        await this.sleep(500);
        this.startSeasonToggle.value = 2019;
        this.endSeasonToggle.value = 2021;
        this.metricToggle.value = 'ppg'
        this.sleep(500);
        this.chartToggle.value = 'bar';
        await this.sleep(1000);
        let start = this.startSeasonToggle.value;
        let end = this.endSeasonToggle.value;
        let numSeasons = parseInt(end) - parseInt(start) + 1;
        this.loading.classList.toggle("hide");
        if (!this.downloadButton.classList.contains("hide")) {
            this.downloadButton.classList.toggle("hide");
        }
        this.iterateSeasons(start, end, numSeasons);
        await this.sleep(750);

        //Re-enable buttons
        this.searchForm.classList.toggle("disabled");
        this.demoLineButton.classList.toggle('disabled');
        this.demoBarButton.classList.toggle('disabled');
    }
}

export default Demo;