import { EntityRepository } from '@mikro-orm/postgresql';
import { UserNotification } from './user-notification.entity';

export class UserNotificationRepository extends EntityRepository<UserNotification> {}
