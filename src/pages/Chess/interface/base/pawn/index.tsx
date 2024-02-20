import { IBaseChessInput } from "..";

export interface IPawnInput extends IBaseChessInput {
  isPromotion?: boolean;
  setIsPromotion?: (value: boolean) => void;
  setIsDirty: (value: boolean) => void;
}
