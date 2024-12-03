import { ExamEntity } from 'src/exams/entities/exam.entity';
import { TopicEntity } from 'src/topics/entities/topic.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  answer_a: string;

  @Column({ nullable: true })
  answer_b: string;

  @Column({ nullable: true })
  answer_c: string;

  @Column({ nullable: true })
  answer_d: string;

  @Column({ nullable: true, type: 'char', length: 1 })
  correct_answer: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column()
  exam_id: number;

  @ManyToOne(() => ExamEntity, (exam) => exam.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exam_id' })
  exam: ExamEntity;


  @ManyToOne(() => TopicEntity, (topic) => topic.question)
  topic: TopicEntity;
}
