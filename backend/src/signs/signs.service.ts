import { Injectable } from '@nestjs/common';
import { signs } from 'src/data/data';
import { ISign } from 'src/data/type';
import { Repository } from 'typeorm';
import { SignEntity } from './entities/sign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignTopicEntity } from 'src/sign_topics/entities/sign_topic.entity';

@Injectable()
export class SignsService {
  constructor(
    @InjectRepository(SignEntity)
    private signRepository: Repository<SignEntity>,
    @InjectRepository(SignTopicEntity)
    private signTopicRepository: Repository<SignTopicEntity>,
    
  ) {}

  async getSignByTopcId(topicId: number) {
    return await this.signRepository.find({
      where: { 
        signTopic: { id: topicId }
      }
    });
  }

  async getSignById(id: number) {
    const sign = await this.signRepository.findOne({
      where: { id },
      relations: ['signTopic'],
    });
    delete sign.sign_topic_id
    return sign
  }


  async insertSign() {
    const signsData: ISign[] = signs.map((sign) => ({
      ...sign,
      signTopic: { id: sign.sign_topic_id },
    }));
    await this.signRepository.save(signsData);
  }
}
