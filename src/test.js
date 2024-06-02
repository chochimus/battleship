import { Ship } from "./ship";

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
