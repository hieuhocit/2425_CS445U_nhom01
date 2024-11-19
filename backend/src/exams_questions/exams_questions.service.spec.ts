import { Test, TestingModule } from '@nestjs/testing';
import { ExamsQuestionsService } from './exams_questions.service';

describe('ExamsQuestionsService', () => {
  let service: ExamsQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamsQuestionsService],
    }).compile();

    service = module.get<ExamsQuestionsService>(ExamsQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
