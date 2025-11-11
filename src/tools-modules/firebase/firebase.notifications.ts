import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import {
  Message,
  MulticastMessage,
  Notification,
} from 'firebase-admin/messaging';

@Injectable()
export class FirebaseNotifications {
  constructor(@Inject('FIREBASE_APP') private readonly firebaseApp: app.App) {}

  async sendToDevice(
    deviceToken: string,
    payload: { notification?: Notification; data?: Record<string, string> },
  ): Promise<string> {
    const message: Message = {
      token: deviceToken,
      notification: payload.notification,
      data: payload.data,
    };

    return this.firebaseApp.messaging().send(message);
  }

  // Implements batching internally, because firebase supports max 500 tokens per request
  // Returns a set of tokens that caused errors
  async sendToDevices(
    deviceTokens: string[],
    payload: { notification?: Notification; data?: Record<string, string> },
  ): Promise<Set<string>> {
    const BATCH_SIZE = 500;
    const tokensWithErrors: string[] = [];

    for (let i = 0; i < deviceTokens.length; i += BATCH_SIZE) {
      const chunk = deviceTokens.slice(i, i + BATCH_SIZE);
      const pushNotification: MulticastMessage = {
        tokens: chunk,
        notification: payload.notification,
        data: payload.data,
      };

      const response = await this.firebaseApp
        .messaging()
        .sendEachForMulticast(pushNotification);

      if (response.failureCount > 0) {
        for (const [index, resp] of response.responses.entries()) {
          if (!resp.success) {
            tokensWithErrors.push(chunk[index]);
          }
        }
      }
    }

    return new Set(tokensWithErrors);
  }

  async sendToTopic(
    topic: string,
    payload: { notification?: Notification; data?: Record<string, string> },
  ): Promise<void> {
    const message: Message = {
      topic,
      notification: payload.notification,
      data: payload.data,
    };
    await this.firebaseApp.messaging().send(message);
  }
}
