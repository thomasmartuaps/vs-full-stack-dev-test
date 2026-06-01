import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      const reporterQuery = await this.reporterRepository.findOne({
        where: {
          id: assignReporterDto.id,
        },
      });
      if (reporterQuery) {
        const assignedJob = await this.jobsService.assignJob({
          id: assignReporterDto.job_id,
          reporter: reporterQuery,
        });

        const assignReporter = await this.reporterRepository.update(
          assignReporterDto.id,
          {
            jobs: [...reporterQuery.jobs, assignedJob.job],
          },
          { returning: ['id'] },
        );

        const updatedReporter = await this.reporterRepository.findOne({
          where: {
            id: assignReporter.raw?.[0].id,
          },
        });

        if (updatedReporter) {
          return {
            data: updatedReporter,
            message: 'Successfully Created',
          };
        }
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Reporter not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Reporter not found',
        },
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error 500',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
