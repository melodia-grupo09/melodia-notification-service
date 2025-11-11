import { Module } from '@nestjs/common';
import { NotificationsController } from './nofitications.controller';
import { FirebaseModule } from 'src/tools-modules/firebase/firebase.module';
import { AddDeviceUseCase } from './use-cases/add-device.use-case';
import { RemoveDeviceUseCase } from './use-cases/remove-device.use-case';
import { SendNotificationToUserUseCase } from './use-cases/send-notification.use-case';
import { UserDeviceModule } from 'src/entity-modules/user-device/user-device.module';
import { SendTestNotificationUseCase } from './use-cases/test-notification.use-case';
import { SendNotificationToUsersBatchUseCase } from './use-cases/send-batch-notification.use-case';

@Module({
  imports: [FirebaseModule, UserDeviceModule],
  controllers: [NotificationsController],
  providers: [
    AddDeviceUseCase,
    RemoveDeviceUseCase,
    SendNotificationToUserUseCase,
    SendNotificationToUsersBatchUseCase,
    SendTestNotificationUseCase,
  ],
})
export class NotificationModule {}
