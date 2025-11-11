import { Migration } from '@mikro-orm/migrations';

export class Migration20251111162952_addUserDeviceEntity extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_device" ("id" uuid not null, "created_at" date not null, "updated_at" date not null, "device_token" varchar(255) not null, "user_id" varchar(255) not null, constraint "user_device_pkey" primary key ("id"));`);
    this.addSql(`create index "user_device_device_token_index" on "user_device" ("device_token");`);
    this.addSql(`alter table "user_device" add constraint "user_device_device_token_unique" unique ("device_token");`);
    this.addSql(`create index "user_device_user_id_index" on "user_device" ("user_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_device" cascade;`);
  }

}
