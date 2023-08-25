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

  possibleMoves(field) {
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

    return result;
  }

  move(position) {
    this._position = position;
  }
}

export { King };
