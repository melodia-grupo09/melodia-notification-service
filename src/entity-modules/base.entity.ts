import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { ClassCtor, toDTO } from 'src/utils/dto.utils';
import { BaseEntity as BE } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BaseEntity<
  Entity extends object,
  Optional extends keyof Entity = never,
> extends BE {
  [OptionalProps]?: Optional;

  @PrimaryKey({ type: 'uuid' })
  id = randomUUID();

  @Property({ type: 'datetime' })
  createdAt = new Date();

  @Property({ type: 'datetime', onUpdate: () => new Date() })
  updatedAt = new Date();

  toDTO<Dto extends object>(dtoClass: ClassCtor<Dto>): Dto {
    return toDTO(this, dtoClass);
  }
}
