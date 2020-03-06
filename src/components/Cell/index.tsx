import * as React from "react";
import { PureComponent } from "react";
import { GridChildComponentProps } from "react-window";

import "./Cell.css";

class Cell extends PureComponent<GridChildComponentProps> {
    render() {
        const { columnIndex, data, rowIndex, style } = this.props;
        return (
            <div className="cell" style={style}>{columnIndex}: {rowIndex}</div>
        )
    }
}

export default Cell;