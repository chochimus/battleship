export class Gameboard {
  constructor() {
    this.size = 10;
    this.board = Array(this.size)
      .fill(null)
      .map(() => Array(this.size).fill(null));
  }
  place(ship, x, y, horizontal = true) {
    if (
      (horizontal && x + ship.length > this.size) ||
      (!horizontal && y + ship.length > this.size)
    ) {
      throw new RangeError();
    }

    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        if (this.board[y][x + i] !== null) {
          throw new Error("Coordinates already occupied");
        }
      } else {
        if (this.board[y + i][x] !== null) {
          throw new Error("Coordinates already occupied");
        }
      }
    }

    for (let i = 0; i < ship.length; i++) {
      if (horizontal) {
        this.board[y][x + i] = ship;
      } else {
        this.board[y + i][x] = ship;
      }
    }

    return ship;
  }
  receiveAttack(x, y) {
    const target = this.board[y][x];
    if (target === "miss" || target === "hit") {
      throw new Error("coordinate has already been attacked");
    } else if (target === null) {
      this.board[y][x] = "miss";
      return "miss!";
    } else {
      target.hit();
      this.board[y][x] = "hit";
      return target.isSunk() ? "sunk!" : "hit!";
    }
  }
}
