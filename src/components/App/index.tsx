import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { LSload } from "../../localStorage";
import data from "../../data";
import { titleList, COLUMNS } from "../../consts";
import { QueryStore, Filter, dataValue, sortersArray } from "../../types";
import { setFiltersArray, setSortersArray } from "../../actions";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
  filters: state.filters,
  sorters: state.sorters
});

const mapDispatch = {
  setFilters: (newArray: Array<Filter>) => setFiltersArray(newArray),
  setSorters: (sorters: sortersArray) => setSortersArray(sorters)
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const { setFilters, setSorters } = this.props;
    const loadedFilters: Array<Filter> | null = LSload();
    if (false) {
    } else {
      const sorters = titleList.map(() => false);
      const filtersArray = titleList.map(
        ({ componentType }, index): Filter => {
          const filterItem: Filter = {
            switchedOn: false,
            value: null,
            type: componentType,
            id: index
          };
          switch (componentType) {
            case "text":
              filterItem.value = "";
              break;
            case "date":
              filterItem.value = "";
              break;
            case "bool":
              filterItem.value = false;
              break;
            case "number":
              filterItem.value = 5;
              break;
            case "enum":
              filterItem.value = 0;
              break;
            default:
              throw Error(`Unknown component: ${componentType}`);
          }
          return filterItem;
        }
      );
      setSorters(sorters);
      setFilters(filtersArray);
    }
  }

  isValid(activeFilters: Array<Filter>, row: Array<dataValue>): boolean {
    for (let { type, value, id } of activeFilters) {
      const rowItem: any = row[id];
      let valid: boolean = true;
      switch (type) {
        case "text":
          valid = rowItem.toLowerCase().indexOf(value) !== -1;
          break;
        case "enum":
          valid = value === rowItem.id;
          break;
        case "date":
          valid =
            rowItem
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1;
          break;
        default:
          valid = value === rowItem;
      }
      if (!valid) return false;
    }
    return true;
  }

  filterGridData(
    gridData: Array<Array<dataValue>>,
    activeFilters: Array<Filter>
  ): Array<Array<dataValue>> {
    return gridData.filter(dataRow => this.isValid(activeFilters, dataRow));
  }

  sortGridData(gridData: Array<Array<dataValue>>, activeSorters: any) {
    //const compareFunction = () => true;
    return gridData.sort(
      (prevRow: Array<dataValue>, currentRow: Array<dataValue>) => {
        const sum: Array<number> = [];
        for (let srtNumber of activeSorters) {
          sum.push(prevRow[srtNumber] > currentRow[srtNumber] ? 1 : -1);
        }
        return sum.reduce((prev: number, current: number) => prev - current, 0);
      }
    );
  }

  get handledGridData(): Array<Array<dataValue>> {
    const { filters, sorters } = this.props;
    let handledData: Array<Array<dataValue>> = data;

    const activeFilters: Array<Filter> = filters.filter(
      filterItem => filterItem.switchedOn
    );

    const activeSorters = new Set();
    sorters.forEach((value: boolean, index: number) => {
      if (value) activeSorters.add(index);
    });

    if (activeFilters.length > 0) {
      handledData = this.filterGridData(data, activeFilters);
      console.log("filtered:", handledData);
    }
    if (activeSorters.size > 0) {
      handledData = this.sortGridData(handledData, activeSorters);
      console.log("sorted", handledData);
    }
    return handledData;
  }

  render() {
    const width: number = 1000;
    const height: number = 400;
    const rowHeight: number = 60;
    return (
      <>
        <Header>list of employees</Header>
        <Main>
          <Grid
            data={this.handledGridData}
            titles={titleList}
            width={width}
            height={height}
            rowHeight={rowHeight}
            columnCount={COLUMNS}
          />
        </Main>
      </>
    );
  }
}

export default connector(App);
