import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../utils/base.entity';

@Entity({ name: 'location-search-history' })
export class LocationSearchHistoryEntity extends BaseEntity {
  @Column({ type: 'timestamp with time zone', nullable: false })
  dateTime: Date | string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  location: string;
}
