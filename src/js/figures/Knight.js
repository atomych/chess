class Knight {
  constructor(settings) {
    this._startPosition = settings.position;
    this._position = settings.position;
    this._color = settings.color;
    this._type = 2;
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
    const possible = [];
    let indexL = letters.indexOf(this._position[0]) + 1;
    let indexN = parseInt(this._position[1]);

    if (indexL + 2 < 9 && indexN + 1 < 9)
      possible.push(`${letters[indexL + 2 - 1]}${indexN + 1}`);
    if (indexL + 2 < 9 && indexN - 1 > 0)
      possible.push(`${letters[indexL + 2 - 1]}${indexN - 1}`);
    if (indexL - 2 > 0 && indexN + 1 < 9)
      possible.push(`${letters[indexL - 2 - 1]}${indexN + 1}`);
    if (indexL - 2 > 0 && indexN - 1 > 0)
      possible.push(`${letters[indexL - 2 - 1]}${indexN - 1}`);
    if (indexN + 2 < 9 && indexL + 1 < 9)
      possible.push(`${letters[indexL + 1 - 1]}${indexN + 2}`);
    if (indexN + 2 < 9 && indexL - 1 > 0)
      possible.push(`${letters[indexL - 1 - 1]}${indexN + 2}`);
    if (indexN - 2 > 0 && indexL + 1 < 9)
      possible.push(`${letters[indexL + 1 - 1]}${indexN - 2}`);
    if (indexN - 2 > 0 && indexL - 1 > 0)
      possible.push(`${letters[indexL - 1 - 1]}${indexN - 2}`);

    for (let cell of possible) {
      if (field.getCell(cell).figure.color != this._color) result.push(cell);
    }

    return result;
  }

  move(position) {
    this._position = position;
  }
}

export { Knight };
