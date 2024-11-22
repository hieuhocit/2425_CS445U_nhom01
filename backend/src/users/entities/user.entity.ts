import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  fullName: string

  @Column()
  email: string

  @Column()
  phone_number: string

  @Column()
  birthday: string

  @Column()
  verify_email: string

  @Column()
  role_id: string

  @Column()
  history_id: string

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
