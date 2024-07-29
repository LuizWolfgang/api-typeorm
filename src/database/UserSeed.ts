import { IUserInput } from "../app/interfaces/IUser";

export const userSeed: IUserInput = {
    name: "admin",
    email: "admin@gmail.com",
    password: "12345678",
    birth_date: new Date("2000-06-24"),
    active: true
}