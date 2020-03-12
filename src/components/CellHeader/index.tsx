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
    case "text":
      return (
        <input
          data-cell-input-type={componentType}
          data-cell-input-id={id}
          className="cell-header-input"
          defaultValue={state?.value as string || ""}
        />
      );
    case "enum":
      return (
        <select
          data-cell-input-type={componentType}
          data-cell-input-id={id}
          className="cell-header-input"
          defaultValue={state?.value as number || 0}
        >
          {options?.map(({ type, id }, index) => {
            const key = `option ${index}`;
            return (
              <option key={key} value={id}>
                {type}
              </option>
            );
          })}
        </select>
      );
    case "boolean":
      return (
        <select
          data-cell-input-type={componentType}
          data-cell-input-id={id}
          className="cell-header-input"
          defaultValue={state?.value as string || ""}
        >
          <option value={"false"}>
            false
          </option>
          <option value={"true"}>
            true
          </option>
        </select>
      );
    default:
      throw Error(`Unknown component type: ${componentType}`);
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
    <div data-cell-parent data-cell-id={id} className="cell-header" style={style}>
      <span>{children}</span>
      <div className="cell-header-inner non-visible">
        {getInputComponent(componentType, id, options, state)}
      </div>
    </div>
  );
};

export default CellHeader;
