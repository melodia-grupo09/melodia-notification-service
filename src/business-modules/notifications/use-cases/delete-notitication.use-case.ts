import { BadRequestException, Injectable } from '@nestjs/common';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';
import { UUID } from 'crypto';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}
  async execute(notificationId: UUID): Promise<void> {
    if (!notificationId) {
      throw new BadRequestException(
        'Notification ID is required to delete a notification.',
      );
    }
    await this.userNotificationRepository.nativeDelete({ id: notificationId });
  }
}
