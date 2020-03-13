import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { LSload } from "../../localStorage";
import data from "../../data";
import { titleList, COLUMNS } from "../../consts";
import { QueryStore, Filter, dataValue } from "../../types";
import { setFiltersArray } from "../../actions";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
  filters: state.filters
});

const mapDispatch = {
  setFilters: (newArray: Array<Filter>) => setFiltersArray(newArray)
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const { setFilters } = this.props;
    const loadedFilters: Array<Filter> | null = LSload();
    console.log(loadedFilters.length, '===', titleList.length)
    if (loadedFilters?.length === titleList.length) {
      console.log("loading...")
      setFilters(loadedFilters);
    } else {
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
            case "boolean":
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
          valid = rowItem.toString().toLowerCase().indexOf(value) !== -1;
          break;
        default:
          valid = value === rowItem;
      }
      if (!valid) return false;
    }
    return true;
  }

  get filteredGridData(): Array<Array<dataValue>> {
    const { filters } = this.props;
    const activeFilters = filters.filter(filterItem => filterItem.switchedOn);
    if (activeFilters.length === 0) return data;
    return data.filter(dataRow => this.isValid(activeFilters, dataRow));
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
            data={this.filteredGridData}
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
