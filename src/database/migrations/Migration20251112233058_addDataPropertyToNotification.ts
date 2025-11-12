import { Migration } from '@mikro-orm/migrations';

export class Migration20251112233058_addDataPropertyToNotification extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user_notification" add column "data" jsonb null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_notification" drop column "data";`);
  }
}
