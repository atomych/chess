class King {
  constructor(settings) {
    this._startPosition = settings.position;
    this._position = settings.position;
    this._color = settings.color;
    this._type = 6;
  }

  get position() {
    return this._position;
  }

  get color() {
    return this._color;
  }

  get type() {
    return this._type;
  }

  possibleMoves(field, check) {
    const result = [];
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let indexL = letters.indexOf(this._position[0]) + 1;
    let indexN = parseInt(this._position[1]);

    if (indexL + 1 < 9) {
      const cell = `${letters[indexL + 1 - 1]}${indexN}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexL - 1 > 0) {
      const cell = `${letters[indexL - 1 - 1]}${indexN}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexN + 1 < 9) {
      const cell = `${letters[indexL - 1]}${indexN + 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexN - 1 > 0) {
      const cell = `${letters[indexL - 1]}${indexN - 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexL + 1 < 9 && indexN + 1 < 9) {
      const cell = `${letters[indexL + 1 - 1]}${indexN + 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexL - 1 > 0 && indexN - 1 > 0) {
      const cell = `${letters[indexL - 1 - 1]}${indexN - 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexN + 1 < 9 && indexL - 1 > 0) {
      const cell = `${letters[indexL - 1 - 1]}${indexN + 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (indexN - 1 > 0 && indexL + 1 > 0) {
      const cell = `${letters[indexL + 1 - 1]}${indexN - 1}`;
      const figure = field.getCell(cell).figure;
      if (figure.color != this._color) result.push(cell);
    }

    if (this._position == this._startPosition && check == false) {
      if (this._color == 1) {
        const rook1 = field.getCell("a1");
        if (rook1.figure?.type == 4 && rook1.figure?.color == 1) {
          if (rook1.figure.position == rook1.figure._startPosition) {
            if (
              field.getCell("b1").figure.type === undefined &&
              field.getCell("c1").figure.type === undefined &&
              field.getCell("d1").figure.type === undefined
            ) {
              result.push("c1");
            }
          }
        }

        const rook2 = field.getCell("h1");
        if (rook2.figure?.type == 4 && rook2.figure?.color == 1) {
          if (rook2.figure.position == rook2.figure._startPosition) {
            if (
              field.getCell("g1").figure.type === undefined &&
              field.getCell("f1").figure.type === undefined
            ) {
              result.push("g1");
            }
          }
        }
      } else {
        const rook1 = field.getCell("a8");
        if (rook1.figure?.type == 4 && rook1.figure?.color == 0) {
          if (rook1.figure.position == rook1.figure._startPosition) {
            if (
              field.getCell("b8").figure.type === undefined &&
              field.getCell("c8").figure.type === undefined &&
              field.getCell("d8").figure.type === undefined
            ) {
              result.push("c8");
            }
          }
        }

        const rook2 = field.getCell("h8");
        if (rook2.figure?.type == 4 && rook2.figure?.color == 0) {
          if (rook2.figure.position == rook2.figure._startPosition) {
            if (
              field.getCell("g8").figure.type === undefined &&
              field.getCell("f8").figure.type === undefined
            ) {
              result.push("g8");
            }
          }
        }
      }
    }

    return result;
  }

  move(position) {
    this._position = position;
  }
}

export { King };
