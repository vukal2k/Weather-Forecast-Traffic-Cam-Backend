import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config({ path: './.env' });

export const db_config: TypeOrmModuleOptions & PostgresConnectionOptions = {
  type: process.env.DB_TYPE as any,
  replication: {
    master: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    slaves: [
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as any,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
    ],
  },
  connectTimeoutMS: 2000,
  logging: ['error'],
  entities: [], // this is general, later will be override by each services entities
  migrations: [], // this is general, later will be override by each services migrations
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true, //This will help auto populate entities from path like **/*.entity{.ts,.js}
  synchronize: false, // synchronize=true will auto-create all tables from your entities on connection. false mean we don't want table been override in UAT or PROD
  migrationsRun: false,
};

// console.log(db_config);
export const connectionSource = new DataSource(db_config);
