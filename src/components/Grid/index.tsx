import * as React from "react";
import { FixedSizeGrid } from "react-window";

import { title } from "../../types";
import Cell from "../Cell";
import GridHeader from "../GridHeader";
import './Grid.css';

interface GridProps {
  data: Array<Array<string | number | boolean | object>>;
  titles: Array<title>;
  width: number;
  height: number;
  rowHeight: number;
  columnCount: number;
}

const Grid = ({ data, titles, width, height, rowHeight, columnCount }: GridProps) => {
  const rowCount: number = data.length;
  const columnWidth: number = Math.floor(width / columnCount);
  return (
    <section className="grid-wrapper">
      <GridHeader
        width={columnWidth}
        height={rowHeight}
        titles={titles}
      />
      <FixedSizeGrid
        rowCount={rowCount}
        columnCount={columnCount}
        width={width}
        height={height}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        itemData={data}
        className="grid"
      >
        {Cell}
      </FixedSizeGrid>
    </section>
  );
};

export default Grid;
