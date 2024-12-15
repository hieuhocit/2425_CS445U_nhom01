import { SignEntity } from 'src/signs/entities/sign.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity('sign_topics')
export class SignTopicEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  signType: string;

  @Column({ length: 255 })
  display: string;

  @Column({ length: 550 })
  subTitle: string;

  @OneToMany(() => SignEntity, (sign) => sign.signTopic)
  signs: SignEntity[];
}
