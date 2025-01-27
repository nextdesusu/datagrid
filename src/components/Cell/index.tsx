import * as React from "react";
import { PureComponent } from "react";
import { GridChildComponentProps } from "react-window";

import "./Cell.css";

class Cell extends PureComponent<GridChildComponentProps> {
  getComponent(value: any) {
    let className: string = "cell-item";
    let finalValue: string = "";
    switch (typeof value) {
      case "string":
        finalValue = value;
        className = `${className} c-string`;
        break;
      case "number":
        finalValue = value.toLocaleString();
        className = `${className} c-number`;
        break;
      case "boolean":
        finalValue = value ? "☑" : "☒";
        className = `${className} c-boolean b-${
          value ? "positive" : "negative"
        }`;
        break;
      case "object":
        if (value instanceof Date) {
          finalValue = value.toLocaleString();
          className = `${className} c-date`;
        } else {
          finalValue = value.type;
          className = `${className} c-job`;
        }
        break;
    }
    return <div className={className}>{finalValue}</div>;
  }

  render() {
    const { columnIndex, rowIndex, data, style } = this.props;
    const value = data.data[rowIndex][columnIndex];
    const selected: boolean = Boolean(data.selected[columnIndex]);
    return (
      <div
        data-column-index={columnIndex}
        className={`cell-wrapper ${selected && "cell-selected"}`}
        style={style}
      >
        {this.getComponent(value)}
      </div>
    );
  }
}

export default Cell;
