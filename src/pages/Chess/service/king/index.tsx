import { BLACK_TURN, WHITE_TURN } from "../../constant/config";
import { ETypeMove } from "../../enum/type_move";
import { IKingInput } from "../../interface/base/king";
import { IRookInput } from "../../interface/base/rook";

import ChessBoardService, { InputDrawBoard } from "../chess_board";

class KingService {
  // Logic  di chuyển
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

  // Logic  Ăn Quân
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
  // Kiểm tra nước đi
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
  // Kiểm tra chiếu
  static onHandleChecking = (
    input: InputDrawBoard,
    newChessBoard: string[][]
  ) => {
    const { item, kingPosition, nextPosition } = input;
    // Có phải nước đi là di chuyển vua không
    const isKingMove = item[1] === "k";
    // Lấy lượt đi tiếp theo
    const turn = item[0];
    const nextTurn = turn === WHITE_TURN ? BLACK_TURN : WHITE_TURN;
    // @ts-ignore
    const selfNextKingPosition = isKingMove ? nextPosition : kingPosition[turn];
    // @ts-ignore
    const enemyNextKingPosition = kingPosition[nextTurn];
    // Lấy vị trí của 2 vua
    const kingRow = selfNextKingPosition[0];
    const kingCol = selfNextKingPosition[1];
    const enemyKingRow = enemyNextKingPosition[0];
    const enemyKingCol = enemyNextKingPosition[1];
    // Kiểm vua có an toàn không
    const isSelfSafe = this.onSafeKing(kingRow, kingCol, newChessBoard);
    const isEnemySafe = this.onSafeKing(
      enemyKingRow,
      enemyKingCol,
      newChessBoard
    );

    return {
      isSelfSafe,
      isEnemySafe,
    };
  };
  // Kiểm tra vua
  static onSafeKing = (
    kingRow: number,
    kingCol: number,
    newChessBoard: string[][]
  ) => {
    const kingSite = newChessBoard[kingRow][kingCol][0];

    const leftTop =
      newChessBoard[kingRow === 0 ? kingRow : kingRow - 1][kingCol] || "";
    const rightTop =
      newChessBoard[kingRow === 7 ? kingRow : kingRow + 1][kingCol] || "";
    const leftBottom =
      newChessBoard[kingRow][kingCol === 0 ? kingCol : kingCol - 1] || "";
    const rightBottom =
      newChessBoard[kingRow][kingCol === 7 ? kingCol : kingCol + 1] || "";

    console.log(leftTop);
    console.log(rightTop);
    console.log(leftBottom);
    console.log(rightBottom);

    let tempCheck = true;
    if (kingSite === WHITE_TURN) {
      const isKingOrPawn =
        leftTop === "p" ||
        rightTop === "p" ||
        leftTop === "k" ||
        rightTop === "k";
      tempCheck = !isKingOrPawn;
    } else {
      const isKingOrPawn =
        leftBottom === "p" ||
        rightBottom === "p" ||
        leftBottom === "k" ||
        rightBottom === "k";
      tempCheck = !isKingOrPawn;
    }
    const horizontalVerticalCheck = this.onHorizontalVerticalCheck(
      kingRow,
      kingCol,
      newChessBoard
    );
    // console.log(tempCheck);
    return horizontalVerticalCheck;
  };

  static onHorizontalVerticalCheck = (
    kingRow: number,
    kingCol: number,
    newChessBoard: string[][]
  ) => {
    // Giá trị thấp và cao nhất của hàng và cột có thể di chuyển
    const minPosition = 0;
    const maxPosition = 7;

    const kingSite = newChessBoard[kingRow][kingCol][0];

    for (let i = kingCol + 1; i <= maxPosition; i++) {
      const enemyItem = newChessBoard[kingRow][i];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      if (enemyItem[1] && !isRookOrQueen) {
        return true;
      }
      const isEnemy = kingSite !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        return false;
      }
    }
    // Kiểm tra bên trái vua
    for (let i = kingCol - 1; i >= minPosition; i--) {
      const enemyItem = newChessBoard[kingRow][i];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      if (enemyItem[1] && !isRookOrQueen) {
        return true;
      }
      const isEnemy = kingSite !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        return false;
      }
    }
    // Kiểm tra phía sau vua
    for (let i = kingRow + 1; i <= maxPosition; i++) {
      const enemyItem = newChessBoard[i][kingCol];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      if (enemyItem[1] && !isRookOrQueen) {
        return true;
      }
      const isEnemy = kingSite !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        return false;
      }
    }
    //Kiểm tra phía trước vua
    for (let i = kingRow - 1; i >= minPosition; i--) {
      const enemyItem = newChessBoard[i][kingCol];
      const isRookOrQueen = enemyItem[1] === "r" || enemyItem[1] === "q";
      if (enemyItem[1] && !isRookOrQueen) {
        return true;
      }
      const isEnemy = kingSite !== enemyItem[0];
      if (isRookOrQueen && isEnemy) {
        return false;
      }
    }
  };
}

export default KingService;
