import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ExamsService } from './exams.service';


@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  
  

}
