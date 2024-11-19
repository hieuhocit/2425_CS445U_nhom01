import { Test, TestingModule } from '@nestjs/testing';
import { UserResultsController } from './user_results.controller';
import { UserResultsService } from './user_results.service';

describe('UserResultsController', () => {
  let controller: UserResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResultsController],
      providers: [UserResultsService],
    }).compile();

    controller = module.get<UserResultsController>(UserResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
