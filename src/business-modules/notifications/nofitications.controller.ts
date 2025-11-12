import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AddDevicePayloadDTO } from './dtos/add-device.dto';
import { AddDeviceUseCase } from './use-cases/add-device.use-case';
import {
  SendNotificationToUserPayloadDTO,
  SendNotificationToUsersBatchPayloadDTO,
} from './dtos/send-notification.dto';
import { RemoveDeviceUseCase } from './use-cases/remove-device.use-case';
import { SendNotificationToUserUseCase } from './use-cases/send-notification.use-case';
import { SendTestNotificationUseCase } from './use-cases/test-notification.use-case';
import { SendNotificationToUsersBatchUseCase } from './use-cases/send-batch-notification.use-case';
import { GetUserNotificationsUseCase } from './use-cases/get-notifications';
import { UserNotificationDTO } from 'src/entity-modules/user-notification/user-notification.dto';
import { DeleteNotificationUseCase } from './use-cases/delete-notitication.use-case';
import { ClearNotificationsUseCase } from './use-cases/clear-notifications.use-case';
import type { UUID } from 'crypto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly getUserNotificationsUseCase: GetUserNotificationsUseCase,
    private readonly addDeviceUseCase: AddDeviceUseCase,
    private readonly removeDeviceUseCase: RemoveDeviceUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly clearNotificationsUseCase: ClearNotificationsUseCase,
    private readonly sendNotificationToUserUseCase: SendNotificationToUserUseCase,
    private readonly sendNotificationToUsersBatchUseCase: SendNotificationToUsersBatchUseCase,
    private readonly sendTestNotificationUseCase: SendTestNotificationUseCase,
  ) {}

  @Get(':userId')
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The ID of the user to retrieve devices for',
  })
  @ApiResponse({
    status: 200,
    description: 'List of user notifications',
    type: [UserNotificationDTO],
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number of notifications to retrieve (default is 20)',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number for pagination (default is 1)',
  })
  async getUserNotifications(
    @Param('userId') userId: string,
    @Query('limit', new DefaultValuePipe(20)) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
  ) {
    return this.getUserNotificationsUseCase.execute(userId, limit, page);
  }

  @Post('device')
  @ApiBody({
    type: AddDevicePayloadDTO,
    description: 'Payload to add a new user device for notifications',
  })
  async addDevice(@Body() body: AddDevicePayloadDTO) {
    return this.addDeviceUseCase.execute(body);
  }

  @Delete('device/:deviceToken')
  @ApiParam({
    name: 'deviceToken',
    type: 'string',
    description: 'The device token to be removed',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeDevice(@Param('deviceToken') deviceToken: string) {
    return this.removeDeviceUseCase.execute(deviceToken);
  }

  @Post('send')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: SendNotificationToUserPayloadDTO,
    description: 'Payload to send a notification to a user',
  })
  async sendNotification(@Body() body: SendNotificationToUserPayloadDTO) {
    return this.sendNotificationToUserUseCase.execute(body);
  }

  @Post('sendBatch')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    type: SendNotificationToUsersBatchPayloadDTO,
    description: 'Payload to send notifications to a batch of users',
  })
  async sendNotificationBatch(
    @Body() body: SendNotificationToUsersBatchPayloadDTO,
  ) {
    return this.sendNotificationToUsersBatchUseCase.execute(body);
  }

  @Post('test/:deviceToken')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'deviceToken',
    type: 'string',
    description: 'The device token to send the test notification to',
  })
  async sendTestNotification(@Param('deviceToken') deviceToken: string) {
    return this.sendTestNotificationUseCase.execute(deviceToken);
  }

  @Delete('delete/:notificationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'notificationId',
    type: 'string',
    description: 'The ID of the notification to be deleted',
  })
  async deleteNotification(
    @Param('notificationId', ParseUUIDPipe) notificationId: UUID,
  ) {
    return this.deleteNotificationUseCase.execute(notificationId);
  }

  @Delete('clear/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'userId',
    type: 'string',
    description: 'The ID of the user whose notifications are to be cleared',
  })
  async clearNotifications(@Param('userId') userId: string) {
    return this.clearNotificationsUseCase.execute(userId);
  }
}
