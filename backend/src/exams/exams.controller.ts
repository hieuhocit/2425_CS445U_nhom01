import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExamsService } from './exams.service';


@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}


}
