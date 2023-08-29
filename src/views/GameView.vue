<template>
  <div class="container">
    <div class="round">Ход {{ game.round == 1 ? "белых" : "черных" }}</div>
    <table class="board" :style="{ width: `${size}px`, height: `${size}px` }">
      <ChessCell
        v-for="item in game.field"
        :key="item.id"
        :style="{ width: `${size / 8}px`, height: `${size / 8}px` }"
        :cellColor="item.color"
        :cellID="item.id"
        :cellFigureColor="item.figure.color"
        :cellFigureType="item.figure.type"
        :cellSelected="
          game.selectedCells.filter((cell) => cell == item.id).length > 0
        "
        @select="select"
        @move="move"
      />
      <div class="bar left" :style="{ height: `${size}px` }">
        <div class="left__item item" v-for="item in 8" :key="item">
          {{ game.side == 1 ? 9 - item : item }}
        </div>
      </div>
      <div class="bar bottom" :style="{ width: `${size}px` }">
        <div class="bottom__item item" v-for="item in 8" :key="item">
          {{ game.side == 1 ? letters[item - 1] : letters[8 - item] }}
        </div>
      </div>
    </table>
    <div class="win-window" v-if="win !== false">
      <div class="text">
        {{ `Победили ${win == 1 ? "белые" : "черные"}!` }}
      </div>
      <button class="btn" @click="exit()">В главное меню</button>
    </div>
    <div class="before-round-message" v-if="game.message">
      <div class="text">{{ game.message }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.board {
  display: flex;
  flex-wrap: wrap;

  margin: 0 5px;

  position: relative;
}

.round {
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 15px;
}

.bar {
  position: absolute;
  display: flex;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
  }

  &.left {
    width: 40px;

    left: -40px;
    top: 0;

    flex-direction: column;
  }

  .left {
    &__item {
      width: 40px;
      height: 80px;
    }
  }

  .bottom {
    &__item {
      width: 80px;
      height: 40px;
    }
  }

  &.bottom {
    height: 40px;

    left: 0;
    bottom: -40px;
  }
}

.win-window {
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #ffffffd4;

  .text {
    font-size: 25px;
    font-weight: 700;
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
  }
}

.before-round-message {
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffffd4;

  z-index: 100;

  .text {
    font-size: 25px;
  }
}
</style>

<script>
import ChessCell from "../components/ChessCell.vue";
import { Game } from "../js/Game";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "GameView",

  components: {
    ChessCell,
  },

  data() {
    return {
      game: {},
      size: 640,
    };
  },

  created() {
    this.checkSize();

    window.addEventListener("resize", this.checkSize);

    this.game = new Game({
      colors: { 0: "#e0f7dc", 1: "#5d8f40" },
      side: this.users.first == this.userID ? 1 : 0,
    });
    this.subscribeToGame(this.$route.params.key);
  },

  unmounted() {
    window.removeEventListener("resize", this.checkSize);
  },

  methods: {
    ...mapActions([
      "writeNewMove",
      "subscribeToGame",
      "exitFromGame",
      "clearAll",
    ]),

    select(position) {
      this.game.selectFigure(position);
    },

    move(position) {
      this.game.moveFigure(
        position,
        (move) => {
          this.writeNewMove(move);
        },
        (value) => {
          if (value) this.exitFromGame();
        }
      );
    },

    exit() {
      this.$router.push({ name: "home" });
    },

    checkSize() {
      const width = window.innerWidth;

      if (width < 690) {
        this.size = width - 60;
      }
    },
  },

  computed: {
    ...mapGetters(["users", "userID", "moves", "win", "roomKey"]),

    letters() {
      return ["a", "b", "c", "d", "e", "f", "g", "h"];
    },
  },

  watch: {
    moves(newValue) {
      if (newValue.length != this.game.moves.length) {
        if (newValue.length - this.game.moves.length == 2) {
          this.game.remoteMoveFigure(newValue[newValue.length - 2]);
        }
        this.game.remoteMoveFigure(newValue[newValue.length - 1]);
      }
    },

    win(newValue) {
      if (
        newValue != this.game.side &&
        newValue !== null &&
        newValue !== false
      ) {
        this.clearAll();
      }
    },
  },
};
</script>
