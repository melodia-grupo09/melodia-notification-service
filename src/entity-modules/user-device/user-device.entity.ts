import {
  Entity,
  EntityRepositoryType,
  Index,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { UserDeviceRepository } from './user-device.repository';

@Entity({ repository: () => UserDeviceRepository })
export class UserDevice extends BaseEntity<
  UserDevice,
  'createdAt' | 'updatedAt'
> {
  [EntityRepositoryType]: UserDeviceRepository;

  @Property({ type: 'string', nullable: false })
  @Index()
  @Unique()
  deviceToken: string;

  @Property({ type: 'string', nullable: false })
  @Index()
  userId: string;
}
