import React from "react";
import { MainGame } from "./components/Game/MainGame";
import { setupGame } from "./helpers/setup";
import { Config } from "./helpers/types";

const App: React.FC = () => {
  const exampleConfig: Config = {
    rows: 6,
    cols: 6,
    rowConstraints: [3, 0, 2, 1, 1, 1],
    colConstraints: [1, 2, 1, 2, 0, 2],
    treeLocations: [
      { row: 0, col: 3 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 5 },
      { row: 2, col: 2 },
      { row: 4, col: 1 },
      { row: 4, col: 4 },
      { row: 4, col: 5 }
    ]
  };

  const stephsConfig: Config = {
    rows: 7,
    cols: 7,
    rowConstraints: [1, 1, 2, 1, 1, 1, 2],
    colConstraints: [1, 1, 1, 2, 1, 0, 3],
    treeLocations: [
      { row: 1, col: 4 },
      { row: 1, col: 6 },
      { row: 2, col: 0 },
      { row: 2, col: 3 },
      { row: 2, col: 5 },
      { row: 4, col: 0 },
      { row: 5, col: 2 },
      { row: 5, col: 6 },
      { row: 6, col: 5 }
    ]
  };

  const gameProps = setupGame(stephsConfig);

  return <MainGame {...gameProps} />;
};

export default App;
