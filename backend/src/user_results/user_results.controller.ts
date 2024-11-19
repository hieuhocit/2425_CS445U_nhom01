import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserResultsService } from './user_results.service';


@Controller('user-results')
export class UserResultsController {
  constructor(private readonly userResultsService: UserResultsService) {}

 
}
