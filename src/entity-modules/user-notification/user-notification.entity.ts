import { Entity, EntityRepositoryType, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { UserNotificationRepository } from './user-notification.repository';

@Entity({ repository: () => UserNotificationRepository })
export class UserNotification extends BaseEntity<
  UserNotification,
  'createdAt' | 'updatedAt'
> {
  [EntityRepositoryType]: UserNotificationRepository;

  @Property({ type: 'string', nullable: false })
  title: string;

  @Property({ type: 'string', nullable: false })
  message: string;

  @Property({ type: 'string', nullable: false })
  @Index()
  userId: string;
}
