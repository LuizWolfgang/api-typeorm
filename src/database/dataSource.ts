import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUsersTable1722036491252 } from "./migrations/1722036491252-CreateUsersTable"
import { CreateSeedUsersTable1722092085159 } from "./migrations/1722092085159-CreateSeedUsersTable"
import { User } from "../app/entities/User"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "api-typeorm",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [
        CreateUsersTable1722036491252,
        CreateSeedUsersTable1722092085159
    ],
    subscribers: [],
})
