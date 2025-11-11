import { Injectable } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';
import { FirebaseNotifications } from 'src/tools-modules/firebase/firebase.notifications';

@Injectable()
export class SendTestNotificationUseCase {
  constructor(
    private readonly userDeviceRepository: UserDeviceRepository,
    private readonly firebaseNotifications: FirebaseNotifications,
  ) {}

  async execute(deviceToken: string): Promise<void> {
    const payload = {
      notification: {
        title: 'Test Notification',
        body: 'This is a test notification',
      },
    };
    await this.firebaseNotifications.sendToDevice(deviceToken, payload);
  }
}
