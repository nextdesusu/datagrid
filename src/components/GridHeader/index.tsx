import * as React from "react";

import { option, title } from "../../types";
import { HEnum, HBool, HInput } from "../HeaderFilterComponents";
import CellHeader from "../CellHeader";
import "./GridHeader.css";


interface GridHeaderProps {
  setFilters: (newFilter: any) => any;
  width: number;
  height: number;
  titles: Array<title>;
  filters: Array<any>;
}

class GridHeader extends React.Component< GridHeaderProps> {
  constructor(props: GridHeaderProps) {
    super(props);
    const { filters } = this.props;
    this.state = {
      checboxes: filters.map(filter => Boolean(filter))
    };
  }

  createHeader(): Array<React.ReactNode> {
    const { titles, width, height } = this.props;
    const headerNodes: Array<React.ReactNode> = [];
    let key: number = 0;
    let firstIndex: number = 0;
    let lastIndex: number = 0;
    for (let {label, componentType, options} of titles) {
      if (componentType === "text") {
        lastIndex += 1;
      } else {
        const componentKey = `header ${key}`;
        if (lastIndex > firstIndex) {
          const options = titles.slice(firstIndex, lastIndex).map((titleItem) => {
            return {label: titleItem.label, value: titleItem.value};
          })
          headerNodes.push(
            <HInput
              key={componentKey}
              options={options}
              style={{width: width * lastIndex, height}}
            />
          );
          firstIndex = lastIndex;
        }
        if (componentType === "enum") {
          console.log("value", options)
          headerNodes.push(<HEnum key={componentKey} options={options}/>);
        } else if (componentType === "boolean") {
          headerNodes.push(<HBool key={componentKey} options={options}/>);
        }
        key += 1;
      }
    }
    return headerNodes;
  }

  render() {
    const { setFilters, width, height, titles } = this.props;
    const headerNodes: Array<React.ReactNode> = this.createHeader();
    return (
      <div
        className="grid-header"
        style={{ width: width * titles.length, height: height * 2 }}
      >
        <div className="grid-header-block1" style={{ height }}>
          {headerNodes}
        </div>
        <div className="grid-header-block2" style={{ height }}>
          {titles.map((titleItem, index) => {
            const CellTitleKey = `CellTitle: ${index}`;
            const { label } = titleItem;
            return (
              <CellHeader
                key={CellTitleKey}
                width={width}
                height={height}
                leftShift={index * width}
              >
                {label}
              </CellHeader>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GridHeader;
