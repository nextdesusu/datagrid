import * as React from "react";

import './GridHeader.css';

interface CellHeaderProps {
    width: number;
    height: number;
    titles: Array<string>
}



const CellHeader = ({ width, height, titles }: CellHeaderProps) => {
    return (
    <div className="grid-header" style={{width: width * titles.length, height: height}}>
        {titles.map((titleText, index) => {
          const CellTtileKey = `CellTtile ${index}`;
          return (
            <div
                key={CellTtileKey}
                className="cell-header"
                style={{width, height, left: width * index}}
            >
                <h3>{titleText}</h3>
            </div>
          )
        })}
    </div>
    )
}

export default CellHeader;