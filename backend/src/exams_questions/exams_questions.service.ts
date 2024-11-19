import { Injectable } from '@nestjs/common';


@Injectable()
export class ExamsQuestionsService {
  create() {
    return 'This action adds a new examsQuestion';
  }

  findAll() {
    return `This action returns all examsQuestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} examsQuestion`;
  }

  update(id: number) {
    return `This action updates a #${id} examsQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} examsQuestion`;
  }
}
