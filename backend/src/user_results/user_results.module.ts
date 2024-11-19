import { Module } from '@nestjs/common';
import { UserResultsService } from './user_results.service';
import { UserResultsController } from './user_results.controller';

@Module({
  controllers: [UserResultsController],
  providers: [UserResultsService],
})
export class UserResultsModule {}
