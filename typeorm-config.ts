import { db_config } from '@/utils/common-typeorm-config';
import { DataSource } from 'typeorm';
export const config = {
  ...db_config,
  // When this file is excecute, __dirname will point to this service <root> folder.
  // Therefor we will get all entities inside this particular service
  entities: [(__dirname + '/**/*.entity{.ts,.js}').replace(/\\/g, '/')],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'admin.migrations',
};
export const configDS = new DataSource(config);
