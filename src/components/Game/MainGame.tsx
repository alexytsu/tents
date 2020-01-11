/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import Button from "@atlaskit/button";

import { GameProps } from "../../helpers/types";
import { BoardRenderer } from "./BoardRenderer";
import { greedyPopulate, fixMostEgregiousTent } from "./solvers";

export const MainGame = (props: GameProps) => {
  const { board } = props;

  const [currentBoard, setCurrentBoard] = useState(board);
  const [editing, setEditing] = useState(false);

  const [cleanSlate, setCleanSlate] = useState(true);

  const Header = (
    <Fragment>
      <Button
        appearance={cleanSlate ? "primary" : "default"}
        onClick={() => {
          if (cleanSlate) {
            setCurrentBoard(greedyPopulate(board));
            setCleanSlate(false);
          } else {
            setCurrentBoard(fixMostEgregiousTent(currentBoard));
          }
        }}
      >
        Tick
      </Button>
      <Button
        appearance="danger"
        onClick={() => {
          setCurrentBoard(board);
          setCleanSlate(true);
        }}
      >
        Reset
      </Button>
      <Button
        appearance="primary"
        onClick={() => {
          setEditing(!editing);
        }}
      >
        {editing ? "Save" : "Edit Puzzle Constraints"}
      </Button>
    </Fragment>
  );

  return (
    <Fragment>
      {Header}
      <div>
        <BoardRenderer {...currentBoard}></BoardRenderer>
      </div>
    </Fragment>
  );
};
