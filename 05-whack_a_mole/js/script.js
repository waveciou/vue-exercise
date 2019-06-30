;(function(Vue){
    const app = new Vue({
        el: '#app',
        data: {
            time: 0,
            score: 0,
            gametime: 10,
            gameover: true,
            holeNumber: 9,
            currentHole: 0,
            lastHole: 0,
        },
        methods: {
            randomTime(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            },
            randomHole() {
                let index = Math.floor(Math.random() * this.holeNumber);
                this.currentHole = index + 1;
                if (this.currentHole === this.lastHole) {
                    this.randomHole();
                }
                this.lastHole = this.currentHole;
            },
            rabbitActive() {
                let time = this.randomTime(300, 1000);
                this.randomHole();
                setTimeout(() => {
                    this.currentHole = 0;
                    if (this.gameover === false) {
                        this.rabbitActive();
                    }
                }, time);
            },
            gameStart() {
                if(this.gameover === true) {
                    this.gameover = false;
                    this.score = 0;
                    this.time = this.gametime;
                    this.rabbitActive();

                    let timer = setInterval(() => {
                        this.time--;
                    }, 1000);

                    setTimeout(() => {
                        this.gameover = true;
                        this.time = 0;
                        clearInterval(timer);
                    }, this.gametime * 1000);
                }
            },
            getRabbit(e) {
                if (e.isTrusted === false) {
                    return false;
                }
                this.score += 10;
                this.currentHole = 0;
            }
        },
    });
})(Vue)