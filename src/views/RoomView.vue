<template>
  <div class="container">
    <h1 class="title">Комната - {{ roomKey }}</h1>
    <div class="player">Игрок 1: {{ users.first }}</div>
    <div class="player">
      Игрок 2: {{ users.second == false ? "место свободно" : users.second }}
    </div>
    <button
      class="btn"
      :class="{ block: users.first != userID || !users.second }"
      @click="start()"
    >
      Начать
    </button>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin-bottom: 30px;
}

.player {
  font-size: 20px;
  margin-bottom: 20px;
}

.btn {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 20px;

  border: none;
  outline: none;
  background: none;

  cursor: pointer;

  &.block {
    opacity: 0.6;
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RoomView",

  computed: {
    ...mapGetters(["roomKey", "users", "userID", "play"]),
  },

  methods: {
    ...mapActions(["startGame"]),

    start() {
      if (this.users.first == this.userID && this.users.second) {
        this.startGame(this.roomKey);
      }
    },
  },

  watch: {
    play(newValue) {
      if (newValue == true)
        this.$router.push({ name: "game", params: { key: this.roomKey } });
    },
  },
};
</script>
