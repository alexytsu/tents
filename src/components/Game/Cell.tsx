/** @jsx jsx */
import { jsx } from "@emotion/core";
import { CellProps } from "../../helpers/types";
import { GRID_SIZE } from "./constants";

import Tent from "../../images/tent.png";
import Tree from "../../images/tree.png";

export const Cell = (props: CellProps) => {
  const { contains } = props;

  return (
    <div
      css={{
        width: GRID_SIZE,
        height: GRID_SIZE
      }}
    >
      {contains === "tent" && (
        <img
          width={GRID_SIZE - 4}
          height={GRID_SIZE - 4}
          src={Tent}
          alt="Tent"
        />
      )}
      {contains === "tree" && (
        <img
          width={GRID_SIZE - 4}
          height={GRID_SIZE - 4}
          src={Tree}
          alt="Tent"
        />
      )}
    </div>
  );
};
