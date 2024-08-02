import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Project } from "./Project";

//nessa entidade vamos unir os usuarios e o projetos.
//tabala intermediária, onde vou ter as informaçoes do usuário e do projeto

@Entity("users_projects")
export class UserProject {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int", { nullable: false })
  hours_worked: number;

  @Column("int", { nullable: false })
  id_user: number;

  @Column("int", { nullable: false })
  id_project: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.UserProject) //mandei o usuario para a user Projects
  @JoinColumn({ name: "id_user"}) //coluna que vai ser associada como chave estrangeira
  users: User;


  @ManyToOne(() => Project, (project) => project.UserProject) //mandei o projeto para a user Projects
  @JoinColumn({ name: "id_project"}) //coluna que vai ser associada como chave estrangeira
  projects: Project;
}

