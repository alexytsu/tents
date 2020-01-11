/** @jsx jsx */
import { jsx } from "@emotion/core";
import { GameBoard } from "../../helpers/types";
import { Cell } from "./Cell";
import { GRID_SIZE } from "./constants";
import { cloneDeep } from "lodash";
import { getNeighbours } from "./solvers";

export const BoardRenderer = (props: GameBoard) => {
  const { grid, rowConstraints, colConstraints } = props;

  const cloneColConstraints = cloneDeep(colConstraints);
  const cloneRowConstraints = cloneDeep(rowConstraints);

  const nRows = rowConstraints.length;
  const nCols = colConstraints.length;

  for (let i = 0; i < nRows; i++) {
    for (let j = 0; j < nCols; j++) {
      if (grid[i][j] === "tent") {
        cloneRowConstraints[i]--;
        cloneColConstraints[j]--;
      }
    }
  }

  const violatedRows = cloneRowConstraints.map((val, idx) => {
    if (val !== 0) {
      return idx;
    }
  });

  const violatedCols = cloneColConstraints.map((val, idx) => {
    if (val !== 0) {
      return idx;
    }
  });

  const rows = grid.map((row, index) => {
    return (
      <div css={{ display: "flex" }}>
        {row.map(item => (
          <Cell contains={item} />
        ))}
      </div>
    );
  });

  const errorBorders: JSX.Element[] = [];

  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === "tent") {
        const nNeighbours = getNeighbours(grid, rowIdx, colIdx);
        if (nNeighbours !== 0) {
          errorBorders.push(
            <div
              css={{
                width: GRID_SIZE - 4,
                height: GRID_SIZE - 4,
                position: "absolute",
                borderWidth: 2,
                borderRadius: 3,
                borderColor: "red",
                borderStyle: "solid",
                top: rowIdx * GRID_SIZE,
                left: colIdx * GRID_SIZE
              }}
            ></div>
          );
        }
      }
    });
  });

  const tentsRequiredPerRow = rowConstraints.map((n, i) => {
    const error = violatedRows.find(num => num === i) !== undefined;
    return (
      <div
        css={{
          color: error ? "red" : "green",
          fontWeight: error ? 800 : 400,
          position: "absolute",
          top: GRID_SIZE * i + GRID_SIZE / 2,
          left: GRID_SIZE * colConstraints.length + GRID_SIZE / 2
        }}
      >
        {n}
      </div>
    );
  });

  const tentsRequiredPerColumn = colConstraints.map((n, i) => {
    const error = violatedCols.find(num => num === i) !== undefined;
    return (
      <div
        css={{
          color: error ? "red" : "green",
          fontWeight: error ? 800 : 400,
          position: "absolute",
          left: GRID_SIZE * i + GRID_SIZE / 2,
          top: GRID_SIZE * colConstraints.length + GRID_SIZE / 2
        }}
      >
        {n}
      </div>
    );
  });

  return (
    <div css={{ position: "relative" }}>
      <div
        css={{
          borderWidth: 3,
          borderColor: "blue",
          borderStyle: "solid",
          display: "inline-block"
        }}
      >
        {rows}
      </div>
      {tentsRequiredPerRow}
      {tentsRequiredPerColumn}
      {errorBorders}
    </div>
  );
};
