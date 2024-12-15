import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignTopicEntity } from './entities/sign_topic.entity';
import { Repository } from 'typeorm';
import { ISignTopic } from 'src/data/type';
import { signTopics } from 'src/data/data';
import { SignEntity } from 'src/signs/entities/sign.entity';

@Injectable()
export class SignTopicsService {
    constructor(
        @InjectRepository(SignTopicEntity)
        private signTopicRepository: Repository<SignTopicEntity>,
        @InjectRepository(SignEntity) 
        private signsRepository: Repository<SignEntity>
    ) {}

    async getSignTopics() {
        return this.signTopicRepository.find();
    }

    async getSignsTopicById(id: number) {
        const signTopic = await this.signTopicRepository.findOne({
            where: { id },
            relations: ['signs'] 
        });
        return signTopic;
    }

    async insert() {
        const signData: ISignTopic[] = signTopics
        await this.signTopicRepository.save(signData);
    }

}
