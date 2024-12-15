import { Entity, PrimaryColumn } from 'typeorm';

@Entity('questions_licenses')
export class QuestionsLicenseEntity {
  @PrimaryColumn()
  license_id: number;

  @PrimaryColumn()
  question_id: number;
}
