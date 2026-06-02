import { DataSource } from 'typeorm';
import { Editor } from './editors.entity';

export const editorsProviders = [
  {
    provide: 'EDITOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Editor),
    inject: ['DATA_SOURCE'],
  },
];
