import * as React from "react";
import { connect, ConnectedProps } from "react-redux";

import { dataList, titleList } from "../../data";
import { QueryStore, filter } from '../../types';
import { setNewFilter, initStore } from '../../actions';
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";

const mapState = (state: QueryStore) => ({
    filters: state.filters,
});

const mapDispatch = {
  setFilter: (newFilter: filter) => setNewFilter(newFilter),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const App = (props: PropsFromRedux) => {
  console.log("props", props);
  const width: number = 1000;
  const height: number = 400;
  const rowHeight: number = 60;
  return (
    <>
      <Header>list of employees</Header>
      <button onClick={() => props.setFilter({index: 0, value: 'asd'})}></button>
      <Main>
        <Grid
          data={dataList}
          titles={titleList}
          width={width}
          height={height}
          rowHeight={rowHeight}
        />
      </Main>
    </>
  );
};

export default connector(App);
