import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PaymentsController } from './payments.controller';
import { JobsModule } from '../jobs/jobs.module';
import { paymentsProviders } from './payments.provider';
import { PaymentsService } from './payments.service';

@Module({
  imports: [DatabaseModule, JobsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, ...paymentsProviders],
})
export class ReportersModule {}
