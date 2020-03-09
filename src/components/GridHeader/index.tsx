import * as React from "react";

import HeaderInput from "../HeaderInput";
import CellHeader from "../CellHeader";
import "./GridHeader.css";

interface GridHeaderProps {
  setFilters: (newFilter: any) => any;
  width: number;
  height: number;
  titles: Array<string>;
  filters: Array<any>;
}


interface option {
  label: string;
  value: number;
}

class GridHeader extends React.Component<GridHeaderProps> {
  constructor(props: GridHeaderProps) {
    super(props);
    const { filters } = this.props;
    this.state = {
      checboxes: filters.map(filter => Boolean(filter))
    };
  }

  render() {
    const { setFilters, width, height, titles } = this.props;
    return (
      <div
        className="grid-header"
        style={{ width: width * titles.length, height: height * 2 }}
      >
        <div className="grid-header-block1" style={{ height }}>
          <HeaderInput
            width={4 * width}
            options={titles.map((title, index) => {
              const opt: option = {label: title, value: index};
              return opt;
            })}
            height={height}
          />
        </div>
        <div className="grid-header-block2" style={{ height }}>
          {titles.map((titleText, index) => {
            const CellTitleKey = `CellTitle: ${index}`;
            return (
              <CellHeader
                key={CellTitleKey}
                width={width}
                height={height}
                leftShift={index * width}
              >
                {titleText}
              </CellHeader>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GridHeader;
