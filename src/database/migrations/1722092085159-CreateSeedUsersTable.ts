import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../dataSource";
import { User } from "../../app/entities/User";
import { userSeed } from "../UserSeed";

export class CreateSeedUsersTable1722092085159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersRepository = AppDataSource.getRepository(User)
        await usersRepository.save(userSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
