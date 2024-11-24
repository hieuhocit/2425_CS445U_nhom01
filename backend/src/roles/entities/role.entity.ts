import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  role_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
