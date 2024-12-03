import { QuestionEntity } from 'src/questions/entities/question.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('topics')
export class TopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic_name: string;

  @OneToMany(() => QuestionEntity, (question) => question.topic)
  question: QuestionEntity[];
}
