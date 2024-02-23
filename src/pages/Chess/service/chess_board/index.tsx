import { BLACK_TURN, EMPTY_SELECTED } from "../../constant/config";
import { ETypeMove } from "../../enum/type_move";
import { IKingPosition } from "../../interface/base";
import { IHistory } from "../../interface/history";
import { ISquare } from "../../interface/square";
import KingService from "../king";

export type InputDrawBoard = {
  position: number[];
  nextPosition: number[];
  chessBoard: string[][];
  item: string;
  nextItem: string;
  typeMove: ETypeMove;
  isSpecialTake?: boolean;
  lastMove?: IHistory;
  kingPosition: IKingPosition;
  isChecking: boolean;
  setKingPosition?: (value: IKingPosition) => void;
  setIsChecking: (value: boolean) => void;
  setChessBoard: (chessBoard: string[][]) => void;
  handleToggleTurn: (value: string) => void;
  setSelectedChessPiece: (value: ISquare) => void;
  handleSetHistory: (
    position: number[],
    item: string,
    nextPosition: number[],
    nextItem: string,
    typeMove: ETypeMove
  ) => void;
};

class ChessBoardService {
  static handleFisrtMove = (item: string, isDirty: boolean) => {
    //Kiểm tra khi vào game, quân đen không được đi trước
    return !isDirty && item.startsWith(BLACK_TURN);
  };
  // Vẽ lại bàn cờ sau khi di chuyển
  static handleDrawBoard = (input: InputDrawBoard) => {
    const {
      position,
      nextPosition,
      chessBoard,
      item,
      nextItem,
      typeMove,
      isSpecialTake,
      lastMove,
      kingPosition,
      isChecking,
      setChessBoard,
      handleToggleTurn,
      handleSetHistory,
      setSelectedChessPiece,
      setKingPosition,
      setIsChecking,
    } = input;

    // Clone the chessboard to avoid mutation
    const newChessBoard = chessBoard.map((row) => [...row]);

    // Handle special take
    if (isSpecialTake && lastMove) {
      newChessBoard[position[0]][position[1]] = "";
      newChessBoard[nextPosition[0]][nextPosition[1]] = item;
      newChessBoard[lastMove.next.position[0]][lastMove.next.position[1]] = "";
    } else {
      // Regular move
      newChessBoard[nextPosition[0]][nextPosition[1]] = item;
      newChessBoard[position[0]][position[1]] = "";
    }

    const checkingObj = KingService.onHandleChecking(input, newChessBoard);

    console.log(checkingObj);

    if (!checkingObj.isSelfSafe) return;

    setIsChecking(!checkingObj.isEnemySafe);

    const newKingPostion = { ...kingPosition };
    // @ts-ignore
    newKingPostion[item[0]] = nextPosition;
    setKingPosition && setKingPosition(newKingPostion);

    // Set the new chessboard
    setChessBoard(newChessBoard);

    // Toggle turn, set history, and select chess piece
    handleToggleTurn(item);
    handleSetHistory(
      position,
      item,
      nextPosition,
      nextItem,
      isSpecialTake ? typeMove : typeMove
    );
    setSelectedChessPiece(EMPTY_SELECTED);
  };

  static hanleValidationMove = (
    turn: string,
    item: string,
    setSelectedChessPiece: (value: ISquare) => void,
    isDirty: boolean = true
  ) => {
    //Kiểm tra khi vào game, quân đen không được đi trước
    // if (this.handleFisrtMove(item, isDirty)) {
    //   setSelectedChessPiece(EMPTY_SELECTED);
    //   return false;
    // }
    //Kiểm tra lượt chơi
    if (turn !== item[0]) {
      setSelectedChessPiece(EMPTY_SELECTED);
      return false;
    }
    return true;
  };
}

export default ChessBoardService;
