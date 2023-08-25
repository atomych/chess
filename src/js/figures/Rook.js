class Rook {
  constructor(settings) {
    this._startPosition = settings.position;
    this._position = settings.position;
    this._color = settings.color;
    this._type = 4;
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

  possibleMoves(field) {
    const result = [];
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let indexL = letters.indexOf(this._position[0]) + 1;
    let indexN = parseInt(this._position[1]);

    for (let i = 1; i < 8; i++) {
      if (indexL + i < 9) {
        const cell = `${letters[indexL + i - 1]}${indexN}`;
        const figure = field.getCell(cell).figure;
        if (figure.type) {
          if (figure.color == this._color) break;
          else {
            result.push(cell);
            break;
          }
        } else {
          result.push(cell);
        }
      }
    }

    for (let i = 1; i < 8; i++) {
      if (indexL - i > 0) {
        const cell = `${letters[indexL - i - 1]}${indexN}`;
        const figure = field.getCell(cell).figure;
        if (figure.type) {
          if (figure.color == this._color) break;
          else {
            result.push(cell);
            break;
          }
        } else {
          result.push(cell);
        }
      }
    }

    for (let i = 1; i < 8; i++) {
      if (indexN - i > 0) {
        const cell = `${letters[indexL - 1]}${indexN - i}`;
        const figure = field.getCell(cell).figure;
        if (figure.type) {
          if (figure.color == this._color) break;
          else {
            result.push(cell);
            break;
          }
        } else {
          result.push(cell);
        }
      }
    }

    for (let i = 1; i < 8; i++) {
      if (indexN + i < 9) {
        const cell = `${letters[indexL - 1]}${indexN + i}`;
        const figure = field.getCell(cell).figure;
        if (figure.type) {
          if (figure.color == this._color) break;
          else {
            result.push(cell);
            break;
          }
        } else {
          result.push(cell);
        }
      }
    }

    return result;
  }

  move(position) {
    this._position = position;
  }
}

export { Rook };
