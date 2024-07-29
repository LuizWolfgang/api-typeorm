import { AppDataSource } from "../../database/dataSource";
import { User } from "../entities/User";
import { IUserInput } from "../interfaces/IUser";
import { ErrorExtension } from "../utils/ErrorExtension";


export class UserRepository {
    private static usersRepository = AppDataSource.getRepository(User) //acessar somente pela classe

    static async getUsers(): Promise<IUserInput[]> {
        return this.usersRepository.find();
    }

    static async newUser(user: IUserInput): Promise<IUserInput> {
        const createdUser = await this.usersRepository.save(user)
        return createdUser
    }

    static async getUser(id: number): Promise<IUserInput | null> {
        const user = await this.usersRepository.findOneBy({ id })
      
        if(!user) { 
            throw new ErrorExtension(404,  `User ${id} not found`)
        }

        return user
    }

    static async updateUser(id: number, user: IUserInput): Promise<IUserInput | null> {

        const userExists = await this.usersRepository.findOneBy({ id })
      
        if(!userExists) { 
            throw new ErrorExtension(404,  `User ${id} not found`)
        }

        return user as IUserInput
    }


    static async deleteUser(id: number): Promise<string> {

        const userExists = await this.usersRepository.findOneBy({ id })

        if(!userExists) { 
            throw new ErrorExtension(404,  `User ${id} not found`)
        }
        
        await this.usersRepository.delete(id)
   
        return "User was deleted successfully"
    }
}