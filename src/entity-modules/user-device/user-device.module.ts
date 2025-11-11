import { Module } from '@nestjs/common';
import { UserDeviceRepository } from './user-device.repository';

@Module({
  imports: [UserDeviceModule],
  controllers: [],
  providers: [UserDeviceRepository],
  exports: [UserDeviceRepository],
})
export class UserDeviceModule {}
