import { ISquare } from "../interface/square";

export const WHITE_TURN = "w";
export const BLACK_TURN = "b";
export const ROW = 8;
export const COL = 8;
export const BLACK_SQUARE_COLOR = `bg-[#779954]`;
export const WHITE_SQUARE_COLOR = `bg-[#E9EDCC]`;
export const TEXT_BLACK_SQUARE_COLOR = `text-[#E9EDCC]`;
export const TEXT_WHITE_SQUARE_COLOR = `text-[#779954]`;
export const BLACK_SQUARE_ACTIVED_COLOR = `bg-[#BBCC44]`;
export const WHITE_SQUARE_ACTIVED_COLOR = `bg-[#F4F680]`;
export const TAKE_COLOR = `bg-[#EE8B7F]`;
export const COL_TEXT = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const ROW_EIGHT = ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"];
export const ROW_SEVEN = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
export const ROW_TWO = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
export const ROW_ONE = ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"];
export const WHITE_PROMOTION = ["wq", "wn", "wb", "wr"];
export const BLACK_PROMOTION = ["bq", "bn", "bb", "br"];
export const EMPTY_SELECTED: ISquare = {
  position: [-1, -1],
  item: "",
  handleMove: () => {},
  handleTake: () => {},
};
