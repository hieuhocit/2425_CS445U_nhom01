import { UserGlobal } from "src/global/users.global";
import { AbstractRepository } from "./AbstractRepository";

export interface IUserRepository extends AbstractRepository<UserGlobal> {}