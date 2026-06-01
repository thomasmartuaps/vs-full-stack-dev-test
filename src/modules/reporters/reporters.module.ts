import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ReportersController } from './reporters.controller';
import { reportersProviders } from './reporters.provider';
import { ReportersService } from './reporters.service';

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [ReportersController],
  providers: [ReportersService, ...reportersProviders],
})
export class JobsModule {}
