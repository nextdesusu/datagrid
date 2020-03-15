import Faker from "faker";
import { ROWS, JOBS } from "./consts";

type column = string | number | object | boolean;

const data: Array<Array<column>> = new Array(ROWS);

for (let i: number = 0; i < data.length; i++) {
    data[i] = [
        `${Faker.name.lastName()}, ${Faker.name.firstName()}`,
        Faker.address.country(),
        Faker.phone.phoneNumber(),
        Faker.date.past(),
        Faker.random.number(10),
        JOBS[Faker.random.number(2)],
        Faker.random.boolean()
    ];
}

export default data;
