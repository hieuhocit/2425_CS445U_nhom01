import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsExamEntity } from './entities/questions_exam.entity';
import { Repository } from 'typeorm';
import { questions } from 'src/data/data';
import { IQuestion } from 'src/data/type';

@Injectable()
export class QuestionsExamsService {
  constructor(
    @InjectRepository(QuestionsExamEntity)
    private questionsExamRepository: Repository<QuestionsExamEntity>,
  ) {}

  async insertQE() {
    const qeData: IQuestion[] = questions;
    for (const data in qeData) {
      await this.questionsExamRepository.save(qeData.map(data => ({
        question_id: data.id,
        exam_id: data.exam_ids[0], // Assuming exam_ids is an array of numbers
      })));
    }  
    return { message: 'Data seeded successfully' };   
  }

}
