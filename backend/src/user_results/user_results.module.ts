import { Module } from '@nestjs/common';
import { UserResultsService } from './user_results.service';
import { UserResultsController } from './user_results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResultEntity } from './entities/user_result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserResultEntity])],
  controllers: [UserResultsController],
  providers: [UserResultsService],
})
export class UserResultsModule {}
