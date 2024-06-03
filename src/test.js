import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

describe("Ship class", () => {
  it("should create a ship with a length property", () => {
    const ship = new Ship(5);
    expect(ship.length).toBe(5);
  });

  it("should have a timesHit property initialized to 0", () => {
    const ship = new Ship(5);
    expect(ship.timesHit).toBe(0);
  });

  it("should increment timesHit when hit method is called", () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.timesHit).toBe(1);
    ship.hit();
    expect(ship.timesHit).toBe(2);
  });

  it("should return false for isSunk if timesHit is less than length", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it("should return true for isSunk if timesHit is equal to or greater than length", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard", () => {
  it("should return a gameboard object", () => {
    expect(new Gameboard()).toBeInstanceOf(Gameboard);
  });

  it("should accept ship placement", () => {
    const board = new Gameboard();
    const cruiser = new Ship(3);
    board.place(cruiser, 0, 0);
    expect(board.board[0][0]).toBe(cruiser);
    expect(board.board[0][1]).toBe(cruiser);
    expect(board.board[0][2]).toBe(cruiser);
  });

  it("shouldn't allow placement into occupied spaces", () => {
    const board = new Gameboard();
    const cruiser = new Ship(3);
    board.place(cruiser, 0, 0);
    const ship = new Ship(2);
    expect(() => board.place(ship, 0, 0)).toThrow(
      new Error("Coordinates already occupied"),
    );
  });

  describe("Receive attack function", () => {
    const board = new Gameboard();
    const cruiser = new Ship(3);
    board.place(cruiser, 0, 0);
    it("should accept attacks on ships", () => {
      expect(board.receiveAttack(0, 0)).toBe("hit!");
    });

    it("should sink a ship if the hits = length", () => {
      expect(board.receiveAttack(1, 0)).toBe("hit!");
      expect(board.receiveAttack(2, 0)).toBe("sunk!");
    });

    it("shouldn't allow a sunken ship to be hit", () => {
      expect(() => board.receiveAttack(0, 0)).toThrow(
        new Error("coordinate has already been attacked"),
      );
    });

    it("should be able to receive misses, and record their coord", () => {
      expect(board.receiveAttack(4, 4)).toBe("miss!");
      expect(board.board[4][4]).toBe("miss");
    });
  });
});
