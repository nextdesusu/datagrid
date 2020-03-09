import * as React from "react";

import "./CellHeader.css";

interface CellHeaderProps {
  width: number;
  height: number;
  leftShift: number;
  children: string;
}

const CellHeader = ({ width, height, leftShift, children }: CellHeaderProps) => {
  return (
    <button
      className="cell-header"
      style={{ width, height, left: leftShift, top: height }}
    >
      {children}
    </button>
  );
};

export default CellHeader;
