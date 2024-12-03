import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/global/enum.global';

export const IS_PUBLIC_KEY = 'public';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
