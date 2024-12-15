import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LicensesService } from './licenses.service';

@Controller('/api')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Get('/licenses')
  async getLicenses() {
    return this.licensesService.findAll();
  }

  @Get('/licenses/:id')
  async getLicensesDetails(@Param('id', ParseIntPipe) id: number) {
    return await this.licensesService.findLicenseDetail(id);
  }

  @Post('/licenses/insert')
  async createLicense() {
    return await this.licensesService.insert();
  }
}
