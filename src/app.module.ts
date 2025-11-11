import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mikroOrmConfig from 'mikro-orm.config';
import { NotificationModule } from './business-modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
    }),

    // Business modules
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
