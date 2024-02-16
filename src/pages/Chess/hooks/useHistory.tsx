import { useContext } from "react";
import HistoryContext from "../context/history";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
