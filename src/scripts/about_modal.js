export default class AboutModal {
    constructor() {
        this.aboutModal = document.querySelector("#about-modal");
        this.aboutButton = document.querySelector(".instructions");
        this.span = document.getElementsByClassName("close")[0];

        this.aboutButton.addEventListener("click", (e) => {
            this.aboutModal.style.display = "block";
        });

        this.span.addEventListener("click", (e) => {
            this.aboutModal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if(e.target === this.aboutModal) {
                this.aboutModal.style.display = "none";
            }
        })
    }
}