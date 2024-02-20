import { ROW_EIGHT, ROW_ONE, ROW_SEVEN, ROW_TWO } from "../constant/config";

export const getChessPieceImage = (chessPiece: string) => {
  if (!chessPiece) return "";
  return `./chess_pieces/${chessPiece}.png`;
};

export const initChessPiece = (
  row: string[],
  rowIdx: number,
  colIdx: number
) => {
  //BLACK SITE at ROW 7, 8 and WHITE SITE 1, 2 <=> idx 0,1 && 6,7
  // switch (rowIdx) {
  //   case 0:
  //     row.push(ROW_EIGHT[colIdx]);
  //     break;
  //   case 1:
  //     row.push(ROW_SEVEN[colIdx]);
  //     break;
  //   case 6:
  //     row.push(ROW_TWO[colIdx]);
  //     break;
  //   case 7:
  //     row.push(ROW_ONE[colIdx]);
  //     break;
  //   default:
  //     row.push("");
  //     break;
  // }
  switch (rowIdx) {
    case 0:
      if (colIdx == 4) row.push("bk");
      else if (colIdx == 5) row.push("br");
      else row.push("");
      break;
    // case 1:
    //   row.push(colIdx == 1 ? "wr" : "");
    //   break;
    // case 6:
    //   row.push(colIdx == 5 ? "bk" : "");
    //   break;
    case 7:
      if (colIdx == 4) row.push("wk");
      else if (colIdx == 3) row.push("wr");
      else row.push("");
      break;
    default:
      row.push("");
      break;
  }
};
