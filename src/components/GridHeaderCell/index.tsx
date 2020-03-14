import * as React from "react";
import { Filter } from "../../types";

import "./GridHeaderCell.css";

interface GridHeaderCellProps {
  style?: any;
  componentType: string;
  children: string;
  id: number;
  options?: Array<any>;
  state?: Filter;
}

class GridHeaderCell extends React.Component<GridHeaderCellProps> {
  getInputComponent() {
    const { componentType, state, options, id } = this.props;
    switch (componentType) {
      case "enum":
        const selected = String((state?.value as string) || "0");
        return (
          <select
            data-cell-input-type={componentType}
            data-cell-input-id={id}
            className="cell-header-input"
            value={selected}
            onChange={() => {}}
          >
            {options?.map(({ type, id }, index) => {
              const key = `option ${index}`;
              const value: string = String(id);
              return (
                <option key={key} value={value}>
                  {type}
                </option>
              );
            })}
          </select>
        );
      case "bool":
        const bSelected: boolean = state?.value as boolean;
        return (
          <button
            data-cell-input-type={componentType}
            data-cell-input-id={id}
            className={`cell-button b-${bSelected ? "positive" : "negative"}`}
          >
            {bSelected ? "☑" : "☒"}
          </button>
        );
      default:
        return (
          <input
            data-cell-input-type={componentType}
            data-cell-input-id={id}
            className="cell-header-input"
            defaultValue={(state?.value as string) || ""}
          />
        );
    }
  }

  render() {
    const { style, children, id, state } = this.props;
    return (
      <div
        data-cell-parent
        data-cell-id={id}
        className="cell-header"
        style={style}
      >
        <span>{children}</span>
        <div
          className={`cell-header-inner ${
            state?.switchedOn ? "" : "non-visible"
          }`}
        >
          {this.getInputComponent()}
        </div>
      </div>
    );
  }
}

export default GridHeaderCell;
