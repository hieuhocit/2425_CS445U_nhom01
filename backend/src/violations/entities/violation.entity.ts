import { IBookmark } from 'src/data/type';
import { LawTopicEntity } from 'src/law_topics/entities/law_topic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

@Entity('violations')
export class ViolationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  no: number;

  @Column({ length: 700 })
  violation: string;

  @Column({ length: 255 })
  entities: string;

  @Column({ length: 255 })
  fines: string;

  @Column({ length: 900 })
  additionalPenalties: string;

  @Column({ length: 600 })
  remedial: string;

  @Column({ length: 500 })
  otherPenalties: string;

  @Column({ nullable: true })
  image: string;

  @Column({ length: 255 })
  keyword: string;

  @Column({ type: 'simple-array' })
  relations: ViolationEntity[];

  @Column({ type: 'json', nullable: true })
  bookmarks: IBookmark[];

  @Column()
  violation_type: number;

  @ManyToOne(() => LawTopicEntity, (lawTopic) => lawTopic.violations)
  lawTopic: LawTopicEntity;
}
