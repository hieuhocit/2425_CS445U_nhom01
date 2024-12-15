import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('/api')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  // @Get('/exams')
  // async getExams(
  //   @Query('licenseId') licenseId: number
  // ) {
  //   return await this.examsService.findAll();
  // }

  @Get('/exams')
  async getExamWithLicenseId(
    @Query('licenseId') licenseId: number,
  ) {
    return await this.examsService.getExamWithLicenseId(licenseId);
  }

  @Get('/exams/:id')
  async getExamById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.examsService.findById(id);
  }

  @Post('/exams/add')
  async addExam(@Body() examDto: CreateExamDto) {
    return await this.examsService.create(examDto);
  }

  @Put('/exams/update/:id')
  async updateExam(
    @Param('id', ParseIntPipe) id: number,
    @Body() examDto: CreateExamDto,
  ) {
    return await this.examsService.update(id, examDto);
  }

  @Delete('/exams/delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.examsService.delete(id);
  }

  @Post('/exams/insert')
  async insert() {
    await this.examsService.insert();
    return 'successfully inserted'
  }


  @Post('/exams/seed')
  async addLicenseToExam() {
    await this.examsService.addLicenseToExam();
    return { message: 'Insert successfully' };
  }

 
}
