import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EditorsController } from './editors.controller';
import { JobsModule } from '../jobs/jobs.module';
import { editorsProviders } from './editors.provider';
import { EditorsService } from './editors.service';

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [EditorsController],
  providers: [EditorsService, ...editorsProviders],
})
export class ReportersModule {}
