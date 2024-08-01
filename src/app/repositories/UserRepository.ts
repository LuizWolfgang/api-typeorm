/* eslint-disable @typescript-eslint/no-unused-vars */
import { ValidationErrorItem } from "joi";
import { AppDataSource } from "../../database/dataSource";
import { compare, hash } from "bcryptjs";

import { ErrorExtension } from "../utils/ErrorExtension";
import userSchemaValidation from "../validations/userSchemaValidation";
import { IUserInput, IUserOutput } from "../interfaces/IUser";

import { ILogin } from "../interfaces/ILogin";
import Auth from "../utils/Auth";
import { User } from "../entities/User";




export class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User);

    static async getUsers(): Promise<IUserOutput[]> {
        //SELECT * FROM USERS;
        const users = await this.usersRepository.find();

        //busca as relacoes de endereço
        // const users = await this.usersRepository.find({
        //     relations: { address: true}
        // });

        return users.map(({ password, ...user }) => user);
    }

    static async newUser(user: IUserInput): Promise<IUserOutput> {
        const { error } = userSchemaValidation.validate(user, {
            abortEarly: false, // mostrar todos os erros, nao somente um.
        });
        if (error) {
            const validationErrors = error.details.map(
                (detail: ValidationErrorItem) => detail.message,
            );
            throw new ErrorExtension(400, validationErrors.join(","));
        }

        const hashedPassword = await hash(user.password as string, 10);

        user.password = hashedPassword;

        const createdUser = await this.usersRepository.save(user);

        const { password, ...userReturned } = createdUser;

        return userReturned;
    }

    static async getUser(id: number): Promise<IUserOutput | null> {
        //SELECT * FROM USERS WHERE id = id
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new ErrorExtension(404, "User not found!");
        }

        const { password, ...userReturned } = user;

        return userReturned;
    }

    static async updateUser(id: number, user: IUserInput): Promise<IUserInput | null> {

        const userExists = await this.usersRepository.findOneBy({ id })

        if (!userExists) {
            throw new ErrorExtension(404, `User ${id} not found`)
        }

        if (user.password) {
            const hashedPassword = await hash(user.password, 10);
            user.password = hashedPassword;
        }

        const { password, ...userReturned } = user;

        return userReturned as IUserInput
    }

    static async deleteUser(id: number): Promise<string> {
        const userExists = await this.usersRepository.findOneBy({ id });

        if (!userExists) {
            throw new ErrorExtension(404, "User not found!");
        }

        await this.usersRepository.delete(id);

        return "User was deleted!";
    }

    static async getUserEmail(email: string): Promise<IUserOutput | null> {
        return this.usersRepository.findOneBy({ email });

    }

    static async auth(loginData: ILogin): Promise<string> {
        const { email, password } = loginData;

        if (!email || !password) throw new ErrorExtension(401, "Missing data");

        const user = await this.getUserEmail(email);
        if (!user?.password) {
            throw new ErrorExtension(401, "E-mail or password wrong!");
        }
        else {

            const passwordVerification = await compare(
                password,
                user.password,
            );
            console.log(passwordVerification);
            if (!passwordVerification) {
                throw new ErrorExtension(401, "E-mail or password wrong!");
            }
        }

        const payload = {
            name: user.name,
            email: user.email,
        };

        const auth = new Auth();
        const token = auth.JwtGenerator(payload);
        return token;
    }
}

