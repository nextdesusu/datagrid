import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { changeFilterById } from "../../actions";
import { title, Filter, filterValue, QueryStore, } from "../../types";
import CellHeader from "../CellHeader";
import "./GridHeader.css";

const mapState = (state: QueryStore) => ({
  filters: state.filters
});

const mapDispatch = {
  setFilter: (id: number, filter: Filter) => changeFilterById(id, filter),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  width: number;
  height: number;
  titles: Array<title>;
}

class GridHeader extends React.Component<Props> {

  onClickHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    //Close all here!
    const target = event.target as Element;
    let div: null | Element = null;
    if (target.hasAttribute("data-cell-parent")) {
      div = target;
    } else if (target.parentElement?.hasAttribute("data-cell-parent")) {
      div = target.parentElement;
    } else {
      return;
    }
    const id: number = Number(div.getAttribute("data-cell-id"));
    const { setFilter, filters } = this.props;
    const newFilter = filters[id];
    newFilter.switchedOn = !newFilter.switchedOn;
    setFilter(id, newFilter);
  }

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFilter, filters } = this.props;
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const componentType = target.getAttribute("data-cell-input-type");
    const id: number = Number(target.getAttribute("data-cell-input-id"));
    const { value } = target;
    const newFilter = filters[id];
    let finalValue: filterValue;
    switch(componentType) {
      case "text":
        finalValue = value.toLowerCase();
        break;
      case "enum":
        finalValue = Number(value);
        break;
      case "number":
        finalValue = Number(value);
        break;
      case "boolean":
        finalValue = value === "true";
        break;
      case "date":
        finalValue = value.toLowerCase();
        break;
      default:
        return;
    }
    newFilter.value = finalValue;
    setFilter(id, newFilter);
  }

  render() {
    const { width, height, titles, filters } = this.props;
    return (
      <div
        className="grid-header"
        style={{ width: width * titles.length, height: height * 2 }}
        onClick={this.onClickHandler}
        onChange={this.onChangeHandler}
      >
        {titles.map(({label, componentType, options }, index) => {
          const CellTitleKey = `CellTitle: ${index}`;
          const fState = filters[index];
          return (
            <CellHeader
              style={{width, height, left: index * width, top: height}}
              id={index}
              key={CellTitleKey}
              componentType={componentType}
              options={options}
              state={fState}
            >
              {label}
            </CellHeader>
          );
        })}
      </div>
    );
  }
}

export default connector(GridHeader);
