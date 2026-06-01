import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Reporter } from './reporters.entity';
import { AssignReporterDto } from './reporters.dto';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class ReportersService {
  constructor(
    @Inject('REPORTER_REPOSITORY')
    private reporterRepository: Repository<Reporter>,
    private jobsService: JobsService,
  ) {}

  async assignReporter(assignReporterDto: AssignReporterDto): Promise<{
    data: Reporter | null;
    message: string;
  }> {
    // const res = await this.reporterRepository.findOne({
    //   where: {
    //     id: assignReporterDto.id,
    //   },
    // });

    const assignJob = await this.reporterRepository.update(
      assignReporterDto.id,
      {
        jobs: [assignReporterDto.job],
      },
    );
    console.log(assignJob, 'ASSIGNED');
    return {
      data: null,
      message: 'Successfully Created',
    };
  }
}
