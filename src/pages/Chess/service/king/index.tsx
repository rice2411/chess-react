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
    // Có phải nước đi là di chuyển vua không
    const isKingMove = item[1] === "k";
    // Lấy lượt đi tiếp theo
    const nextTurn = item[0] === WHITE_TURN ? BLACK_TURN : WHITE_TURN;
    // @ts-ignore
    const nextKingPosition = isKingMove ? nextPosition : kingPosition[nextTurn];
    // Giá trị thấp và cao nhất của hàng và cột có thể di chuyển
    const minPosition = 0;
    const maxPosition = 7;
    // Lấy vị trí của vua
    const kingRow = nextKingPosition[0];
    const kingCol = nextKingPosition[1];
    // Tạo biến lưu dữ liệu kiểm tra
    const result = {
      isChecking: false,
      site: "w",
      isKingMove: false,
    };
    // Kiểm tra bên phải vua
    for (let i = kingCol + 1; i <= maxPosition; i++) {
      const enemyItem = newChessBoard[kingRow][i];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      const isEnemy = item[0] !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        if (isKingMove) {
          result.isChecking = true;
          result.site = item[0];
          result.isKingMove = true;
        } else {
          result.isChecking = true;
          result.site = nextTurn;
          result.isKingMove = false;
        }
      }
    }
    // Kiểm tra bên trái vua
    for (let i = kingCol - 1; i >= minPosition; i--) {
      const enemyItem = newChessBoard[kingRow][i];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      const isEnemy = item[0] !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        if (isKingMove) {
          result.isChecking = true;
          result.site = item[0];
          result.isKingMove = true;
        } else {
          result.isChecking = true;
          result.site = nextTurn;
          result.isKingMove = false;
        }
      }
    }
    // Kiểm tra phía sau vua
    for (let i = kingRow + 1; i <= maxPosition; i++) {
      const enemyItem = newChessBoard[i][kingCol];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      const isEnemy = item[0] !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        if (isKingMove) {
          result.isChecking = true;
          result.site = item[0];
          result.isKingMove = true;
        } else {
          result.isChecking = true;
          result.site = nextTurn;
          result.isKingMove = false;
        }
      }
    }
    //Kiểm tra phía trước vua
    for (let i = kingRow - 1; i >= minPosition; i--) {
      const enemyItem = newChessBoard[i][kingCol];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      const isEnemy = item[0] !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        if (isKingMove) {
          result.isChecking = true;
          result.site = item[0];
          result.isKingMove = true;
        } else {
          result.isChecking = true;
          result.site = nextTurn;
          result.isKingMove = false;
        }
      }
    }
    return result;
  };
}

export default KingService;
