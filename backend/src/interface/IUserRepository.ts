import { UserGlobal } from 'src/global/users.global';
import { APIRepository } from './RootRepository';

export interface IUserRepository extends APIRepository<UserGlobal> {}
