import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
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

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly addDeviceUseCase: AddDeviceUseCase,
    private readonly removeDeviceUseCase: RemoveDeviceUseCase,
    private readonly sendNotificationToUserUseCase: SendNotificationToUserUseCase,
    private readonly sendNotificationToUsersBatchUseCase: SendNotificationToUsersBatchUseCase,
    private readonly sendTestNotificationUseCase: SendTestNotificationUseCase,
  ) {}

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
}
