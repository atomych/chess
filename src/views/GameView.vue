<template>
  <table class="board">
    <ChessCell
      v-for="item in game.field"
      :key="item.id"
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
    <div class="bar left">
      <div class="left__item item" v-for="item in 8" :key="item">
        {{ game.side == 1 ? 9 - item : item }}
      </div>
    </div>
    <div class="bar bottom">
      <div class="bottom__item item" v-for="item in 8" :key="item">
        {{ game.side == 1 ? letters[item - 1] : letters[8 - item] }}
      </div>
    </div>
  </table>
</template>

<style lang="scss">
.board {
  width: 640px;
  height: 640px;

  display: flex;
  flex-wrap: wrap;

  margin: 0 auto;
  margin-top: 40px;

  position: relative;
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
    height: 640px;

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
    width: 640px;
    height: 40px;

    left: 0;
    bottom: -40px;
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
    };
  },

  created() {
    this.game = new Game({
      colors: { 0: "#e0f7dc", 1: "#5d8f40" },
      side: this.users.first == this.userID ? 1 : 0,
    });
    this.subscribeToGame(this.$route.params.key);
  },

  methods: {
    ...mapActions(["writeNewMove", "subscribeToGame"]),

    select(position) {
      this.game.selectFigure(position);
    },

    move(position) {
      this.game.moveFigure(position, (move) => {
        this.writeNewMove(move);
      });
    },
  },

  computed: {
    ...mapGetters(["users", "userID", "moves"]),

    letters() {
      return ["a", "b", "c", "d", "e", "f", "g", "h"];
    },
  },

  watch: {
    moves(newValue) {
      if (newValue.length != this.game.moves.length) {
        this.game.remoteMoveFigure(newValue[newValue.length - 1]);
      }
    },
  },
};
</script>