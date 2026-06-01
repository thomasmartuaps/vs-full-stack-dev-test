import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { DatabaseModule } from '../database/database.module';
import { jobsProviders } from './jobs.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService, ...jobsProviders],
  exports: [JobsService],
})
export class JobsModule {}
