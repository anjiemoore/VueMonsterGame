const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100
        }
    },
    computed: {
        monsterHealthBar() {
            return {width: this.monsterHealth + '%'}
        },
        playerHealthBar() {
            return {width: this.playerHealth + '%'}
        }
    },
    methods: {
        attack() {
            const attackStr = getRandomValue(10, 5);
            this.monsterHealth -= attackStr;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackStr = getRandomValue(18, 8);
            this.playerHealth -= attackStr;
        }
    }
});
app.mount('#game');