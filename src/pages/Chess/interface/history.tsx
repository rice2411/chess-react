import { ETypeMove } from "../enum/type_move";
import { ISquare } from "./square";

export interface IHistory {
  previous: ISquare;
  next: ISquare;
  typeMove: ETypeMove;
}
