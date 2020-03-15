import * as React from "react";
import { Filter } from "../../types";
import Select from "react-select";

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
            className="cell-header-input cell-header-enum"
            value={selected}
            onChange={() => {}}
            size={1}
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
            placeholder="Search..."
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
        {!state?.switchedOn && <span className="cell-header-search">&#128270;</span>}
      </div>
    );
  }
}

export default GridHeaderCell;
