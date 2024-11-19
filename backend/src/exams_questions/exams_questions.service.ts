import { Injectable } from '@nestjs/common';
import { CreateExamsQuestionDto } from './dto/create-exams_question.dto';
import { UpdateExamsQuestionDto } from './dto/update-exams_question.dto';

@Injectable()
export class ExamsQuestionsService {
  create(createExamsQuestionDto: CreateExamsQuestionDto) {
    return 'This action adds a new examsQuestion';
  }

  findAll() {
    return `This action returns all examsQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examsQuestion`;
  }

  update(id: number, updateExamsQuestionDto: UpdateExamsQuestionDto) {
    return `This action updates a #${id} examsQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} examsQuestion`;
  }
}
