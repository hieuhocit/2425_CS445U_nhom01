import { BaseRepository } from 'src/interface/BaseRepository';
import { ILicenseRepository } from 'src/interface/IlicenseRepository';
import { LicenseEntity } from './entities/license.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ILicense } from 'src/data/type';
import { licenses } from 'src/data/data';

export class LicenseRepository
  extends BaseRepository<LicenseEntity, Repository<LicenseEntity>>
  implements ILicenseRepository
{
  constructor(
    @InjectRepository(LicenseEntity)
    protected override repository: Repository<LicenseEntity>,
  ) {
    super(repository);
  }

  async insertData() {
    const data: ILicense[] = licenses;
    await this.repository.save(data);
  }
}
