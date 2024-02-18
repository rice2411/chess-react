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
import { PAWN_RULE } from "../../utils/pawn_rule";
import { CHESS_RULE } from "../../utils/chess_rule";

function Board() {
  const { history, handleSetHistory }: any = useHistory();

  const [chessBoard, setChessBoard] = useState<string[][]>([[]]);
  const [turn, setTurn] = useState(WHITE_TURN);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedChessPiece, setSelectedChessPiece] = useState(EMPTY_SELECTED);

  // Ma trận ô cờ 8x8
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
  //Click vào 1 ô
  const handleClickSquare = (position: number[], item: string) => {
    //Click vào ô trống thì không quan tâm
    if (!item) {
      setSelectedChessPiece(EMPTY_SELECTED);
      return;
    }
    //Lưu vị trí và quân cờ dc chọn
    const selectedSquare = {
      position,
      item,
      handleTake: getFunctionOfChessPiece(item[1])?.handlePawnTake,
      handleMove: getFunctionOfChessPiece(item[1])?.handlePawnMove,
    };
    setSelectedChessPiece(selectedSquare);
  };
  // Đổi lượtt
  const handleToggleTurn = (item: string) => {
    const turn = item[0] === WHITE_TURN ? BLACK_TURN : WHITE_TURN;
    setTurn(turn);
  };
  // Gánlogic tương ứng cho quân cờ
  const getFunctionOfChessPiece = (type: string) => {
    switch (type) {
      case "p":
        return {
          handlePawnMove,
          handlePawnTake,
        };
    }
  };
  //#region Logic của Tốt
  const handlePawnMove = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !CHESS_RULE.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }

    PAWN_RULE.onPawnMove({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      history,
      setChessBoard,
      setIsDirty,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
    });
  };

  const handlePawnTake = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (!CHESS_RULE.hanleValidationMove(turn, item, setSelectedChessPiece))
      return;
    PAWN_RULE.onPawnTake({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      setChessBoard,
      setIsDirty,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
    });
  };
  //#endregion

  useEffect(() => {
    initMatrix();
  }, []);

  return (
    <CenterContainer>
      {chessBoard[0][0] !== "" &&
        chessBoard.map((itemRow, idxRow) => (
          <div className="flex" key={idxRow}>
            {itemRow.map((itemCol: string, idxCol) => (
              <Square
                key={idxCol}
                id={(idxRow + idxCol).toString()}
                position={[idxRow, idxCol]}
                item={itemCol}
                history={history}
                selectedChessPiece={selectedChessPiece}
                handleClickSquare={handleClickSquare}
              ></Square>
            ))}
          </div>
        ))}
    </CenterContainer>
  );
}

export default Board;
