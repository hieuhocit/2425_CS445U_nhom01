import { SignTopicEntity } from 'src/sign_topics/entities/sign_topic.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';

@Entity('signs')
export class SignEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  signType: string;

  @Column({ length: 50 })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 500 })
  detail: string;

  @Column({ length: 255, nullable: true })
  image: string;

  @ManyToOne(() => SignTopicEntity, (signTopic) => signTopic.signs)
  signTopic: SignTopicEntity;

  @Column()
  sign_topic_id: number;
}
