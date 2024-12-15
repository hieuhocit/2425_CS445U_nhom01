import { LicenseGlobal } from 'src/global/license.global';
import { APIRepository } from './RootRepository';

export interface ILicenseRepository extends APIRepository<LicenseGlobal> {
  insertData();
}
