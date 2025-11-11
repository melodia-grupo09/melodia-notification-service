import { EntityRepository } from '@mikro-orm/postgresql';
import { UserDevice } from './user-device.entity';

export class UserDeviceRepository extends EntityRepository<UserDevice> {}
