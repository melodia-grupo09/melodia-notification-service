import { Entity, Index, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';

@Entity()
export class UserDevice extends BaseEntity<
  UserDevice,
  'createdAt' | 'updatedAt'
> {
  @Property({ type: 'string', nullable: false })
  @Index()
  @Unique()
  deviceToken: string;

  @Property({ type: 'string', nullable: false })
  @Index()
  userId: string;
}
