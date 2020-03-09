import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import data from "../../data";
import { titleList } from "../../consts";
import { QueryStore, QSType } from "../../types";
import { setFiltersArray } from "../../actions";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
  filters: state.filters
});

const mapDispatch = {
  setFilters: (newArray: Array<QSType>) => setFiltersArray(newArray),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    const { setFilters } = this.props;
    const size = data[0].length;
    setFilters(new Array(size).fill(""));
  }

  render() {
    const { setFilters, filters } = this.props;
    const width: number = 1000;
    const height: number = 400;
    const rowHeight: number = 60;
    return (
      <>
        <Header>list of employees</Header>
        <Main>
          <Grid
            filters={filters}
            setFilters={setFilters}
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
