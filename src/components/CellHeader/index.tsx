import * as React from "react";
import { Filter } from "../../types";

import "./CellHeader.css";

interface CellHeaderProps {
  style: any;
  componentType: string;
  children: string;
  id: number;
  options?: Array<any>;
  state?: Filter;
}

const getInputComponent = (
  componentType: string,
  id: number,
  options: undefined | Array<any>,
  state?: Filter
) => {
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
    case "boolean":
      const bSelected: string = state?.value ? "true" : "false";
      return (
        <select
          data-cell-input-type={componentType}
          data-cell-input-id={id}
          className="cell-header-input"
          value={bSelected}
          onChange={() => {}}
        >
          <option value={"false"}>false</option>
          <option value={"true"}>true</option>
        </select>
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
};

const CellHeader = ({
  style,
  children,
  componentType,
  id,
  options,
  state
}: CellHeaderProps) => {
  return (
    <div
      data-cell-parent
      data-cell-id={id}
      className="cell-header"
      style={style}
    >
      <div>
        <label>
          <input data-cell-checkbox type="checkbox" checked={true} />
        </label>
        <span>{children}</span>
      </div>
      <div
        className={`cell-header-inner ${
          state?.switchedOn ? "" : "non-visible"
        }`}
      >
        {getInputComponent(componentType, id, options, state)}
      </div>
    </div>
  );
};

export default CellHeader;
