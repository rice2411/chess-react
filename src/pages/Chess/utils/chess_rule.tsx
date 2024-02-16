import { BLACK_TURN, EMPTY_SELECTED } from "../constant/config";
import { ISquare } from "../interface/square";

export const handleFisrtMove = (
  selectedChessPiece: ISquare,
  isDirty: boolean
) => {
  const { item } = selectedChessPiece;
  //Kiểm tra khi vào game, quân đen không được đi trước
  return !isDirty && item.startsWith(BLACK_TURN);
};
