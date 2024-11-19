import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('history')
export class History {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user_id: number;

    @Column()
    exam_id: string;

    @Column()
    user_result_id: number;

    @Column()
    score: number;

    @Column()
    completed_at: Date;
}
