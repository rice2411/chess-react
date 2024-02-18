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

type Props = {
  id?: string;
  position: number[];
  item: string;
  selectedChessPiece: ISquare;
  history: IHistory[];
  handleClickSquare: (position: number[], item: string) => void;
};

function Square({
  id,
  position,
  item,
  selectedChessPiece,
  history,
  handleClickSquare,
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

  const handleOnClick = () => {
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
    <div
      onClick={handleOnClick}
      id={id}
      className={`h-24 w-24 caret-transparent ${handleDrawSquare()} ${handleDrawTextSquare()} ${handleActiveSquare()} ${
        item && "cursor-grab"
      } `}
    >
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
  );
}

export default Square;
