import { Test, TestingModule } from '@nestjs/testing';
import { UserResultsService } from './user_results.service';

describe('UserResultsService', () => {
  let service: UserResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResultsService],
    }).compile();

    service = module.get<UserResultsService>(UserResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
