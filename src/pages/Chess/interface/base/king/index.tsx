import { IBaseChessInput, IKingPosition } from "..";

export interface IKingInput extends IBaseChessInput {
  setKingPosition: (value: IKingPosition) => void;
}
