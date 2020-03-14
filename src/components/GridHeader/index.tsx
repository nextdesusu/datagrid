import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import Select from "react-select";

import { changeFilterById, setSortersArray } from "../../actions";
import {
  title,
  Filter,
  filterValue,
  QueryStore,
  option,
  sortersArray
} from "../../types";
import GridHeaderCell from "../GridHeaderCell";
import "./GridHeader.css";
import { FixedSizeGrid } from "react-window";

const mapState = (state: QueryStore) => ({
  filters: state.filters,
  sorters: state.sorters
});

const mapDispatch = {
  setFilter: (id: number, filter: Filter) => changeFilterById(id, filter),
  setSorters: (sorters: sortersArray) => setSortersArray(sorters)
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  width: number;
  height: number;
  titles: Array<title>;
};

class GridHeader extends React.Component<Props> {
  onClickHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    //Close all here!
    const target = event.target as Element;
    const inputType = target.getAttribute("data-cell-input-type");
    if (inputType === "bool") {
      const id: number = Number(target.getAttribute("data-cell-input-id"));
      const { setFilter, filters } = this.props;
      const newFilter = filters[id];
      newFilter.value = !newFilter.value;
      setFilter(id, newFilter);
    }
    if (inputType !== null || target.hasAttribute("data-cell-checkbox")) return;
    let stop: number = 0;
    const maxStep: number = 20;
    let div: Element | null | undefined = target;
    while (!div?.hasAttribute("data-cell-parent")) {
      stop += 1;
      if (div?.hasAttribute("data-final-parent")) return;
      div = div?.parentElement;
      if (stop > maxStep) break;
    }
    const id: number = Number(div?.getAttribute("data-cell-id"));
    const { setFilter, filters } = this.props;
    const newFilter: Filter | undefined = filters[id];
    if (newFilter === undefined) return;
    newFilter.switchedOn = !newFilter.switchedOn;
    setFilter(id, newFilter);
  };

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { setFilter, filters } = this.props;
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const componentType = target.getAttribute("data-cell-input-type");
    const id: number = Number(target.getAttribute("data-cell-input-id"));
    const { value } = target;
    const newFilter = filters[id];
    let finalValue: filterValue;
    switch (componentType) {
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
        return;
      case "date":
        finalValue = value.toLowerCase();
        break;
      default:
        return;
    }
    newFilter.value = finalValue;
    setFilter(id, newFilter);
  };

  sortersHanler = (optionsList: any) => {
    if (optionsList === null) return;
    const { setSorters, sorters } = this.props;
    const activeSorters = new Set();
    for (let opt of optionsList) {
      activeSorters.add(opt.value);
    }
    const newSorters: Array<boolean> = sorters.map((_: any, index: number) =>
      activeSorters.has(index)
    );
    setSorters(newSorters);
  };

  get options(): Array<option> {
    const { titles } = this.props;
    return titles.map(({ label }: title, index) => ({
      label,
      value: index
    }));
  }

  render() {
    const { width, height, titles, filters } = this.props;
    const options = this.options;
    const blockWidth: number = width * titles.length;
    return (
      <div
        className="grid-header"
        style={{ width: blockWidth, height: height * 2 }}
        onClick={this.onClickHandler}
        onChange={this.onChangeHandler}
      >
        <div className="grid-header-sort__block">
          <Select
            isMulti
            name="colors"
            options={options}
            onChange={this.sortersHanler}
            placeholder="Sort by..."
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div
          className="grid-header-items"
          style={{ top: height, width: blockWidth, height }}
        >
          {titles.map(
            ({ label, componentType, options }: title, index: number) => {
              const key = `hc: ${index}`;
              const filter = filters[index];
              return (
                <GridHeaderCell
                  key={key}
                  style={{ left: width * index, width, height, top: height }}
                  componentType={componentType}
                  id={index}
                  state={filter}
                  options={options}
                >
                  {label}
                </GridHeaderCell>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default connector(GridHeader);
