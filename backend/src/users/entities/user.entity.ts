import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  gender: boolean;

  @Column()
  birthday: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
