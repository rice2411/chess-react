import { createBrowserRouter } from "react-router-dom";
import CaroGame from "../pages/CaroGame";
import FakingType from "../pages/FakingType";
import { HistoryProvider } from "../pages/Chess/context/history";
import Chess from "../pages/Chess";

export default createBrowserRouter([
  {
    path: "/caro_game",
    element: <CaroGame />,
  },
  {
    path: "/faking_type",
    element: <FakingType />,
  },
  {
    path: "/chess",
    index: true,
    element: (
      <HistoryProvider>
        <Chess />
      </HistoryProvider>
    ),
  },
]);
