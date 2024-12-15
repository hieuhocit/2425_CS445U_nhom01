import { Module } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { ViolationsController } from './violations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViolationEntity } from './entities/violation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ViolationEntity])],
  controllers: [ViolationsController],
  providers: [ViolationsService],
})
export class ViolationsModule {}
