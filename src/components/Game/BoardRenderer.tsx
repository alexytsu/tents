/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { CellProps, GameBoard, Item } from "../../helpers/types";
import { Cell } from "./Cell";
import { GRID_SIZE } from "./constants";

export const BoardRenderer = (props: GameBoard) => {
  const { grid, rowConstraints, colConstraints } = props;

  const rows = grid.map((row, index) => {
    return (
      <div css={{ display: "flex" }}>
        {row.map(item => (
          <Cell contains={item} />
        ))}
      </div>
    );
  });

  const tentsRequiredPerRow = rowConstraints.map((n, i) => {
    return (
      <div
        css={{
          color: "blue",
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
    return (
      <div
        css={{
          color: "red",
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
    </div>
  );
};
