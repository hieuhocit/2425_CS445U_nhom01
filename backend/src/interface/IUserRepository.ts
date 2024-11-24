import { UserGlobal } from 'src/global/users.global';
import { APIRepository } from './APIRepository';

export interface IUserRepository extends APIRepository<UserGlobal> {
  findUserById(id: number): Promise<UserGlobal>;
}
