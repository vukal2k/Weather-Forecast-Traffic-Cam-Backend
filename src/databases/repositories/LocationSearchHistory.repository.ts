import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LocationSearchHistoryEntity } from '../entities/LocationSearchHistory.entity';

@Injectable()
export class LocationSearchHistoryRepository extends Repository<LocationSearchHistoryEntity> {
  constructor(dataSource: DataSource) {
    super(LocationSearchHistoryEntity, dataSource.createEntityManager());
  }
}
