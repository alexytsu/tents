export type Item = "tree" | "tent" | null;

export interface CellProps {
  contains: Item;
}

export type Coordinate = {
  row: number;
  col: number;
};

export interface Config {
  rowConstraints: number[];
  colConstraints: number[];
  rows: number;
  cols: number;
  treeLocations: Coordinate[];
}

export type GameGrid = Item[][];

export interface GameBoard {
  grid: GameGrid;
  rowConstraints: number[];
  colConstraints: number[];
}

export interface GameProps {
  board: GameBoard;
  completed?: boolean;
  iteration: number;
}
