import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import mikroOrmConfig from 'mikro-orm.config';
import { NotificationModule } from './business-modules/notifications/notifications.module';
import { LoggerMiddleware } from './framework/middlewares/logger.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
