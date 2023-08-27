import { Field } from "./Field";
import { Pawn } from "./figures/Pawn";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Rook } from "./figures/Rook";
import { Queen } from "./figures/Queen";
import { King } from "./figures/King";

class Game {
  constructor(settings) {
    this._round = 1;
    this._side = settings.side;
    this._field = new Field({ side: this._side, colors: settings.colors });
    this._selectedCells = [];
    this._selectedFigure = {};
    this._moves = [];
    this._win = false;

    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    //? Pawns
    for (let letter of letters) {
      this._field.setFigure(
        `${letter}2`,
        new Pawn({ color: 1, position: `${letter}2` })
      );
      this._field.setFigure(
        `${letter}7`,
        new Pawn({ color: 0, position: `${letter}7` })
      );
    }

    //? Knights
    this._field.setFigure("b1", new Knight({ color: 1, position: "b1" }));
    this._field.setFigure("g1", new Knight({ color: 1, position: "g1" }));
    this._field.setFigure("b8", new Knight({ color: 0, position: "b8" }));
    this._field.setFigure("g8", new Knight({ color: 0, position: "g8" }));

    //? Bishops
    this._field.setFigure("c1", new Bishop({ color: 1, position: "c1" }));
    this._field.setFigure("f1", new Bishop({ color: 1, position: "f1" }));
    this._field.setFigure("c8", new Bishop({ color: 0, position: "c8" }));
    this._field.setFigure("f8", new Bishop({ color: 0, position: "f8" }));

    //? Rooks
    this._field.setFigure("a1", new Rook({ color: 1, position: "a1" }));
    this._field.setFigure("h1", new Rook({ color: 1, position: "h1" }));
    this._field.setFigure("a8", new Rook({ color: 0, position: "a8" }));
    this._field.setFigure("h8", new Rook({ color: 0, position: "h8" }));

    //? Queens
    this._field.setFigure("d1", new Queen({ color: 1, position: "d1" }));
    this._field.setFigure("d8", new Queen({ color: 0, position: "d8" }));

    //? Kings
    this._field.setFigure("e1", new King({ color: 1, position: "e1" }));
    this._field.setFigure("e8", new King({ color: 0, position: "e8" }));
  }

  get field() {
    return this._field.field;
  }

  get side() {
    return this._side;
  }

  get selectedCells() {
    return this._selectedCells;
  }

  get moves() {
    return this._moves;
  }

  get win() {
    return this._win;
  }

  get round() {
    return this._round;
  }

  checkWin() {
    const white = this._field.field.filter(
      (cell) => cell.figure.type == 6 && cell.figure.color == 1
    ).length;
    const black = this._field.field.filter(
      (cell) => cell.figure.type == 6 && cell.figure.color == 0
    ).length;

    if (white && !black) {
      this._win = 1;
    } else if (!white && black) {
      this._win = 0;
    }
  }

  selectFigure(position) {
    this._selectedCells = [];
    this._selectedFigure = {};

    if (
      this._field.getCell(position).figure.color != this._round ||
      this._field.getCell(position).figure.color != this._side
    )
      return;

    for (let cell of this._field
      .getCell(position)
      .figure.possibleMoves(this._field)) {
      this._selectedCells.push(cell);
    }
    this._selectedFigure = this._field.getCell(position).figure;
  }

  moveFigure(position, cb, mbwin) {
    if (this._win === false) {
      this._moves.push(`${this._selectedFigure.position}${position}`);
      cb(`${this._selectedFigure.position}${position}`);

      this._field.moveFigure(this._selectedFigure.position, position);
      this.checkWin();

      if (this._win !== false) mbwin(true);

      this._round = this._round == 1 ? 0 : 1;

      this._selectedCells = [];
      this._selectedFigure = {};
    }
  }

  remoteMoveFigure(move) {
    if (this._win === false) {
      this._moves.push(move);
      this._round = this._round == 1 ? 0 : 1;
      this._field.remoteMoveFigure(move);
      this.checkWin();
    }
  }
}

export { Game };
