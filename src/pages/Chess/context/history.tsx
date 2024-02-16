import { useState, createContext } from "react";
import { IHistory } from "../interface/history";

const HistoryContext = createContext({});

export const HistoryProvider = ({ children }: any) => {
  const [history, setHistory] = useState<IHistory[]>([]);

  const handleSetHistory = (
    position: number[],
    item: string,
    nextPosition: number[],
    nextItem: string
  ) => {
    const newHistory = history;
    const historyItem = {
      previous: {
        position: position,
        item: item,
      },
      next: {
        position: nextPosition,
        item: nextItem ? nextItem : item,
      },
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
