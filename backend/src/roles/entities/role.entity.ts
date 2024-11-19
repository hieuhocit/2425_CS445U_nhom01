import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  role_name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
