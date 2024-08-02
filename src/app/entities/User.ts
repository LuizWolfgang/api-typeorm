import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { UserProject } from "./UserProject";


@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: false, length: 100 })
  name: string;

  @Column("varchar", { nullable: false, length: 100, unique: true })
  email: string;

  @Column("varchar", { nullable: false, length: 100 })
  password: string;

  @Column("date", { nullable: false })
  birth_date: Date;

  @Column("boolean", { nullable: false, default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.users, {
    eager: true //como se fosse o find, garante que os dados sempre carregados de forma completa
  })
  address: Address[];

  @OneToMany(() => UserProject, (userProject) => userProject.users)
  UserProject: UserProject;
}


