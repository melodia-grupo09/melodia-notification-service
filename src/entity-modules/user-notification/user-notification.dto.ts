import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDTO } from '../base.dto';
import { IsString } from 'class-validator';

export class UserNotificationDTO extends BaseEntityDTO {
  @ApiProperty({
    description: 'Title of the notification',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Message content of the notification',
    type: String,
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'ID of the user to whom the notification is sent',
    type: String,
  })
  @IsString()
  userId: string;
}
