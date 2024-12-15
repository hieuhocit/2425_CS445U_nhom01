import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LawTopicEntity } from './entities/law_topic.entity';
import { Repository } from 'typeorm';
import { ViolationEntity } from 'src/violations/entities/violation.entity';

@Injectable()
export class LawTopicsService {
  constructor(
    @InjectRepository(LawTopicEntity)
    private readonly lawTopicRepository: Repository<LawTopicEntity>,
    @InjectRepository(ViolationEntity)
    private violationsRepository: Repository<ViolationEntity>,
  ) {}

  async findAll() {
    return this.lawTopicRepository.find();
  }

  async findById(id: number) {
    return this.lawTopicRepository.findOne({ where: { id } });
  }

  async findViolations(topicId: number, violationType: number) {
    return this.violationsRepository.find({
      where: {
        lawTopic: { id: topicId },
        violation_type: violationType,
      },
      relations: ['lawTopic'],
    });
  }
}
