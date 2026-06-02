import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './modules/jobs/jobs.module';
import { ReportersModule } from './modules/reporters/reporters.module';

@Module({
  imports: [JobsModule, ReportersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
