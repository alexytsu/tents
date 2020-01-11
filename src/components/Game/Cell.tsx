/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { CellProps } from "../../helpers/types";
import { GRID_SIZE } from "./constants";
export const Cell = (props: CellProps) => {
  const { contains } = props;

  const backgroundColor =
    contains === "tent" ? "red" : contains === "tree" ? "green" : "black";

  return (
    <div
      css={{
        width: GRID_SIZE,
        height: GRID_SIZE,
        backgroundColor
      }}
    ></div>
  );
};
