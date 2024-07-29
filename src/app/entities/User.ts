import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
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
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

