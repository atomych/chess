class Cell {
  constructor(settings) {
    this._color = settings.color;
    this._id = settings.id;
    this._figure = {};
  }

  setFigure(figure) {
    this._figure = figure;
  }

  get id() {
    return this._id;
  }

  get color() {
    return this._color;
  }

  get figure() {
    return this._figure;
  }
}

export { Cell };
