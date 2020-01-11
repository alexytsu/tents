import { GameBoard, GameGrid } from "../../helpers/types";
import { cloneDeep } from "lodash";
import { clone } from "@babel/types";

export const greedyPopulate = (gameBoard: GameBoard): GameBoard => {
  const newBoard = cloneDeep(gameBoard);

  const { rowConstraints, colConstraints, grid } = newBoard;

  rowConstraints.forEach((n, rowIdx) => {
    const colLimits = colConstraints
      .map((val, idx) => {
        return {
          val,
          idx
        };
      })
      .sort((a, b) => {
        return b.val - a.val;
      });

    for (let i = 0; i < n; i++) {
      if (i >= colLimits.length) {
        break;
      }
      const colIdx = colLimits[i].idx;
      if (grid[rowIdx][colIdx] === null) {
        grid[rowIdx][colIdx] = "tent";
        colConstraints[colIdx]--;
      } else {
        n++;
      }
    }
  });

  return { ...gameBoard, grid: newBoard.grid };
};

export const getNeighbours = (
  grid: GameGrid,
  row: number,
  col: number
): number => {
  console.log("========");
  let count = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      try {
        console.log(grid[row][col]);
        if (grid[row + i][col + j] === "tent") {
          count++;
        }
      } catch (e) {}
    }
  }
  console.log("========");

  return count;
};

interface Coordinate {
  row: number;
  col: number;
}

interface EvaluatedGrid {
  grid: GameGrid;
  loss: number;
  neighbourLoss: number;
  constraintLoss: number;
}

interface TotalLoss {
  loss: number;
  constraintLoss: number;
  neighbourLoss: number;
}

export const getNextIterGrids = (grid: GameGrid): GameGrid[] => {
  const originalGrid = cloneDeep(grid);

  const tentCells: Coordinate[] = [];
  const emptyCells: Coordinate[] = [];

  // find all the empty spaces and spaces with tents
  originalGrid.forEach((row, rowIdx) => {
    row.forEach((item, colIdx) => {
      const coord = { row: rowIdx, col: colIdx };
      if (item === "tent") {
        tentCells.push(coord);
      } else if (item === null) {
        emptyCells.push(coord);
      }
    });
  });

  const newGrids: GameGrid[] = [];

  emptyCells.map(emptyCell => {
    tentCells.map(tentCell => {
      const newGrid = cloneDeep(originalGrid);
      newGrid[emptyCell.row][emptyCell.col] = "tent";
      newGrid[tentCell.row][tentCell.col] = null;
      newGrids.push(newGrid);
    });
  });

  return newGrids;
};

const evaluateLoss = (
  evalGrid: GameGrid,
  colConstraints: number[],
  rowConstraints: number[]
): TotalLoss => {
  const cloneColConstraints = cloneDeep(colConstraints);
  const cloneRowConstraints = cloneDeep(rowConstraints);

  let lossFromConstraints = 0;
  let lossFromNeighbours = 0;

  const rows = rowConstraints.length;
  const cols = colConstraints.length;
  const neighbourLoss = rows * cols;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (evalGrid[i][j] === "tent") {
        cloneRowConstraints[i]--;
        cloneColConstraints[j]--;
      }
    }
  }

  lossFromConstraints += cloneRowConstraints.reduce(
    (previous, current) => previous + Math.abs(current),
    0
  );

  lossFromConstraints += cloneColConstraints.reduce(
    (previous, current) => previous + Math.abs(current),
    0
  );

  evalGrid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === "tent") {
        const nNeighbours = getNeighbours(evalGrid, rowIdx, colIdx);
        lossFromNeighbours += neighbourLoss * nNeighbours;
      }
    });
  });

  return {
    loss: lossFromConstraints + lossFromNeighbours,
    neighbourLoss: lossFromNeighbours,
    constraintLoss: lossFromConstraints
  };
};

export const fixMostEgregiousTent = (gameBoard: GameBoard): GameBoard => {
  const newBoard = cloneDeep(gameBoard);

  const { rowConstraints, colConstraints, grid } = newBoard;

  const nextIterGrids = getNextIterGrids(grid);

  const nextIterGridsEvaluated: EvaluatedGrid[] = nextIterGrids
    .map(potentialGrid => {
      const losses = evaluateLoss(
        potentialGrid,
        colConstraints,
        rowConstraints
      );

      return {
        grid: potentialGrid,
        loss: losses.loss,
        neighbourLoss: losses.neighbourLoss,
        constraintLoss: losses.constraintLoss
      };
    })
    .sort((a, b) => a.loss - b.loss);

  const bestNextGrid = nextIterGridsEvaluated[0];
  console.log(
    bestNextGrid.loss,
    bestNextGrid.neighbourLoss,
    bestNextGrid.constraintLoss
  );

  return { ...gameBoard, grid: nextIterGridsEvaluated[1].grid };
};
