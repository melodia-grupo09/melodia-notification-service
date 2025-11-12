import { Injectable } from '@nestjs/common';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';
import { UserNotificationDTO } from 'src/entity-modules/user-notification/user-notification.dto';

@Injectable()
export class GetUserNotificationsUseCase {
  constructor(
    private readonly userNotificationRepository: UserNotificationRepository,
  ) {}

  async execute(
    clientId: string,
    limit: number = 20,
    page: number = 1,
  ): Promise<UserNotificationDTO[]> {
    const offset = (page - 1) * limit;
    const notifications = await this.userNotificationRepository.find(
      { userId: clientId },
      {
        limit,
        offset,
      },
    );
    return notifications.map((notification) =>
      notification.toDTO(UserNotificationDTO),
    );
  }
}
