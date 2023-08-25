import { Cell } from "./Cell";

class Field {
  constructor(settings) {
    this._field = [];
    this._side = settings.side;

    let startColor = 0;
    let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let id = "";
        if (this._side == 1) id = `${letters[j]}${8 - i}`;
        if (this._side == 0) id = `${letters[7 - j]}${i + 1}`;

        this._field.push(
          new Cell({
            color: settings.colors[startColor],
            id: id,
            figureType: 0,
            figureColor: 0,
          })
        );

        if (j < 7) startColor = startColor == 0 ? 1 : 0;
      }
    }
  }

  get field() {
    return this._field;
  }

  setFigure(position, figure) {
    this.getCell(position).setFigure(figure);
  }

  getCell(position) {
    return this._field.filter((cell) => cell.id == position)[0];
  }

  moveFigure(cellID, newPosition) {
    this.getCell(cellID).figure.move(newPosition);

    const temp = this.getCell(cellID).figure;
    this.getCell(cellID).setFigure({});
    this.getCell(newPosition).setFigure(temp);
  }

  remoteMoveFigure(move) {
    console.log(move);
    console.log(this.getCell(move[0] + move[1]));
    this.getCell(move[0] + move[1]).figure.move(move[2] + move[3]);
    const temp = this.getCell(move[0] + move[1]).figure;
    this.getCell(move[0] + move[1]).setFigure({});
    this.getCell(move[2] + move[3]).setFigure(temp);
  }
}

export { Field };
