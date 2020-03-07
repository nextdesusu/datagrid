import * as React from "react";
import Header from "../Header";
import Main from "../Main";
import Grid from "../Grid";
import Faker from "faker";

const dataList: Array<Array<string | number | object | boolean>> = new Array(1300);
for (let i: number = 0; i < dataList.length; i++) {
    dataList[i] = [
        Faker.name.jobType(),
        `${Faker.name.lastName()}, ${Faker.name.firstName()}`,
        Faker.address.country(),
        Faker.phone.phoneNumber(),
        Faker.date.past(),
        Faker.random.number(10),
        Faker.random.boolean(),
    ];
}

const titleList: Array<string> = ["job type", "name", "country", "phone number", "updated", "years of expirience", "contacted"]

const App = () => {
    return (
        <>
            <Header>list of employees</Header>
            <Main>
                <Grid
                    data={dataList}
                    titles={titleList}
                    width={1000}
                    height={400}
                    rowHeight={60}
                />
            </Main>
        </>
    )
}
export default App;