import { Inject, Injectable } from '@nestjs/common';
import { ILicenseRepository } from 'src/interface/IlicenseRepository';

@Injectable()
export class LicensesService {
  constructor(
    @Inject('ILicenseRepository')
    private readonly licenseRepository: ILicenseRepository,
  ) {}

  async findAll() {
    return await this.licenseRepository.findAll();
  }

  async findLicenseDetail(id: number) {
    return await this.licenseRepository.findById(id);
  }

  async insert() {
    return await this.licenseRepository.insertData();
  }
  
}
