import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUsersTable1708439009924 } from "./migrations/1708439009924-CreateUsersTable"
import { CreateAddressTable1708693308270 } from "./migrations/1708693308270-CreateAddressTable"
import { CreateSeedUsersTable1708455815303 } from "./migrations/1708455815303-CreateSeedUsersTable"
import { User } from "../app/entities/User"
import { Address } from "../app/entities/Address"
import { CreateProjectTable1722601830954 } from "./migrations/1722601830954-CreateProjectTable"
import { CreateUserProjectTable1722601845655 } from "./migrations/1722601845655-CreateUserProjectTable"
import { Project } from "../app/entities/Project"
import { UserProject } from "../app/entities/UserProject"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "api-typeorm",
    synchronize: true,
    logging: false,
    entities: [User, Address, Project, UserProject],
    migrations: [
     CreateUsersTable1708439009924,
     CreateSeedUsersTable1708455815303,
     CreateAddressTable1708693308270,
     CreateProjectTable1722601830954,
     CreateUserProjectTable1722601845655
    ],
    subscribers: [],
})

// TODO: sempre criar primeiro as tabelas sem chaves estrangeiras e sem relacionamentos.
// caso isso nao seja feito ocorrerá um erro