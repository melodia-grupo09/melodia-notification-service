import { Injectable } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';
import { AddDevicePayloadDTO } from '../dtos/add-device.dto';

@Injectable()
export class AddDeviceUseCase {
  constructor(private readonly userDeviceRepository: UserDeviceRepository) {}

  async execute(addDevicePayload: AddDevicePayloadDTO): Promise<void> {
    const { userId, deviceToken } = addDevicePayload;
    this.userDeviceRepository.create({
      userId,
      deviceToken,
    });
    await this.userDeviceRepository.getEntityManager().flush();
  }
}
