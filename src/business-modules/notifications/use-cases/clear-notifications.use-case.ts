import { BadRequestException, Injectable } from '@nestjs/common';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';

@Injectable()
export class ClearNotificationsUseCase {
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}
  async execute(userId: string): Promise<void> {
    if (!userId) {
      throw new BadRequestException(
        'User ID is required to clear notifications.',
      );
    }
    await this.userNotificationRepository.nativeDelete({ userId });
  }
}
