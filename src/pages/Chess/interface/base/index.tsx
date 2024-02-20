import { ETypeMove } from "../../enum/type_move";
import { IHistory } from "../history";
import { ISquare } from "../square";

export interface IKingPosition {
  w: number[];
  b: number[];
}

export interface IBaseChessInput {
  position: number[];
  nextPosition: number[];
  chessBoard: string[][];
  item: string;
  nextItem: string;
  kingPosition: IKingPosition;
  history?: IHistory[];
  isChecking: boolean;
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
}
