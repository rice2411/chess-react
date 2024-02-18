import { useState, createContext } from "react";
import { IHistory } from "../interface/history";
import { ETypeMove } from "../enum/type_move";

const HistoryContext = createContext({});

export const HistoryProvider = ({ children }: any) => {
  const [history, setHistory] = useState<IHistory[]>([]);

  const handleSetHistory = (
    position: number[],
    item: string,
    nextPosition: number[],
    nextItem: string,
    typeMove: ETypeMove
  ) => {
    const newHistory = history;
    const historyItem: IHistory = {
      previous: {
        position: position,
        item: item,
      },
      next: {
        position: nextPosition,
        item: nextItem ? nextItem : item,
      },
      typeMove: typeMove,
    };
    newHistory.push(historyItem);
    setHistory(newHistory);
  };

  return (
    <HistoryContext.Provider value={{ history, handleSetHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
export default HistoryContext;
