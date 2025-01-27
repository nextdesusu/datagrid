import * as React from "react";
import { Filter } from "../../types";

import "./GridHeaderCell.css";

interface GridHeaderCellProps {
  style?: any;
  componentType: string;
  children: string;
  id: number;
  options?: Array<any>;
  state?: any;
}

class GridHeaderCell extends React.Component<GridHeaderCellProps> {
  getInputComponent() {
    const { componentType, state, options, id } = this.props;
    switch (componentType) {
      case "enum":
        const enumValues: Array<boolean> = state?.enumValues || [];
        return (
          <select
            data-cell-input-type={componentType}
            data-cell-input-id={id}
            className="cell-header-input cell-header-enum"
            defaultValue={enumValues
              .filter((item: any) => item)
              .map((item: any, index: number) => String(index))}
            onChange={() => {}}
            multiple
          >
            {options?.map(({ type, id }, index) => {
              const key = `option ${index}`;
              const value: string = String(id);
              return (
                <option
                  data-cell-option={id}
                  key={key}
                  value={value}
                  className={`${
                    enumValues[id] ? "option-selected" : ""
                  }`}
                >
                  {type}
                  {enumValues[id] && "☆"}
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
        {!state?.switchedOn && (
          <span className="cell-header-search">&#128270;</span>
        )}
      </div>
    );
  }
}

export default GridHeaderCell;
