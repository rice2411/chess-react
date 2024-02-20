import { BLACK_TURN, WHITE_TURN } from "../../constant/config";
import { ETypeMove } from "../../enum/type_move";
import { IKingInput } from "../../interface/base/king";
import { IRookInput } from "../../interface/base/rook";

import ChessBoardService, { InputDrawBoard } from "../chess_board";

class KingService {
  // Logic Xe di chuyển
  static onMove = (input: IKingInput) => {
    const {
      item,
      position,
      nextPosition,
      chessBoard,
      nextItem,
      kingPosition,
      isChecking,
      setChessBoard,
      handleToggleTurn,
      setKingPosition,
      handleSetHistory,
      setSelectedChessPiece,
      setIsChecking,
    } = input;
    // Check ô có trống không
    if (nextItem[0]) return;

    const isValidMove = this.onValidateMove(input);

    if (isValidMove) {
      const typeMove = ETypeMove.normal;
      ChessBoardService.handleDrawBoard({
        position,
        nextPosition,
        chessBoard,
        item,
        nextItem,
        typeMove,
        isChecking,
        kingPosition,
        setChessBoard,
        setIsChecking,
        handleToggleTurn,
        handleSetHistory,
        setSelectedChessPiece,
        setKingPosition,
      });
    }
  };

  // Logic Tốt Ăn Quân
  static onTake = (input: IKingInput) => {
    const {
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      isChecking,
      kingPosition,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setIsChecking,
    } = input;
    // Check ô có trống không
    if (!nextItem[0]) return;

    const isValidMove = this.onValidateMove(input);

    if (isValidMove) {
      const typeMove = ETypeMove.take;
      ChessBoardService.handleDrawBoard({
        position,
        nextPosition,
        chessBoard,
        item,
        nextItem,
        isChecking,
        typeMove,
        kingPosition,
        setIsChecking,
        setChessBoard,
        handleToggleTurn,
        handleSetHistory,
        setSelectedChessPiece,
      });
    }
  };

  static onValidateMove = (input: IRookInput) => {
    const { position, nextPosition } = input;

    // Quân vua đi thẳng . ngang chéo
    const rowMove = position[0] - nextPosition[0];
    const colMove = position[1] - nextPosition[1];

    const limitRowMove = Math.abs(rowMove);
    const limitColMove = Math.abs(colMove);

    // chỉ đi 1 ô
    if (
      limitRowMove > 1 ||
      limitColMove > 1 ||
      (limitRowMove !== 1 && limitColMove !== 1)
    ) {
      return false;
    }
    return true;
  };

  static onHandleChecking = (
    input: InputDrawBoard,
    newChessBoard: string[][]
  ) => {
    const { item, kingPosition, nextPosition } = input;
    const turn = item[0] === WHITE_TURN ? BLACK_TURN : WHITE_TURN;
    // @ts-ignore
    const _kingPositon = item[1] === "k" ? nextPosition : kingPosition[turn];
    console.log(kingPosition);
    const minPosition = 0;
    const maxPosition = 7;
    const kingRow = item[1] === "k" ? nextPosition[0] : _kingPositon[0];
    const kingCol = item[1] === "k" ? nextPosition[1] : _kingPositon[1];
    for (let i = kingCol; i <= maxPosition; i++) {
      const _item = newChessBoard[kingRow][i];
      if ((_item[1] === "r" || _item[1] === "q") && item[0] !== _item[0]) {
        return {
          isChecking: true,
          site: item[1] === "k" ? item[0] : turn,
        };
      }
    }
    for (let i = kingCol; i >= minPosition; i--) {
      const _item = newChessBoard[kingRow][i];
      if ((_item[1] === "r" || _item[1] === "q") && item[0] !== _item[0]) {
        return {
          isChecking: true,
          site: item[1] === "k" ? item[0] : turn,
        };
      } else {
        return {
          isChecking: false,
          site: item[1] === "k" ? item[0] : turn,
        };
      }
    }

    for (let i = kingRow; i <= maxPosition; i++) {
      const _item = newChessBoard[i][kingCol];
      if ((_item[1] === "r" || _item[1] === "q") && item[0] !== _item[0]) {
        return {
          isChecking: true,
          site: item[1] === "k" ? item[0] : turn,
        };
      } else {
        return {
          isChecking: false,
          site: item[1] === "k" ? item[0] : turn,
        };
      }
    }
    for (let i = kingRow; i >= minPosition; i--) {
      const _item = newChessBoard[i][kingCol];
      if ((_item[1] === "r" || _item[1] === "q") && item[0] !== _item[0]) {
        return {
          isChecking: true,
          site: item[1] === "k" ? item[0] : turn,
        };
      } else {
        return {
          isChecking: false,
          site: item[1] === "k" ? item[0] : turn,
        };
      }
    }
    return {
      isChecking: false,
      site: item[1] === "k" ? item[0] : turn,
    };
  };
}

export default KingService;
