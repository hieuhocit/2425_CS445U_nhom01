import { LicenseEntity } from 'src/licenses/entities/license.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from 'typeorm';

@Entity('questions')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column({ length: 500 })
  text: string;

  @Column({ length: 500 })
  tip: string;

  @Column()
  required: boolean;

  @Column()
  topic_id: number;

  @ManyToMany(() => LicenseEntity, (license) => license.questions)
  licenses: LicenseEntity[];
}
