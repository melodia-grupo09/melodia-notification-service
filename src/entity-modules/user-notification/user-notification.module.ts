import { Module } from '@nestjs/common';
import { UserNotification } from './user-notification.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([UserNotification])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule.forFeature([UserNotification])],
})
export class UserNotificationModule {}
