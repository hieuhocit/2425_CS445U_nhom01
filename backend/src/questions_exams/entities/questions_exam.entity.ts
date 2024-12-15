import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('questions_exams')
export class QuestionsExamEntity {
    @PrimaryColumn()
    question_id: number;

    @PrimaryColumn()
    exam_id: number;
}
