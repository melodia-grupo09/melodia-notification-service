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
import { SendNotificationToUserPayloadDTO } from './dtos/send-notification.dto';
import { RemoveDeviceUseCase } from './use-cases/remove-device.use-case';
import { SendNotificationToUserUseCase } from './use-cases/send-notification.use-case';
import { SendTestNotificationUseCase } from './use-cases/test-notification.use-case';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly addDeviceUseCase: AddDeviceUseCase,
    private readonly removeDeviceUseCase: RemoveDeviceUseCase,
    private readonly sendNotificationToUserUseCase: SendNotificationToUserUseCase,
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
  async sendNotification(@Body() body: SendNotificationToUserPayloadDTO) {
    return this.sendNotificationToUserUseCase.execute(body);
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
