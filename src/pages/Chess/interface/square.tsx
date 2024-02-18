export interface ISquare {
  position: number[];
  item: string;
  handleMove?: (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => void;
  handleTake?: (
    item: string,
    position: number[],
    nextPosition: number[],
    nextItem: string
  ) => void;
}
