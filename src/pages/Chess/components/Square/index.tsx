import {
  BLACK_SQUARE_ACTIVED_COLOR,
  BLACK_SQUARE_COLOR,
  COL_TEXT,
  ROW,
  TEXT_BLACK_SQUARE_COLOR,
  TEXT_WHITE_SQUARE_COLOR,
  WHITE_SQUARE_ACTIVED_COLOR,
  WHITE_SQUARE_COLOR,
} from "../../constant/config";
import { getChessPieceImage } from "../../utils";
import { IHistory } from "../../interface/history";
import { ISquare } from "../../interface/square";
import Promotion from "../Promotion";
import { useEffect } from "react";

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
    const isSelectedPosition =
      selectedPosition[0] === position[0] &&
      selectedPosition[1] === position[1] &&
      item;
    const isPreviousMove =
      lastMove?.previous &&
      lastMove.previous.position[0] === position[0] &&
      lastMove.previous.position[1] === position[1];
    const isNextMove =
      lastMove?.next &&
      lastMove.next.position[0] === position[0] &&
      lastMove.next.position[1] === position[1];

    if (isSelectedPosition || isPreviousMove || isNextMove) {
      return isBlackSquare()
        ? BLACK_SQUARE_ACTIVED_COLOR
        : WHITE_SQUARE_ACTIVED_COLOR;
    }
  };

  const handleDrawClass = () => {
    return `${handleDrawSquare()} ${handleDrawTextSquare()} ${handleActiveSquare()}`;
  };

  const handleCheckPromotion = () => {
    return (
      isPromotion &&
      selectedPosition[0] === position[0] &&
      selectedPosition[1] === position[1]
    );
  };

  const handleOnClick = () => {
    // Lưu lại vị trí click
    setSelectedPosition(position);

    // Đang hiển thị bảng phong cấp thì return
    if (isPromotion) return;

    // Không có quân cờ nào được chọn, hoặc quân cờ được chọn cùng team
    if (!selectedChessPiece.item || selectedChessPiece.item[0] === item[0]) {
      handleClickSquare(position, item);
    } else {
      // Thực hiện logic bắt quân
      selectedChessPiece.handleTake &&
        selectedChessPiece.handleTake(
          selectedChessPiece.item,
          selectedChessPiece.position,
          position,
          item
        );
    }
    // Vẫn là logic bắt quân
    if (
      selectedChessPiece.item &&
      item &&
      selectedChessPiece.item[0] !== item[0]
    ) {
      selectedChessPiece.handleTake &&
        selectedChessPiece.handleTake(
          selectedChessPiece.item,
          selectedChessPiece.position,
          position,
          item
        );
    } else {
      // Di chuyển nếu ô tiếp theo hợp lệ
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
        className={`h-24 w-24 caret-transparent ${handleDrawClass()} ${
          item && "cursor-grab"
        } `}
      >
        {selectedChessPiece.handlePromotion && handleCheckPromotion() && (
          <Promotion
            turn={turn}
            setIsPromotion={setIsPromotion}
            handlePawnPromotion={selectedChessPiece.handlePromotion}
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
