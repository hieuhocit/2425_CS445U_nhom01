import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnswersService } from './answers.service';



@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

}
