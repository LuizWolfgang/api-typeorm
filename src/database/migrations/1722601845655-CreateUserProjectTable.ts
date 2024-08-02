import { MigrationInterface, QueryRunner, Table } from "typeorm";

// tabala intermediária, onde vou ter as informaçoes do usuário e do projeto
export class CreateUserProjectTable1722601845655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "users_projects",
            columns: [
              {
                name: "id", // refencia no indice
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "hours_worked",
                type: "int",
                default: 0,
                isNullable: false,
              },
              {
                name: "id_user",
                type: "int",
                isNullable: false,
              },
              {
                name: "id_project",
                type: "int",
                isNullable: false,
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
              {
                name: "updated_at",
                type: "timestamp",
                default: "now()",
              },
            ],
            foreignKeys: [
              {
                columnNames: ["id_user"],
                referencedTableName: "users", // id_user conectando a chave primaria em users
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
              {
                columnNames: ["id_project"], // id_user conectando a chave primaria em projects
                referencedTableName: "projects",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
            ],
            indices: [
              {
                columnNames: ["id"], //informando a chave primaria, evitando erro de refencia com as chaves estrangeiras
              },
            ],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_projects");
      }
    }
    

    //chave primaria - identificador unico
    //chave estrangeira - é um campo em uma tabela que estabelece vinculo com a chave primária