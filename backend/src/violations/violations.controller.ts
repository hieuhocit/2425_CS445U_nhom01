import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ViolationsService } from './violations.service';

@Controller('/api/law/violations')
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  @Get()
  async getViolations() {
    return this.violationsService.getViolations();
  }

  @Get(':id')
  async getViolationById(@Param('id', ParseIntPipe) id: number) {
    return this.violationsService.getViolationById(id);
  }

  @Post('/insert')
  async addData() {
    await this.violationsService.getViolations();
    return { message: 'Violation inserted successfully' };
  }
}
