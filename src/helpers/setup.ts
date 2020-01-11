import { Coordinate, GameBoard, Config, Item, GameProps } from "./types";

/**
 * takes the initial tree locations and tent requirements and returns a valid GameBoard
 * @param treeLocations
 * @param rowConstraints
 * @param colConstraints
 */
export const setupBoard = (config: Config): GameBoard => {
  const { rowConstraints, colConstraints, rows, cols, treeLocations } = config;

  const grid: Item[][] = [];
  for (let i = 0; i < rows; i++) {
    grid.push(new Array<Item>(cols).fill(null));
  }

  treeLocations.forEach(loc => (grid[loc.row][loc.col] = "tree"));

  return {
    rowConstraints,
    colConstraints,
    grid
  };
};

export const setupGame = (config: Config): GameProps => {
  const board = setupBoard(config);

  return {
    board,
    completed: false,
    iteration: 0
  };
};
