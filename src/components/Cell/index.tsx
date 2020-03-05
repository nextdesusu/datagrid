import * as React from "react";

interface CellProps {
    value: string,
}

export default function Cell({ value }: CellProps) {
    return (
        <input value={value}></input>
    )
}