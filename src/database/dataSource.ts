import "reflect-metadata"
import { DataSource } from "typeorm"

import User from "../app/entities/User"
import Address from "../app/entities/Address"
import { CreateUsersTable1708439009924 } from "./migrations/1708439009924-CreateUsersTable"
import { CreateAddressTable1708693308270 } from "./migrations/1708693308270-CreateAddressTable"
import { CreateSeedUsersTable1708455815303 } from "./migrations/1708455815303-CreateSeedUsersTable"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "api-typeorm",
    synchronize: true,
    logging: false,
    entities: [User, Address],
    migrations: [
     CreateUsersTable1708439009924,
     CreateSeedUsersTable1708455815303,
     CreateAddressTable1708693308270,
    ],
    subscribers: [],
})
