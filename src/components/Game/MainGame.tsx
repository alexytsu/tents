/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, Fragment } from "react";
import Button from "@atlaskit/button";

import { GameProps, GameGrid } from "../../helpers/types";
import { BoardRenderer } from "./BoardRenderer";
import { greedyPopulate, fixMostEgregiousTent, evaluateLoss } from "./solvers";

export const MainGame = (props: GameProps) => {
  const { board } = props;

  const [currentBoard, setCurrentBoard] = useState(board);
  const [previousGrids, setPreviousGrids] = useState([
    JSON.stringify(board.grid)
  ]);

  const [cleanSlate, setCleanSlate] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);

  if (!gameFinished) {
    console.log("Game not finished");
    const loss = evaluateLoss(
      currentBoard.grid,
      currentBoard.colConstraints,
      currentBoard.rowConstraints
    ).loss;

    console.log("total loss: ", loss);
    if (loss === 0) {
      setGameFinished(true);
    }
  }

  const Header = (
    <Fragment>
      <Button
        appearance="primary"
        onClick={() => {
          if (cleanSlate) {
            setCurrentBoard(greedyPopulate(board));
            setCleanSlate(false);
          } else {
            const newBoard = fixMostEgregiousTent(currentBoard, previousGrids);
            setCurrentBoard(newBoard);
            previousGrids.push(JSON.stringify(newBoard.grid));
            setPreviousGrids(previousGrids);
          }
        }}
        disabled={gameFinished}
        isDisabled={gameFinished}
      >
        Tick
      </Button>
      <Button
        appearance="danger"
        onClick={() => {
          setCurrentBoard(board);
          setCleanSlate(true);
          setGameFinished(false);
          setPreviousGrids([]);
        }}
      >
        Reset
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
