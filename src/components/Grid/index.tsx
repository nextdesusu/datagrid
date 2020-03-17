import * as React from "react";
import { FixedSizeGrid } from "react-window";

import exportAsCSV from "../../exportAsCSV";
import { title } from "../../types";
import Cell from "../Cell";
import GridHeader from "../GridHeader";
import "./Grid.css";

interface GridProps {
  data: Array<Array<string | number | boolean | object>>;
  titles: Array<title>;
  width: number;
  height: number;
  rowHeight: number;
  columnCount: number;
  selected: any;
  toggleSelected: any;
  unselectAll: any;
}

class Grid extends React.Component<GridProps> {
  handleOnclick = (event: React.MouseEvent) => {
    const { toggleSelected, unselectAll } = this.props;
    const target: Element = event.target as Element;
    let neededElement: Element | null | undefined = target;
    while (!neededElement?.hasAttribute("data-column-index")) {
      if (neededElement?.hasAttribute("data-grid-outer")) return;
      neededElement = neededElement?.parentElement;
    }
    const id: number = Number(neededElement.getAttribute("data-column-index"));
    if (event.shiftKey) {
      toggleSelected(id);
    } else {
      unselectAll();
      toggleSelected(id);
    }
  };

  handleData() {
    const { selected } = this.props;
    const { data } = this.props;
    return data.map((dataColumn: any) =>
      dataColumn.filter((columnItem: any, index: number) => index in selected)
    );
  }

  getChoosenCSV = () => {
    const { selected, titles } = this.props;
    const titlesHandled = titles
      .filter((titleItem: any, index: number) => index in selected)
      .map(title => title.label);
    const handledData = this.handleData();
    exportAsCSV("list_of_choosen_columns.csv", [titlesHandled, ...handledData]);
  };

  render() {
    const {
      data,
      titles,
      width,
      height,
      rowHeight,
      columnCount,
      selected
    } = this.props;
    const rowCount: number = data.length;
    const columnWidth: number = Math.floor(width / columnCount);
    const disableConditon = Object.keys(selected).length < 1;
    const itemData = {
      data,
      selected
    };
    return (
      <section className="grid-wrapper">
        <button
          disabled={disableConditon}
          onClick={this.getChoosenCSV}
          className="button-getCSV"
        >
          {disableConditon
            ? "choose columns to export!"
            : "get chosen columns as csv!"}
        </button>
        <GridHeader width={columnWidth} height={rowHeight} titles={titles} />
        <div data-grid-outer onClick={this.handleOnclick} className="grid-main">
          <FixedSizeGrid
            rowCount={rowCount}
            columnCount={columnCount}
            width={width}
            height={height}
            columnWidth={columnWidth}
            rowHeight={rowHeight}
            itemData={itemData}
            className="grid"
          >
            {Cell}
          </FixedSizeGrid>
        </div>
      </section>
    );
  }
}

export default Grid;
