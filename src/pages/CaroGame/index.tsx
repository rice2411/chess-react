import { useEffect, useState } from "react";
import { COL, PLAYER_ONE, PLAYER_TWO, ROW } from "./constant/rule";
import NewGame from "./components/NewGame";
import Square from "./components/Square";
import CenterContainer from "../../Components/CenterContainer";

function CaroGame() {
  const [board, setBoard] = useState<string[][]>([]);
  const [turn, setTurn] = useState(PLAYER_ONE);
  const [winner, setWinner] = useState("");
  const [isNewGame, setIsNewGame] = useState(false);

  const handleChange = (id: [number, number]) => {
    const currentTurn = turn;
    setTurn(currentTurn === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE);
    const newBoard = [...board];
    newBoard[id[0]][id[1]] = turn;
    setBoard(newBoard);
    onValidationGame(id);
  };

  const initMatrix = () => {
    let matrix: string[][] = [];
    for (let i = 0; i < ROW; i++) {
      let row = [];
      for (let j = 0; j < COL; j++) {
        row.push("");
      }
      matrix.push(row);
    }
    setBoard(matrix);
  };

  const onHandleNewGame = () => {
    setIsNewGame((prevState) => !prevState);
  };

  const onValidationGame = (id: [number, number]) => {
    //find winner
    const player = turn;
    // ROW CHECk
    const postionRow = board[id[0]];
    const indexRow = id[1];
    if (
      (postionRow[indexRow] === player &&
        postionRow[indexRow - 1] === player &&
        postionRow[indexRow - 2] === player &&
        postionRow[indexRow - 3] === player &&
        postionRow[indexRow - 4] === player) ||
      (postionRow[indexRow] === player &&
        postionRow[indexRow + 1] === player &&
        postionRow[indexRow + 2] === player &&
        postionRow[indexRow + 3] === player &&
        postionRow[indexRow + 4] === player)
    ) {
      setWinner(player);
    }
    //COL CHECK
    const indexCol = id[0];
    if (
      (board[indexCol][id[1]] === player &&
        board[indexCol + 1][id[1]] === player &&
        board[indexCol + 2][id[1]] === player &&
        board[indexCol + 3][id[1]] === player &&
        board[indexCol + 4][id[1]] === player) ||
      (board[indexCol][id[1]] === player &&
        board[indexCol - 1][id[1]] === player &&
        board[indexCol - 2][id[1]] === player &&
        board[indexCol - 3][id[1]] === player &&
        board[indexCol - 4][id[1]] === player)
    ) {
      setWinner(player);
    }
    // DIAGONAL CHECK
    if (
      (board[id[0]][id[1]] === player &&
        board[id[0] + 1][id[1] + 1] === player &&
        board[id[0] + 2][id[1] + 2] === player &&
        board[id[0] + 3][id[1] + 3] === player &&
        board[id[0] + 4][id[1] + 4] === player) ||
      (board[id[0]][id[1]] === player &&
        board[id[0] - 1][id[1] - 1] === player &&
        board[id[0] - 2][id[1] - 2] === player &&
        board[id[0] - 3][id[1] - 3] === player &&
        board[id[0] - 4][id[1] - 4] === player)
    ) {
      setWinner(player);
    }
  };

  useEffect(() => {
    initMatrix();
    setWinner("");
    setTurn(PLAYER_ONE);
  }, [isNewGame]);

  return (
    <CenterContainer>
      <NewGame onClick={onHandleNewGame} />
      <p className="text-red-500 font-bold">
        {winner && `Player ${winner} win`}
      </p>
      {Array.from({ length: ROW }).map((i, idxRow) => (
        <div className="flex" key={idxRow}>
          {Array.from({ length: COL }).map((i, idxCol) => (
            <Square
              id={[idxRow, idxCol]}
              key={idxCol}
              winner={winner}
              turn={turn}
              isNewGame={isNewGame}
              handleChange={handleChange}
            ></Square>
          ))}
        </div>
      ))}
    </CenterContainer>
  );
}

export default CaroGame;
