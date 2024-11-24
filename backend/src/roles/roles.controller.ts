import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleGlobal } from 'src/global/role.global';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/roles')
  async getRole(): Promise<RoleGlobal[]> {
    return await this.rolesService.findRoleAll();
  }
  @Get('/roles/:id')
  async getRoleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoleGlobal> {
    return await this.rolesService.findRoleById(id);
  }
}
