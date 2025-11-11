import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDeviceRepository } from 'src/entity-modules/user-device/user-device.repository';

@Injectable()
export class RemoveDeviceUseCase {
  constructor(private readonly userDeviceRepository: UserDeviceRepository) {}

  async execute(deviceToken: string): Promise<void> {
    const userDevice = await this.userDeviceRepository.findOne({ deviceToken });
    if (!userDevice) {
      throw new NotFoundException('Device not found');
    }
    this.userDeviceRepository.getEntityManager().remove(userDevice);
    await this.userDeviceRepository.getEntityManager().flush();
  }
}
