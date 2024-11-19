import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}
