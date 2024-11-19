import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserResultsService } from './user_results.service';


@Controller('user-results')
export class UserResultsController {
  constructor(private readonly userResultsService: UserResultsService) {}

  @Post()
  create() {
    return this.userResultsService.create();
  }

  @Get()
  findAll() {
    return this.userResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userResultsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string
  ) {
    return this.userResultsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResultsService.remove(+id);
  }
}
