import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./User";

@Entity("address")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: false, length: 100 })
  street: string;

  @Column("varchar", { nullable: false, length: 100 })
  city: string;

  @Column("varchar", { nullable: false, length: 2 })
  state: string;

  @Column("int", { nullable: false })
  id_user: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: "id_user" })
  users: User;
}

export default Address;
