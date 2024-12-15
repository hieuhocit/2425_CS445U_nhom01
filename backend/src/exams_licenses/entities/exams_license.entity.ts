import { ExamEntity } from 'src/exams/entities/exam.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity('exams_licenses')
export class ExamsLicenseEntity {
  @PrimaryColumn()
  exam_id: number;

  @PrimaryColumn()
  license_id: number;

  @ManyToOne(() => ExamEntity, { nullable: false })
  @JoinColumn({ name: 'exam_id' })
  exam: ExamEntity;
}
