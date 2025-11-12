import { Migration } from '@mikro-orm/migrations';

export class Migration20251112155237_addUserNotificationEntity extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user_notification" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "title" varchar(255) not null, "message" varchar(255) not null, "user_id" varchar(255) not null, constraint "user_notification_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "user_notification_user_id_index" on "user_notification" ("user_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_notification" cascade;`);
  }
}
