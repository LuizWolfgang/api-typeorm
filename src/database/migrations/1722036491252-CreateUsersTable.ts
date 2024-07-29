import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1722036491252 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( // cada objeto é uma coluna
            new Table({
              name: "users",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "100",
                  isNullable: false, // campo obrigatorio, tem que existir
                },
                {
                  name: "email",
                  type: "varchar",
                  length: "100",
                  isNullable: false,
                  isUnique: true, // tem que ser unico, nao pode existir dois iguais
                },
                {
                  name: "password",
                  type: "varchar",
                  length: "100",
                  isNullable: false,
                },
                {
                  name: "birth_date",
                  type: "Date",
                  isNullable: false,
                },
                {
                  name: "active",
                  type: "boolean",
                  default: true,
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()", // pega a data e hora atual
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users") // deletar tabela
    }

}
