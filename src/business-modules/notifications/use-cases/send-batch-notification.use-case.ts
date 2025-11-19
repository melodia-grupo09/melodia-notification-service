import { Injectable, Logger } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';
import { SendNotificationToUsersBatchPayloadDTO } from '../dtos/send-notification.dto';
import { FirebaseNotifications } from 'src/tools-modules/firebase/firebase.notifications';
import { UserNotificationRepository } from 'src/entity-modules/user-notification/user-notification.repository';
import { UserDevice } from 'src/entity-modules/user-device/user-device.entity';

@Injectable()
export class SendNotificationToUsersBatchUseCase {
  private readonly logger = new Logger(
    SendNotificationToUsersBatchUseCase.name,
  );
  constructor(
    private readonly userDeviceRepository: UserDeviceRepository,
    private readonly userNotificationRepository: UserNotificationRepository,
    private readonly firebaseNotifications: FirebaseNotifications,
  ) {}

  async execute(
    notification: SendNotificationToUsersBatchPayloadDTO,
  ): Promise<void> {
    const { userIds, title, body, data } = notification;

    for (const userId of userIds) {
      this.userNotificationRepository.create({
        title,
        message: body,
        data: data,
        userId,
      });
    }
    await this.userNotificationRepository.getEntityManager().flush();

    // Get devices for users
    const userDevices = await this.userDeviceRepository.find({
      userId: { $in: userIds },
    });

    const devicesByUseId: Map<string, UserDevice[]> = new Map();
    for (const device of userDevices) {
      if (!devicesByUseId.has(device.userId)) {
        devicesByUseId.set(device.userId, []);
      }
      devicesByUseId.get(device.userId)!.push(device);
    }

    for (const userId of userIds) {
      if (!devicesByUseId.has(userId)) {
        this.logger.warn(
          `No devices found for user ${userId}. Notification not sent.`,
        );
      }
    }

    this.logger.log(
      `Sending notification to ${userIds.length} users. Title: ${title}, Body: ${body}, data: ${JSON.stringify(data)}`,
    );

    const deviceTokens = userDevices.map((device) => device.deviceToken);
    if (deviceTokens.length === 0) {
      return;
    }

    const payload = {
      notification: {
        title,
        body,
      },
      data,
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
