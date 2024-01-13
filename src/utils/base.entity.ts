import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('identity', { name: 'id' })
  id?: number;

  @CreateDateColumn({
    name: 'created',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created?: Date;

  @Column({ name: 'created_by', type: 'varchar', length: 300, nullable: true })
  createdBy?: string;

  @UpdateDateColumn({
    name: 'last_updated',
    type: 'timestamptz',
    nullable: true,
  })
  lastUpdated?: Date;

  @Column({
    name: 'last_updated_by',
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  lastUpdatedBy?: string;

  @DeleteDateColumn({
    name: 'deleted_date',
    type: 'timestamptz',
    nullable: true,
  })
  deletedDate?: Date;
}
