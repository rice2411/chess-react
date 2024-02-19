import {
  BLACK_SQUARE_ACTIVED_COLOR,
  BLACK_SQUARE_COLOR,
  COL_TEXT,
  ROW,
  TEXT_BLACK_SQUARE_COLOR,
  TEXT_WHITE_SQUARE_COLOR,
  WHITE_SQUARE_ACTIVED_COLOR,
  WHITE_SQUARE_COLOR,
  WHITE_TURN,
} from "../../constant/config";
import { getChessPieceImage } from "../../utils";
import { IHistory } from "../../interface/history";
import { ISquare } from "../../interface/square";
import Promotion from "../Promotion";
import { useState } from "react";

type Props = {
  id?: string;
  position: number[];
  item: string;
  turn: string;
  selectedChessPiece: ISquare;
  history: IHistory[];
  isPromotion: boolean;
  selectedPosition: number[];
  handleClickSquare: (position: number[], item: string) => void;
  setSelectedPosition: (position: number[]) => void;
  setIsPromotion: (value: boolean) => void;
  handlePawnPromotion: (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => void;
};

function Square({
  id,
  position,
  turn,
  item,
  selectedChessPiece,
  history,
  selectedPosition,
  isPromotion,
  handleClickSquare,
  setIsPromotion,
  handlePawnPromotion,
  setSelectedPosition,
}: Props) {
  const isBlackSquare = () => {
    const totalPostion = position[0] + position[1];
    return totalPostion % 2 != 0;
  };

  const handleDrawSquare = () => {
    return isBlackSquare() ? BLACK_SQUARE_COLOR : WHITE_SQUARE_COLOR;
  };

  const handleDrawTextSquare = () => {
    return isBlackSquare() ? TEXT_BLACK_SQUARE_COLOR : TEXT_WHITE_SQUARE_COLOR;
  };

  const handleActiveSquare = () => {
    const lastMove = history[history.length - 1];
    if (
      (selectedChessPiece.position[0] == position[0] &&
        selectedChessPiece.position[1] == position[1]) ||
      (lastMove?.previous?.position[0] == position[0] &&
        lastMove?.previous?.position[1] == position[1]) ||
      (lastMove?.next?.position[0] == position[0] &&
        lastMove?.next?.position[1] == position[1])
    ) {
      return isBlackSquare()
        ? BLACK_SQUARE_ACTIVED_COLOR
        : WHITE_SQUARE_ACTIVED_COLOR;
    }
  };

  const handleCheckPromotion = () => {
    return (
      isPromotion &&
      selectedPosition[0] === position[0] &&
      selectedPosition[1] === position[1]
    );
  };

  const handleOnClick = () => {
    setSelectedPosition(position);
    if (isPromotion) return;

    if (item && selectedChessPiece.item === "") {
      //Chọn quân cờ
      handleClickSquare(position, item);
    } else if (selectedChessPiece.item[0] === item[0]) {
      //Chọn quân cờ
      handleClickSquare(position, item);
    } else if (
      selectedChessPiece.item &&
      item &&
      selectedChessPiece.item !== ""
    ) {
      // Bắt quân
      selectedChessPiece.handleTake &&
        selectedChessPiece.handleTake(
          selectedChessPiece.item,
          selectedChessPiece.position,
          position,
          item
        );
    } else {
      // Di chuyển
      selectedChessPiece.handleMove &&
        selectedChessPiece.handleMove(
          selectedChessPiece.item,
          selectedChessPiece.position,
          position,
          item
        );
    }
  };

  return (
    <>
      <div
        onClick={handleOnClick}
        id={id}
        className={`h-24 w-24 caret-transparent ${handleDrawSquare()} ${handleDrawTextSquare()} ${handleActiveSquare()} ${
          item && "cursor-grab"
        } `}
      >
        {handleCheckPromotion() && (
          <Promotion
            turn={turn}
            setIsPromotion={setIsPromotion}
            handlePawnPromotion={handlePawnPromotion}
            position={selectedChessPiece.position}
            nextPosition={position}
          />
        )}
        {/* In ra số thứ tự ở vị trí cột đầu tiên bên trái */}
        {position[1] == 0 && (
          <p className="text-xl pl-2 absolute">{ROW - position[0]}</p>
        )}
        {/* In ra cột abcf ở hàng cuối cùng */}
        {position[0] == ROW - 1 && (
          <p className={`text-xl absolute mt-16 ml-20`}>
            {COL_TEXT[position[1]]}
          </p>
        )}
        <img className="" src={`${getChessPieceImage(item)}`} alt="" />
      </div>
    </>
  );
}

export default Square;
