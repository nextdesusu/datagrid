import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import data from "../../data";
import { titleList } from "../../consts";
import { QueryStore, Filter,  } from "../../types";
import { setFiltersArray } from "../../actions";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
  filters: state.filters
});

const mapDispatch = {
  setFilters: (newArray: Array<Filter>) => setFiltersArray(newArray),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const { setFilters } = this.props;
    const filtersArray = titleList.map(({ componentType }): Filter => {
      switch (componentType) {
        case "text":
          return { switchedOn: false, value: "" }
        case "enum":
          return { switchedOn: false, value: 0 }
        case "boolean":
          return { switchedOn: false, value: false }
        default:
          throw Error(`Unknown type! ${componentType}`);
      }
    });
    setFilters(filtersArray);
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
            data={data}
            titles={titleList}
            width={width}
            height={height}
            rowHeight={rowHeight}
          />
        </Main>
      </>
    );
  }
}

export default connector(App);
