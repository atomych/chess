<template>
  <div
    class="cell"
    :class="{
      figure: cellFigureType != 0 || cellSelected,
      selected: cellSelected,
    }"
    :style="{
      backgroundColor: cellColor,
      width: `${cellSize}px`,
      height: `${cellSize}px`,
    }"
    @click="select()"
  >
    <img
      src="../src/figures/black-pawn.png"
      v-if="cellFigureType == 1 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-pawn.png"
      v-if="cellFigureType == 1 && cellFigureColor == 1"
    />
    <img
      src="../src/figures/black-knight.png"
      v-if="cellFigureType == 2 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-knight.png"
      v-if="cellFigureType == 2 && cellFigureColor == 1"
    />
    <img
      src="../src/figures/black-rook.png"
      v-if="cellFigureType == 4 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-rook.png"
      v-if="cellFigureType == 4 && cellFigureColor == 1"
    />
    <img
      src="../src/figures/black-bishop.png"
      v-if="cellFigureType == 3 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-bishop.png"
      v-if="cellFigureType == 3 && cellFigureColor == 1"
    />
    <img
      src="../src/figures/black-queen.png"
      v-if="cellFigureType == 5 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-queen.png"
      v-if="cellFigureType == 5 && cellFigureColor == 1"
    />
    <img
      src="../src/figures/black-king.png"
      v-if="cellFigureType == 6 && cellFigureColor == 0"
    />
    <img
      src="../src/figures/white-king.png"
      v-if="cellFigureType == 6 && cellFigureColor == 1"
    />
  </div>
</template>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &.figure {
    cursor: pointer;
  }

  &.selected {
    &::after {
      content: "";
      display: block;
      position: absolute;
      z-index: 100;

      width: 20px;
      height: 20px;

      border-radius: 50%;
      background-color: red;

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

img {
  width: 30px;
  height: auto;
}
</style>

<script>
export default {
  name: "ChessCell",

  props: {
    cellID: {
      type: String,
      default: "",
      required: true,
    },
    cellColor: {
      type: String,
      default: "#ffffff",
      required: true,
    },
    cellSize: {
      type: Number,
      default: 80,
      required: false,
    },
    cellFigureType: {
      type: Number,
      default: 0,
      required: false,
    },
    cellFigureColor: {
      type: Number,
      default: 0,
      required: false,
    },
    cellSelected: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  emits: {
    select: null,
    move: null,
  },

  methods: {
    select() {
      if (this.cellSelected) this.$emit("move", this.cellID);
      else if (this.cellFigureType != 0) this.$emit("select", this.cellID);
    },
  },
};
</script>
