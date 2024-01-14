import { of } from 'rxjs';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

import { DataType, newDb } from 'pg-mem';
export const setupInMemoryDataSource = async (
  config: any,
  schemaNames?: string[],
) => {
  const db = newDb({ autoCreateForeignKeyIndices: true });

  schemaNames.forEach((schemaName) => {
    db.createSchema(schemaName);
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });
  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });
  db.public.registerFunction({
    name: 'version',
    implementation: () =>
      'PostgreSQL 14.2, compiled by Visual C++ build 1914, 64-bit',
  });
  const ds: DataSource = await db.adapters.createTypeormDataSource({
    ...config,
    cache: false,
  });
  await ds.initialize();
  try {
    await ds.synchronize();
  } catch (error) {
    console.log('DB Sync error', error);
  }
  return { ds, db };
};

export const setupTestingDataSource = async (config: any) => {
  console.log('config: ', config);
  const dataSource = new DataSource(config);
  const ds = await dataSource.initialize();
  await ds.synchronize();

  return {
    ds,
    db: {
      backup: () => {
        restore: () => {};
      },
    },
  };
};

export const mockedClientProxy = {
  connect: jest.fn().mockImplementation(() => of({})),
  send: jest.fn().mockImplementation(() => of({})),
};

export class MockUtils {
  static setMock(mock: unknown): any {
    return mock as any;
  }
}
