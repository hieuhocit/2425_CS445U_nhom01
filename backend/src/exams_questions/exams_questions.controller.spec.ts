import { Test, TestingModule } from '@nestjs/testing';
import { ExamsQuestionsController } from './exams_questions.controller';
import { ExamsQuestionsService } from './exams_questions.service';

describe('ExamsQuestionsController', () => {
  let controller: ExamsQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamsQuestionsController],
      providers: [ExamsQuestionsService],
    }).compile();

    controller = module.get<ExamsQuestionsController>(ExamsQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
