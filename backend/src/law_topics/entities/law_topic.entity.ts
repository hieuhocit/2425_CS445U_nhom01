import { ViolationEntity } from 'src/violations/entities/violation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity('law_topics')
export class LawTopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  display: string;

  @OneToMany(() => ViolationEntity, (violation) => violation.lawTopic)
  violations: ViolationEntity[];
}
