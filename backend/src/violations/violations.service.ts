import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViolationEntity } from './entities/violation.entity';
import { Repository } from 'typeorm';
import { IViolation } from 'src/data/type';
import { violations } from 'src/data/data';

@Injectable()
export class ViolationsService {
  constructor(
    @InjectRepository(ViolationEntity)
    private violationRepository: Repository<ViolationEntity>,
  ) {}

  async getViolations() {
    return this.violationRepository.find();
  }

  async getViolationById(id: number) {
    const violation = await this.violationRepository.findOne({ where: { id } });

    if (violation && violation.relations.length > 0) {
      const relations = await this.violationRepository.findByIds(
        violation.relations,
      );
      violation.relations = relations;
    }
    return violation;
  }

  async insert() {
    const violationData: IViolation[] = violations.map((violation) => ({
      ...violation,
      lawTopic: { id: violation.law_topic_id },
      bookmarks: violation.bookmarks,
    }));
    // await this.violationRepository.save(violationData);
    return violationData;
  }
}
