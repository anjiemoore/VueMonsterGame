const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        }
    },
    computed: {
        monsterHealthBar() {
            return {width: this.monsterHealth + '%'}
        },
        playerHealthBar() {
            return {width: this.playerHealth + '%'}
        },
        useSpecialAttack() {
            return this.currentRound % 3 !==0
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
            this.playerHealth += healAmount;
            this.attackPlayer();
        },
        surrender() {
            alert("You just lost!");
            this.counter === 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
        }
    }
});
app.mount('#game');