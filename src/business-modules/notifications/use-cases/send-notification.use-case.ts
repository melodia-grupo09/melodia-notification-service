import { Injectable } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';
import { SendNotificationToUserPayloadDTO } from '../dtos/send-notification.dto';
import { FirebaseNotifications } from 'src/tools-modules/firebase/firebase.notifications';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';

@Injectable()
export class SendNotificationToUserUseCase {
  constructor(
    private readonly userDeviceRepository: UserDeviceRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
    private readonly firebaseNotifications: FirebaseNotifications,
  ) {}

  async execute(
    notificationDto: SendNotificationToUserPayloadDTO,
  ): Promise<void> {
    const { userId, title, body } = notificationDto;

    // Get devices for user
    const userDevices = await this.userDeviceRepository.find({ userId });
    const deviceTokens = userDevices.map((device) => device.deviceToken);

    if (deviceTokens.length === 0) {
      return;
    }

    const payload = {
      notification: {
        title,
        body,
      },
    };

    this.userNotificationRepository.create({
      title,
      message: body,
      userId,
    });
    await this.userNotificationRepository.getEntityManager().flush();

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
