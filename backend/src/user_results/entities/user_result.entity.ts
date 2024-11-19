import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_results')
export class UserResult {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    exam_id: string;

    @Column()
    history_id: string;

    @Column()
    score: number;

    @Column()
    completed_at: Date;
}
