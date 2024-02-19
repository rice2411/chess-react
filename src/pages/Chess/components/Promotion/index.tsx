import { useEffect, useRef, useState } from "react";
import { getChessPieceImage } from "../../utils";
import {
  BLACK_PROMOTION,
  BLACK_TURN,
  WHITE_PROMOTION,
  WHITE_TURN,
} from "../../constant/config";
import CloseButton from "./Close";

type Input = {
  turn: string;
  position: number[];
  nextPosition: number[];
  setIsPromotion: (value: boolean) => void;
  handlePawnPromotion: (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => void;
};

function Promotion(input: Input) {
  const { position, nextPosition, setIsPromotion, handlePawnPromotion } = input;

  const [promotions, setPromotions] = useState(
    input.turn === WHITE_TURN ? WHITE_PROMOTION : BLACK_PROMOTION
  );

  const ref: any = useRef(null);

  const onChoosePromotion = (item: string) => {
    // vẽ lại theo item được chọn
    handlePawnPromotion(item, position, nextPosition, "");
    handleClosePromotionList();
  };

  const handleClosePromotionList = () => {
    setIsPromotion(false);
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClosePromotionList();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className={`h-[27rem] w-24 caret-transparent bg-[#ffffff] shadow-2xl absolute z-[999] text-center ${
        input.turn === BLACK_TURN && "bottom-[109px]"
      }`}
    >
      {input.turn === BLACK_TURN && <CloseButton />}
      <div ref={ref}>
        {promotions.map((item: string, index: number) => (
          <img
            onClick={() => {
              onChoosePromotion(item);
            }}
            key={index}
            className=""
            src={`${getChessPieceImage(item)}`}
            alt=""
          />
        ))}
      </div>
      {input.turn === WHITE_TURN && <CloseButton />}
    </div>
  );
}

export default Promotion;
