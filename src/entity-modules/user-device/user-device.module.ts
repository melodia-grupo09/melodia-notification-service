import { Module } from '@nestjs/common';
import { NotificationsController } from 'src/business-modules/notifications/nofitications.controller';
import { UserDeviceRepository } from './user-device.repository';

@Module({
  imports: [UserDeviceModule],
  controllers: [],
  providers: [UserDeviceRepository],
  exports: [UserDeviceRepository],
})
export class UserDeviceModule { }
