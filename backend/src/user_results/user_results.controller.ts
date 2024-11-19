import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserResultsService } from './user_results.service';
import { CreateUserResultDto } from './dto/create-user_result.dto';
import { UpdateUserResultDto } from './dto/update-user_result.dto';

@Controller('user-results')
export class UserResultsController {
  constructor(private readonly userResultsService: UserResultsService) {}

  @Post()
  create(@Body() createUserResultDto: CreateUserResultDto) {
    return this.userResultsService.create(createUserResultDto);
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
  update(@Param('id') id: string, @Body() updateUserResultDto: UpdateUserResultDto) {
    return this.userResultsService.update(+id, updateUserResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userResultsService.remove(+id);
  }
}
