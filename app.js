const getRandomValue = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 150,
            monsterHealth: 300
        }
    },
    computed: {

    },
    methods: {
        attack() {
            const attackStr = getRandomValue(15, 5);
            this.monsterHealth -= attackStr;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackStr = getRandomValue(20, 9);
            this.playerHealth -= attackStr;
        }
    }
});
app.mount('#game');