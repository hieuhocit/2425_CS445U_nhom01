import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from 'src/interface/IRoleRepository';

@Injectable()
export class RolesService {
  constructor(
    @Inject('IRoleRepository')
    private rolesRepository: IRoleRepository,
  ) {}

  async findRoleAll() {
    return await this.rolesRepository.findAll();
  }

  async findRoleById(id: number) {
    return await this.rolesRepository.findById(id);
  }
}
