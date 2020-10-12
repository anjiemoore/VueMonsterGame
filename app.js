const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            battleLogMessages: []
        }
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%'};
            } else if (this.winner === 'draw') {
                return { width: '0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerHealthBar() {
            if (this.playerHealthBar < 0) {
                return { width: '0%'};
            } else if (this.winner === 'draw') {
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
                //draw
                this.winner = 'draw'
            } else if (value <= 0) {
                //player lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0  && this.playerHealth <= 0) {
                //draw
                this.winner = 'draw'
            } else if (value <= 0) {
                //monster lost
                this.winner = 'player'
            }
        }
    },
    methods: {
        attack() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 5);
            this.monsterHealth -= attackValue;
            this.addToBattleLog('player', 'attack', attackValue);
            this.attackplayer();
        },
        attackplayer() {
            const attackValue = getRandomValue(18, 8);
            this.addToBattleLog('monster', 'attack', attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            this.currentRound++;
            const attackValue = getRandomValue(25, 10);
            this.monsterHealth -= attackValue;
            this.addToBattleLog('player', 'special-attack', attackValue);
            this.attackplayer();
        },
        healPlayer() {
            this.currentRound++;
            const healAmount = getRandomValue(20, 10)
            if (this.playerHealth + healAmount > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healAmount;
            }
            this.addToBattleLog('player', 'heal', healAmount);
            this.attackplayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        playAgain() {
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.battleLogMessages = [];
        },
        addToBattleLog(who, what, value) {
            this.battleLogMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});
app.mount('#game');