import * as React from "react";
import Header from '../Header';
import Main from '../Main';
import Grid from '../Grid';


const App = () => {
    return (
        <>
            <Header>Hello</Header>
            <Main>
                <Grid data={[{name: "kek"}, {name: "kek"}]} columnCount={7} width={800} height={400} rowHeight={60} />
            </Main>
        </>
    )
}
export default App;