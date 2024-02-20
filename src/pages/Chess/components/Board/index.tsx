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
import PawnService from "../../service/pawn";
import ChessBoardSerivce from "../../service/chess_board";
import RookService from "../../service/rook";
import { IKingPosition } from "../../interface/base";
import KingService from "../../service/king";

function Board() {
  const { history, handleSetHistory }: any = useHistory();

  const [chessBoard, setChessBoard] = useState<string[][]>([[]]);
  const [turn, setTurn] = useState<string>(WHITE_TURN);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedChessPiece, setSelectedChessPiece] = useState(EMPTY_SELECTED);
  const [selectedPosition, setSelectedPosition] = useState([-1, -1]);
  const [isPromotion, setIsPromotion] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [kingPosition, setKingPosition] = useState<IKingPosition>({
    w: [7, 4],
    b: [0, 4],
  });

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
      handleTake: getFunctionOfChessPiece(item[1])?.handleTake,
      handleMove: getFunctionOfChessPiece(item[1])?.handleMove,
      handlePromotion: getFunctionOfChessPiece(item[1])?.handlePromotion,
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
          handleMove: handlePawnMove,
          handleTake: handlePawnTake,
          handlePromotion: handlePromotion,
        };
      case "r":
        return {
          handleMove: handleRookMove,
          handleTake: handleRookTake,
        };
      case "k":
        return {
          handleMove: handleKingMove,
          handleTake: handleKingTake,
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
      !ChessBoardSerivce.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }
    PawnService.onMove({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      history,
      isPromotion,
      kingPosition,
      isChecking,
      setIsChecking,
      setChessBoard,
      setIsDirty,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setIsPromotion,
    });
  };

  const handlePawnTake = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !ChessBoardSerivce.hanleValidationMove(turn, item, setSelectedChessPiece)
    )
      return;
    PawnService.onTake({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      isPromotion,
      kingPosition,
      isChecking,
      setIsChecking,
      setChessBoard,
      setIsDirty,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setIsPromotion,
    });
  };

  const handlePromotion = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    PawnService.onPromotion({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      kingPosition,
      isChecking,
      setIsChecking,
      setChessBoard,
      setIsDirty,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
    });
  };
  //#endregion

  //#region Logic của Xe
  const handleRookMove = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !ChessBoardSerivce.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }
    RookService.onMove({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      history,
      kingPosition,
      isChecking,
      setIsChecking,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
    });
  };

  const handleRookTake = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !ChessBoardSerivce.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }
    RookService.onTake({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      kingPosition,
      history,
      isChecking,
      setIsChecking,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
    });
  };
  //#endregion

  //#region Logic của vua
  const handleKingMove = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !ChessBoardSerivce.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }
    KingService.onMove({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      history,
      kingPosition,
      isChecking,
      setIsChecking,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setKingPosition,
    });
  };
  const handleKingTake = (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => {
    if (
      !ChessBoardSerivce.hanleValidationMove(
        turn,
        item,
        setSelectedChessPiece,
        isDirty
      )
    ) {
      return;
    }
    KingService.onTake({
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      kingPosition,
      history,
      isChecking,
      setIsChecking,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setKingPosition,
    });
  };
  //#endregion
  useEffect(() => {
    initMatrix();
  }, []);

  return (
    <CenterContainer>
      {chessBoard.length &&
        chessBoard.map((itemRow, idxRow) => (
          <div className="flex" key={idxRow}>
            {itemRow.map((itemCol: string, idxCol) => (
              <Square
                key={idxCol}
                id={(idxRow + idxCol).toString()}
                position={[idxRow, idxCol]}
                turn={turn}
                item={itemCol}
                history={history}
                isPromotion={isPromotion}
                selectedPosition={selectedPosition}
                setSelectedPosition={setSelectedPosition}
                setIsPromotion={setIsPromotion}
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
