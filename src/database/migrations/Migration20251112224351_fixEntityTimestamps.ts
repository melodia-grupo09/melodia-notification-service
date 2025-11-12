import { Migration } from '@mikro-orm/migrations';

export class Migration20251112224351_fixEntityTimestamps extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user_device" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "user_device" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);`,
    );

    this.addSql(
      `alter table "user_notification" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`,
    );
    this.addSql(
      `alter table "user_notification" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "user_device" alter column "created_at" type date using ("created_at"::date);`,
    );
    this.addSql(
      `alter table "user_device" alter column "updated_at" type date using ("updated_at"::date);`,
    );

    this.addSql(
      `alter table "user_notification" alter column "created_at" type date using ("created_at"::date);`,
    );
    this.addSql(
      `alter table "user_notification" alter column "updated_at" type date using ("updated_at"::date);`,
    );
  }
}
