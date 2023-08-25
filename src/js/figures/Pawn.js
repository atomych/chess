class Pawn {
  constructor(settings) {
    this._startPosition = settings.position;
    this._position = settings.position;
    this._color = settings.color;
    this._type = 1;
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

    let cell;
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

    if (parseInt(this.position[1]) == 1 || parseInt(this.position[1]) == 8)
      return [];

    if (this._startPosition[1] == "2")
      cell = `${this._position[0]}${parseInt(this._position[1]) + 1}`;
    else cell = `${this._position[0]}${parseInt(this._position[1]) - 1}`;

    if (!field.getCell(cell).figure.type) result.push(cell);

    if (this._startPosition == this._position && result.length) {
      if (this._startPosition[1] == "2")
        cell = `${this._position[0]}${parseInt(this._position[1]) + 2}`;
      else cell = `${this._position[0]}${parseInt(this._position[1]) - 2}`;

      if (!field.getCell(cell).figure.type) result.push(cell);
    }

    const possible = [];
    let index = letters.indexOf(this._position[0]);

    if (index > 0) {
      possible.push(
        `${letters[index - 1]}${
          this._startPosition[1] == "2"
            ? parseInt(this._position[1]) + 1
            : parseInt(this._position[1]) - 1
        }`
      );
    }
    if (index < 7) {
      possible.push(
        `${letters[index + 1]}${
          this._startPosition[1] == "2"
            ? parseInt(this._position[1]) + 1
            : parseInt(this._position[1]) - 1
        }`
      );
    }

    for (let cell of possible) {
      if (
        field.getCell(cell).figure.type &&
        field.getCell(cell).figure.color != this._color
      )
        result.push(cell);
    }

    return result;
  }

  move(position) {
    this._position = position;
  }
}

export { Pawn };
