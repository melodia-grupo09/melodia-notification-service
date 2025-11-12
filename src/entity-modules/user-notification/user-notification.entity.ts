import { Entity, EntityRepositoryType, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from '../base.entity';
import { UserNotificationRepository } from './user-notification.repository';

@Entity({ repository: () => UserNotificationRepository })
export class UserNotification extends BaseEntity<
  UserNotification,
  'createdAt' | 'updatedAt' | 'data'
> {
  [EntityRepositoryType]: UserNotificationRepository;

  @Property({ type: 'string', nullable: false })
  title: string;

  @Property({ type: 'string', nullable: false })
  message: string;

  @Property({ type: 'json', default: null, nullable: true })
  data: Record<string, any> | null = null;

  @Property({ type: 'string', nullable: false })
  @Index()
  userId: string;
}
