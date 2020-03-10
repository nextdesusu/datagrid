import * as React from "react";
import { FixedSizeGrid } from "react-window";

import Cell from "../Cell";
import GridHeader from "../GridHeader";
import './Grid.css';

interface GridProps {
  setFilters: (newArray: any) => any;
  filters: Array<any>;
  data: Array<Array<string | number | boolean | object>>;
  titles: Array<any>;
  width: number;
  height: number;
  rowHeight: number;
}

const Grid = ({ setFilters, filters, data, titles, width, height, rowHeight }: GridProps) => {
  const rowCount: number = data.length;
  const columnCount: number = data[0].length;
  const columnWidth: number = Math.floor(width / columnCount);
  return (
    <section className="grid">
      <GridHeader
        width={columnWidth}
        height={rowHeight}
        titles={titles}
        setFilters={setFilters}
        filters={filters}
      />
      <FixedSizeGrid
        rowCount={rowCount}
        columnCount={columnCount}
        width={width}
        height={height}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        itemData={data}
      >
        {Cell}
      </FixedSizeGrid>
    </section>
  );
};

export default Grid;
