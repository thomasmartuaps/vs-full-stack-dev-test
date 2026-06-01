import { DataSource } from 'typeorm';
import { Reporter } from './reporters.entity';

export const reportersProviders = [
  {
    provide: 'REPORTER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Reporter),
    inject: ['DATA_SOURCE'],
  },
];
