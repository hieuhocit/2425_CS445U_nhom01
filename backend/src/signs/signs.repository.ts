import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/interface/BaseRepository';
import { SignEntity } from './entities/sign.entity';
import { ISignRepository } from 'src/interface/ISignRepository';

@Injectable()
export class SignRepository
  extends BaseRepository<SignEntity, Repository<SignEntity>>
  implements ISignRepository
{
  constructor(
    @InjectRepository(SignEntity)
    private signRepository: Repository<SignEntity>,
  ) {
    super(signRepository);
  }
}
