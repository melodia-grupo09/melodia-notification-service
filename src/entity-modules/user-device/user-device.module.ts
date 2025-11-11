import { Module } from '@nestjs/common';
import { UserDevice } from './user-device.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([UserDevice])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule.forFeature([UserDevice])],
})
export class UserDeviceModule {}
