import { useEffect, useState } from "react";
import {
  BLACK_TURN,
  COL,
  EMPTY_SELECTED,
  ROW,
  WHITE_TURN,
} from "../../constant/config";
import CenterContainer from "../../../../Components/CenterContainer";
import Square from "../Square";
import { initChessPiece } from "../../utils";
import useHistory from "../../hooks/useHistory";
import { handleFisrtMove } from "../../utils/chess_rule";

function Board() {
  const { history, handleSetHistory }: any = useHistory();

  const [chessBoard, setChessBoard] = useState<string[][]>([[]]);
  const [turn, setTurn] = useState(WHITE_TURN === "w");
  const [isDirty, setIsDirty] = useState(false);
  const [selectedChessPiece, setSelectedChessPiece] = useState(EMPTY_SELECTED);

  const initMatrix = () => {
    let matrix: string[][] = [];
    for (let i = 0; i < ROW; i++) {
      let row: string[] = [];
      for (let j = 0; j < COL; j++) {
        initChessPiece(row, i, j);
      }
      matrix.push(row);
    }
    setChessBoard(matrix);
  };

  const handleClickSquare = (position: number[], item: string) => {
    if (!item) {
      setSelectedChessPiece(EMPTY_SELECTED);
      return;
    }
    const selectedSquare = { position, item };
    setSelectedChessPiece(selectedSquare);
  };

  const handlePawnMove = (nextPosition: number[], nextItem: string) => {
    const { item, position } = selectedChessPiece;
    //Kiểm tra khi vào game, quân đen không được đi trước
    if (handleFisrtMove(selectedChessPiece, isDirty)) {
      setSelectedChessPiece(EMPTY_SELECTED);
    }

    const site = item[0];
    switch (site) {
      case WHITE_TURN:
        let isValidMove = false;
        if (position[0] === 6) {
          isValidMove =
            position[0] - nextPosition[0] <= 2 &&
            position[0] - nextPosition[0] >= 1 &&
            nextPosition[1] === position[1];
        } else {
          isValidMove =
            position[0] - nextPosition[0] === 1 &&
            nextPosition[1] === position[1];
        }
        if (isValidMove) {
          const newChessBoard = chessBoard;
          newChessBoard[nextPosition[0]][nextPosition[1]] = item;
          newChessBoard[position[0]][position[1]] = "";
          setChessBoard(newChessBoard);
          setIsDirty(true);
          setTurn((prevState) => !prevState);
          handleSetHistory(position, item, nextPosition, nextItem);
        }
        break;
    }
  };

  useEffect(() => {
    initMatrix();
  }, []);
  return (
    <CenterContainer>
      {chessBoard.length > 2 &&
        chessBoard.map((itemRow, idxRow) => (
          <div className="flex" key={idxRow}>
            {itemRow.map((itemCol, idxCol) => (
              <Square
                key={idxCol}
                id={(idxRow + idxCol).toString()}
                position={[idxRow, idxCol]}
                item={itemCol}
                history={history}
                selectedChessPiece={selectedChessPiece}
                handleClickSquare={handleClickSquare}
                handlePawnMove={handlePawnMove}
              ></Square>
            ))}
          </div>
        ))}
    </CenterContainer>
  );
}

export default Board;
