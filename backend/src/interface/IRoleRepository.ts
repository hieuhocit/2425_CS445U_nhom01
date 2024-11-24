import { APIRepository } from './APIRepository';
import { RoleGlobal } from 'src/global/role.global';

export interface IRoleRepository extends APIRepository<RoleGlobal> {
  getRoles(): Promise<RoleGlobal[]>;
}
