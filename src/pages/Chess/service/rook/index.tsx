import { ETypeMove } from "../../enum/type_move";
import { IRookInput } from "../../interface/base/rook";

import ChessBoardService from "../chess_board";

class RookService {
  // Logic Xe di chuyển
  static onMove = (input: IRookInput) => {
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
        isChecking,
        nextItem,
        typeMove,
        kingPosition,
        setChessBoard,
        handleToggleTurn,
        setIsChecking,
        handleSetHistory,
        setSelectedChessPiece,
      });
    }
  };

  // Logic Tốt Ăn Quân
  static onTake = (input: IRookInput) => {
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
      setIsChecking,
      setSelectedChessPiece,
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
        typeMove,
        kingPosition,
        isChecking,
        setChessBoard,
        setIsChecking,
        handleToggleTurn,
        handleSetHistory,
        setSelectedChessPiece,
      });
    }
  };

  static onValidateMove = (input: IRookInput) => {
    const { position, nextPosition, chessBoard } = input;
    // Quân xe đi thẳng hoặc ngang
    const isSameRow = position[0] === nextPosition[0];
    const isSameCol = position[1] === nextPosition[1];

    // Chặn đi chéo
    if (!isSameRow && !isSameCol) {
      return false;
    }

    // Check có vật cản trên đường đi không

    //Xe đi thẳng, lùi
    if (isSameCol) {
      // Kiểm tra vị trí tiếp theo lớn hơn hay bé hơn vị trí hiện tại
      const direction = nextPosition[0] > position[0] ? 1 : -1;
      for (
        let i = position[0] + direction;
        i !== nextPosition[0];
        i += direction
      ) {
        if (chessBoard[i][position[1]]) {
          return false;
        }
      }
    }
    //Xe đi trái, phải
    if (isSameRow) {
      const direction = nextPosition[1] > position[1] ? 1 : -1;
      for (
        let i = position[1] + direction;
        i !== nextPosition[1];
        i += direction
      ) {
        if (chessBoard[position[0]][i]) {
          return false;
        }
      }
    }

    return true;
  };
}

export default RookService;
