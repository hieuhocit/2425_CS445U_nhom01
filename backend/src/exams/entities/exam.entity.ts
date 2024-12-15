import { ExamsLicenseEntity } from 'src/exams_licenses/entities/exams_license.entity';
import { LicenseEntity } from 'src/licenses/entities/license.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity('exams')
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @OneToMany(() => ExamsLicenseEntity, (examsLicenses) => examsLicenses.exam)
  exams_licenses: ExamsLicenseEntity[];

  @ManyToMany(() => LicenseEntity, (licenses) => licenses.exams)
  @JoinTable({
    name: 'exams_licenses',
    joinColumns: [{ name: 'exam_id', referencedColumnName: 'id'}],
    inverseJoinColumns: [{ name: 'license_id', referencedColumnName: 'id'}],
  })
  licenses: LicenseEntity[];
}
