<template>
  <div class="container">
    <h1 class="title">Шахматы Онлайн</h1>
    <button class="btn" @click="create()">Создать игру</button>
    <button class="btn" @click="join()">Присоединиться</button>
    <input
      type="text"
      class="input"
      placeholder="Введите ключ комнаты..."
      v-model="roomKey"
    />
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

.btn {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 20px;

  border: none;
  outline: none;
  background: none;

  cursor: pointer;

  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.input {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 20px;

  padding: 5px 10px;
  outline: none;

  border-radius: 5px;
  border: 1px solid #000;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  name: "HomeView",

  data() {
    return {
      roomKey: "",
    };
  },

  methods: {
    ...mapActions(["connectToRoom", "createRoom"]),
    create() {
      this.createRoom((key) => {
        this.$router.push({ name: "room", params: { key: key } });
      });
    },
    join() {
      this.connectToRoom({
        key: this.roomKey,
        cb: () => {
          this.$router.push({ name: "room", params: { key: this.roomKey } });
        },
      });
    },
  },
};
</script>
