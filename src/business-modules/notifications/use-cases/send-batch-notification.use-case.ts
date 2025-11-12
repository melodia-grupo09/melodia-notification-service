import { Injectable } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';
import { SendNotificationToUsersBatchPayloadDTO } from '../dtos/send-notification.dto';
import { FirebaseNotifications } from 'src/tools-modules/firebase/firebase.notifications';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';

@Injectable()
export class SendNotificationToUsersBatchUseCase {
  constructor(
    private readonly userDeviceRepository: UserDeviceRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
    private readonly firebaseNotifications: FirebaseNotifications,
  ) {}

  async execute(
    notification: SendNotificationToUsersBatchPayloadDTO,
  ): Promise<void> {
    const { userIds, title, body } = notification;

    // Get devices for users
    const userDevices = await this.userDeviceRepository.find({
      userId: { $in: userIds },
    });
    const deviceTokens = userDevices.map((device) => device.deviceToken);

    if (deviceTokens.length === 0) {
      return;
    }

    for (const userId of userIds) {
      this.userNotificationRepository.create({
        title,
        message: body,
        userId,
      });
    }

    const payload = {
      notification: {
        title,
        body,
      },
    };
    const tokensWithErrors = await this.firebaseNotifications.sendToDevices(
      deviceTokens,
      payload,
    );
    if (tokensWithErrors.size > 0) {
      const devicesToRemove = userDevices.filter((device) =>
        tokensWithErrors.has(device.deviceToken),
      );
      for (const device of devicesToRemove) {
        this.userDeviceRepository.getEntityManager().remove(device);
      }
    }
    await this.userDeviceRepository.getEntityManager().flush();
  }
}
