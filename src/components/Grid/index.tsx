import * as React from "react";
import { FixedSizeGrid } from "react-window";

import Cell from "../Cell";

interface GridProps {
  data: Array<object>;
  columnCount: number;
  width: number;
  height: number;
  rowHeight: number;
}

const Grid = ({ data, columnCount, width, height, rowHeight }: GridProps) => {
  const rowCount: number = data.length;
  const columnWidth: number = Math.floor(width / columnCount);
  return (
    <FixedSizeGrid
      rowCount={rowCount}
      columnCount={columnCount}
      width={width}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      height={height}
    >
      {Cell}
    </FixedSizeGrid>
  );
};

export default Grid;
