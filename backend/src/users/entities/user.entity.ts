import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { AccountEntity } from 'src/accounts/entities/account.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  avatar: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToOne(() => AccountEntity, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
