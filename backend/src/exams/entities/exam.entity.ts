import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('exams')
export class Exam {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;
    
    @Column()
    user_id: number;

    @Column()
    created_at: Date;

    @Column()
    completed_at: Date;
}
