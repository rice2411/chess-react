import { useEffect, useState } from "react";
interface InputProps {
  id: [number, number];
  turn: string;
  winner: string;
  isNewGame: boolean;
  handleChange: (id: [number, number]) => void;
}

function Square({ id, turn, winner, isNewGame, handleChange }: InputProps) {
  const [content, setContent] = useState("");

  const onHandleChange = () => {
    if (content !== "" || winner != "") return;
    setContent(turn);
    handleChange(id);
  };

  useEffect(() => {
    setContent("");
  }, [isNewGame]);

  return (
    <>
      <div
        className="border-solid border-2 border-sky-500 w-10 h-[40px] flex items-center justify-center m-1 cursor-pointer"
        onClick={onHandleChange}
      >
        {content}
      </div>
    </>
  );
}

export default Square;
