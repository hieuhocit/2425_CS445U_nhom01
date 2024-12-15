import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SignsService } from './signs.service';

@Controller('/api')
export class SignsController {
  constructor(private readonly signsService: SignsService) {}

  @Get('/sign/signs')
  async getSignByTopcId(@Query('topicId') topicId: number) {
    return this.signsService.getSignByTopcId(topicId);
  }

  @Get('/sign/signs/:id')
  async getSignById(@Param('id', ParseIntPipe) id: number) {
    return this.signsService.getSignById(id);
  }

  @Post('/insert2')
  async insertSign() {
    return this.signsService.insertSign();
  }
}
