import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import exportAsCSV from "../../exportAsCSV";
import { LSload } from "../../localStorage";
import data from "../../data";
import { titleList, COLUMNS } from "../../consts";
import {
  QueryStore,
  Filter,
  dataValue,
  loadedStore,
  sortersArray
} from "../../types";
import {
  setQuyeryStore,
  changeFilterById,
  setSortPredicate,
  setSortersArray,
  toggleSelectedAction,
  unselectAllAction
} from "../../actions";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
  filters: state.filters,
  sorters: state.sorters,
  sortPredicate: state.sortPredicate,
  selected: state.selected
});

const mapDispatch = {
  setStore: (newStore: QueryStore | null) => setQuyeryStore(newStore),
  setFilter: (id: number, newFilter: Filter) => changeFilterById(id, newFilter),
  setSorters: (newSorters: sortersArray) => setSortersArray(newSorters),
  setPredicate: (pred: boolean) => setSortPredicate(pred),
  toggleSelected: (id: number) => toggleSelectedAction(id),
  unselectAll: () => unselectAllAction()
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const { setStore } = this.props;
    const loaded: loadedStore = LSload();
    if (loaded.succes) {
      setStore(loaded?.store);
    } else {
      const filtersArray = titleList.map(
        ({ componentType, options }, index): Filter => {
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
              filterItem.enumValues = options?.map(() => true);
              break;
            default:
              throw Error(`Unknown component: ${componentType}`);
          }
          return filterItem;
        }
      );
      setStore({
        filters: filtersArray,
        sorters: [],
        sortPredicate: false,
        selected: {}
      });
    }
  }

  isValid(activeFilters: Array<Filter>, row: Array<dataValue>): boolean {
    for (let { type, value, id, enumValues } of activeFilters) {
      const rowItem: any = row[id];
      let valid: boolean = true;
      switch (type) {
        case "text":
          valid = rowItem.toLowerCase().indexOf(value) !== -1;
          break;
        case "enum":
          const ids = enumValues
            ?.filter((enumValue: boolean) => enumValue)
            .map((_: boolean, index: number) => index);
          valid = ids?.indexOf(rowItem.id) !== -1;
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

  getCompareFunction() {
    const upCompare = (a: dataValue, b: dataValue): number => {
      return a > b ? 1 : -1;
    };

    const downCompare = (a: dataValue, b: dataValue): number => {
      return a < b ? 1 : -1;
    };

    const { sortPredicate } = this.props;
    if (sortPredicate) return upCompare;
    return downCompare;
  }

  sortGridData(gridData: Array<Array<dataValue>>, activeSorters: any) {
    const compare = this.getCompareFunction();
    const newData = [...gridData];
    return newData.sort(
      (prevRow: Array<dataValue>, currentRow: Array<dataValue>) => {
        const sum: Array<number> = [];
        for (let srtNumber of activeSorters) {
          sum.push(compare(prevRow[srtNumber], currentRow[srtNumber]));
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

    if (activeFilters.length > 0) {
      handledData = this.filterGridData(data, activeFilters);
    }

    if (sorters.length > 0) {
      handledData = this.sortGridData(handledData, sorters);
    }
    return handledData;
  }

  getCSV = () => {
    const data = this.handledGridData;
    const titlesHandled = titleList.map(title => title.label);
    exportAsCSV("list_of_employes.csv", [titlesHandled, ...data]);
  };

  render() {
    const width: number = 1000;
    const height: number = 400;
    const rowHeight: number = 60;
    const hadledData = this.handledGridData;
    const { toggleSelected, selected, unselectAll } = this.props;
    return (
      <>
        <Header>list of employees</Header>
        <Main>
          <Grid
            data={hadledData}
            titles={titleList}
            width={width}
            height={height}
            rowHeight={rowHeight}
            columnCount={COLUMNS}
            toggleSelected={toggleSelected}
            selected={selected}
            unselectAll={unselectAll}
          />
          <button onClick={this.getCSV} className="button-getCSV">
            get as csv
          </button>
        </Main>
      </>
    );
  }
}

export default connector(App);
