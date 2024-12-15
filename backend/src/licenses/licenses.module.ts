import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseEntity } from './entities/license.entity';
import { LicenseRepository } from './license.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LicenseEntity])],
  controllers: [LicensesController],
  providers: [
    LicensesService,
    {
      useClass: LicenseRepository,
      provide: 'ILicenseRepository',
    },
  ],
})
export class LicensesModule {}
