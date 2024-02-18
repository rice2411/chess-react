import { BLACK_TURN, EMPTY_SELECTED } from "../constant/config";
import { ETypeMove } from "../enum/type_move";
import { IHistory } from "../interface/history";
import { ISquare } from "../interface/square";

type InputDrawBoard = {
  position: number[];
  nextPosition: number[];
  chessBoard: string[][];
  item: string;
  nextItem: string;
  typeMove: ETypeMove;
  isSpecialTake?: boolean;
  lastMove?: IHistory;
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

const handleFisrtMove = (item: string, isDirty: boolean) => {
  //Kiểm tra khi vào game, quân đen không được đi trước
  return !isDirty && item.startsWith(BLACK_TURN);
};
// Vẽ lại bàn cờ sau khi di chuyển
const handleDrawBoard = (input: InputDrawBoard) => {
  const {
    position,
    nextPosition,
    chessBoard,
    item,
    nextItem,
    typeMove,
    isSpecialTake,
    lastMove,
    setChessBoard,
    handleToggleTurn,
    handleSetHistory,
    setSelectedChessPiece,
  } = input;
  if (isSpecialTake && lastMove) {
    const newChessBoard = chessBoard;
    newChessBoard[position[0]][position[1]] = "";
    newChessBoard[nextPosition[0]][nextPosition[1]] = item;
    newChessBoard[lastMove.next.position[0]][lastMove.next.position[1]] = "";
    setChessBoard(newChessBoard);
    handleToggleTurn(item);
    handleSetHistory(position, item, nextPosition, nextItem, ETypeMove.take);
    setSelectedChessPiece(EMPTY_SELECTED);
  }
  const newChessBoard = chessBoard;
  newChessBoard[nextPosition[0]][nextPosition[1]] = item;
  newChessBoard[position[0]][position[1]] = "";
  setChessBoard(newChessBoard);
  handleToggleTurn(item);
  handleSetHistory(position, item, nextPosition, nextItem, typeMove);
  setSelectedChessPiece(EMPTY_SELECTED);
};

const hanleValidationMove = (
  turn: string,
  item: string,
  setSelectedChessPiece: (value: ISquare) => void,
  isDirty: boolean = true
) => {
  //Kiểm tra khi vào game, quân đen không được đi trước
  if (CHESS_RULE.handleFisrtMove(item, isDirty)) {
    setSelectedChessPiece(EMPTY_SELECTED);
    return false;
  }
  //Kiểm tra lượt chơi
  if (turn !== item[0]) {
    setSelectedChessPiece(EMPTY_SELECTED);
    return false;
  }
  return true;
};
export const CHESS_RULE = {
  handleFisrtMove: handleFisrtMove,
  handleDrawBoard: handleDrawBoard,
  hanleValidationMove: hanleValidationMove,
};
