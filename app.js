const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%'};
            } else if (this.winner === 'Draw') {
                return { width: '0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerHealthBar() {
            if (this.playerHealthBar < 0) {
                return { width: '0%'};
            } else if (this.winner === 'Draw') {
                return { width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        useSpecialAttack() {
            return this.currentRound % 3 !==0
        }

    },
    watch: {
        playerHealth(value) {
            if (value <= 0  && this.monsterHealth <= 0) {
                //Draw
                this.winner = 'Draw'
            } else if (value <= 0) {
                //Player lost
                this.winner = 'Monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0  && this.playerHealth <= 0) {
                //Draw
                this.winner = 'Draw'
            } else if (value <= 0) {
                //Monster lost
                this.winner = 'Player'
            }
        }
    },
    methods: {
        attack() {
            this.currentRound++;
            const attackStr = getRandomValue(10, 5);
            this.monsterHealth -= attackStr;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackStr = getRandomValue(18, 8);
            this.playerHealth -= attackStr;
        },
        specialAttack() {
            this.currentRound++;
            const attackStr = getRandomValue(25, 10);
            this.monsterHealth -= attackStr;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healAmount = getRandomValue(20, 10)
            if (this.playerHealth + healAmount > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healAmount;
            }
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'Monster';
        },
        playAgain() {
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
        }
    }
});
app.mount('#game');