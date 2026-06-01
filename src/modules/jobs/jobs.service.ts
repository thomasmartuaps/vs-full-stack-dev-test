import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AssignJobDto, CreateJobDto, UpdateStatusDto } from './jobs.dto';
import { Repository } from 'typeorm';
import { Job } from './jobs.entity';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOB_REPOSITORY') private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<{
    data: Job | null;
    message: string;
  }> {
    const res = await this.jobRepository.insert(createJobDto);

    const createdJob = await this.jobRepository.findOne({
      where: {
        id: res.raw?.[0]?.id,
      },
    });

    return {
      data: createdJob,
      message: 'Successfully Created',
    };
  }

  async assignJob(
    assignJob: AssignJobDto,
  ): Promise<{ job: Job; message: string }> {
    try {
      const res = await this.jobRepository.update(
        assignJob.id,
        {
          reporter: assignJob.reporter,
        },
        { returning: ['id', 'case_name', 'reporter'] },
      );
      console.log(res);
      const assignedJob = await this.jobRepository.findOne(res.raw?.[0]?.id);
      if (assignedJob) {
        return {
          job: assignedJob,
          message: 'Assigned Job',
        };
      }
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Job not found',
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

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<{
    data: {
      id: string;
      case_name: string;
      status: string;
    } | null;
    message: string;
  }> {
    const jobToUpdate = await this.jobRepository.findOne({
      where: {
        id: updateStatusDto?.id,
      },
    });

    if (jobToUpdate) {
      let newStatus = jobToUpdate?.status;
      switch (jobToUpdate?.status) {
        case 'NEW':
          newStatus = 'ASSIGNED';
          break;
        case 'ASSIGNED':
          newStatus = 'TRANSCRIBED';
          break;
        case 'TRANSCRIBED':
          newStatus = 'REVIEWED';
          break;
        case 'REVIEWED':
          newStatus = 'COMPLETED';
          break;
        default:
          break;
      }
      const res = await this.jobRepository.update(
        updateStatusDto.id,
        {
          status: newStatus,
        },
        { returning: ['id', 'case_name', 'status'] },
      );
      console.log('UPDATED JOB', res);

      return {
        data: {
          id: res.raw?.[0]?.id,
          case_name: res.raw?.[0]?.case_name,
          status: res.raw?.[0]?.status,
        },
        message: 'Successfully Updated',
      };
    }

    return {
      data: jobToUpdate,
      message: 'Job not found',
    };
  }
}
