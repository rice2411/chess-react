import { BLACK_TURN, EMPTY_SELECTED, WHITE_TURN } from "../../constant/config";
import { ETypeMove } from "../../enum/type_move";
import { IPawnInput } from "../../interface/base/pawn";
import ChessBoardService from "../chess_board";

class PawnService {
  // Logic Tốt di chuyển
  static onMove = (input: IPawnInput) => {
    const {
      item,
      position,
      nextPosition,
      chessBoard,
      nextItem,
      isChecking,
      isPromotion,
      kingPosition,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setIsDirty,
      setIsChecking,
      setIsPromotion,
    } = input;
    // kiểm tra lượt đi của màu nào
    const isWhiteMove = item[0] === WHITE_TURN;
    // Tìm kiếm vị trí bắt đầu của quân tốt
    const startPosition = isWhiteMove ? 6 : 1;
    const rowMove = position[0] - nextPosition[0];
    const colMove = position[1] - nextPosition[1];
    // vị trí chốt qua sông
    const isAtTheBank = isWhiteMove ? position[0] === 3 : position[0] === 4;
    // Bắt chốt qua đường
    if (isAtTheBank && Math.abs(rowMove) === 1 && Math.abs(colMove) === 1) {
      if (!this.onSpecialTake(input)) return;
    }
    // Ngăn chặn chốt đi lùi
    if ((isWhiteMove && rowMove <= 0) || (!isWhiteMove && rowMove >= 0)) {
      setSelectedChessPiece(EMPTY_SELECTED);
      return;
    }
    // Tính giới hạn di chuyển của tốt
    const limitMove = Math.abs(rowMove);
    let isValidMove = false;
    if (position[0] === startPosition) {
      //Tốt ở vị trí xuất phát có thể di 2 ô
      isValidMove =
        limitMove <= 2 && limitMove >= 1 && nextPosition[1] === position[1];
    } else {
      //Tốt không phải ở vị trí xuất phát chỉ có thể đi 1 ô
      isValidMove = limitMove === 1 && nextPosition[1] === position[1];
    }

    if (isValidMove) {
      // Vị trí tiếp theo phải ở 2 hàng cuối cùng, 1 và 8
      if ((nextPosition[0] === 7 || nextPosition[0] === 0) && !isPromotion) {
        setIsPromotion && setIsPromotion(true);
        return;
      }
      const typeMove = ETypeMove.normal;
      ChessBoardService.handleDrawBoard({
        position,
        nextPosition,
        chessBoard,
        item,
        nextItem,
        kingPosition,
        isChecking,
        typeMove,
        setIsChecking,
        setChessBoard,
        handleToggleTurn,
        handleSetHistory,
        setSelectedChessPiece,
      });
      setIsDirty(true);
    }
  };
  // Logic Phong cấp
  static onPromotion = (input: IPawnInput) => {
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
      setIsChecking,
      handleSetHistory,
      setSelectedChessPiece,
    } = input;
    // Vẽ lại
    const typeMove = ETypeMove.promotion;
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
    });
  };
  // Logic bắt tốt qua đường
  static onSpecialTake = (input: IPawnInput) => {
    const {
      item,
      position,
      nextPosition,
      history,
      chessBoard,
      kingPosition,
      isChecking,
      nextItem,
      setChessBoard,
      handleToggleTurn,
      setIsChecking,
      handleSetHistory,
      setSelectedChessPiece,
    } = input;
    // Kiểm tra chốt có đứng ở vị trí hợp lệ để thực hiện ko
    if (
      (item[0] === WHITE_TURN && position[0] === 3) ||
      (item[0] === BLACK_TURN && position[0] === 4)
    ) {
      // Lấy nước đi cuối cùng
      const lastMove = history && history[history.length - 1];
      // Lấy vị trí Row của nước đi cuối
      const lastRow = lastMove?.next.position[0] || 0;
      // Lấy vị trí Col của nước đi cuối
      const lastCol = lastMove?.next.position[1] || 0;
      // Lấy vị trí Row của nước đi hiện tại
      const currentRow = position[0];
      // Lấy vị trí Col của nước đi hiện tại
      const currentCol = position[1];
      // Kiểm tra vị trí ăn quân có hợp lệ không
      const isValidPostion =
        Math.abs(lastCol - currentCol) === 1 && lastRow === currentRow;
      // Kiểm tra có phải 1 con tốt mục tiêu hợp lệ không
      // Kiểm tra có phải tốt ăn tốt không
      const isAllPawn = lastMove?.next.item[1] === "p" && item[1] === "p";
      // Kiểm tra tốt có ăn đúng vị trí  không
      const postionPawn = item[0] === WHITE_TURN ? -1 : 1;
      const isValidTake =
        lastMove &&
        lastMove?.next.position[0] + postionPawn === nextPosition[0] &&
        lastMove.next.position[1] === nextPosition[1];
      // Kiểm tra có phải tốt mới xuất phát không
      const isNewPawn =
        lastMove &&
        Math.abs(lastMove.next.position[0] - lastMove.previous.position[0]) ===
          2;
      const isValidPawn = isAllPawn && isValidTake && isNewPawn;
      const isCanTake = isValidPostion && isValidPawn;
      if (isCanTake) {
        const typeMove = ETypeMove.take;
        const isSpecialTake = true;

        ChessBoardService.handleDrawBoard({
          position,
          nextPosition,
          chessBoard,
          item,
          kingPosition,
          nextItem,
          typeMove,
          isSpecialTake,
          isChecking,
          lastMove,
          setChessBoard,
          setIsChecking,
          handleToggleTurn,
          handleSetHistory,
          setSelectedChessPiece,
        });
        return true;
      }
    }
    return false;
  };
  // Logic Tốt Ăn Quân
  static onTake = (input: IPawnInput) => {
    const {
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      isPromotion,
      isChecking,
      kingPosition,
      setIsPromotion,
      setChessBoard,
      handleToggleTurn,
      setIsChecking,
      handleSetHistory,
      setSelectedChessPiece,
    } = input;
    //phải có quân mới được ăn
    if (!nextItem) return;
    // Kiểm tra lượt đi
    const isWhiteMove = item[0] === WHITE_TURN;
    //Lấy khoảng cách  tốt di chuyển
    const rowMove = position[0] - nextPosition[0];
    const colMove = position[1] - nextPosition[1];
    if (
      (isWhiteMove && (rowMove <= 0 || rowMove > 1 || colMove > 1)) ||
      (!isWhiteMove && colMove >= 0 && colMove < 1) ||
      rowMove < -1 ||
      colMove < -1
    ) {
      setSelectedChessPiece(EMPTY_SELECTED);
      return;
    }
    if (
      (nextPosition[0] === 7 || nextPosition[0] === 0) &&
      !isPromotion &&
      nextItem
    ) {
      setIsPromotion && setIsPromotion(true);
      return;
    }
    // Tính giới hạn ăn quân
    const limitMoveRow = Math.abs(rowMove);
    const limitMoveCol = Math.abs(colMove);
    if (limitMoveCol && limitMoveRow) {
      const typeMove = ETypeMove.take;
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
      });
    }
  };
}

export default PawnService;
