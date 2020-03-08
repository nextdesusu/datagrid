import Faker from "faker";

const columns = 1500;

export const dataList: Array<Array<string | number | object | boolean>> = new Array(
    columns
);

for (let i: number = 0; i < dataList.length; i++) {
    dataList[i] = [
        Faker.name.jobType(),
        `${Faker.name.lastName()}, ${Faker.name.firstName()}`,
        Faker.address.country(),
        Faker.phone.phoneNumber(),
        Faker.date.past(),
        Faker.random.number(10),
        Faker.random.boolean()
    ];
}

export const titleList: Array<string> = [
    "job type",
    "name",
    "country",
    "phone number",
    "updated",
    "years of expirience",
    "contacted"
];