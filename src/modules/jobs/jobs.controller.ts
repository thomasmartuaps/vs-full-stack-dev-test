import { Body, Controller, Post, Put } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto, UpdateStatusDto } from './jobs.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() data: CreateJobDto) {
    return await this.jobsService.create({
      ...data,
      status: 'NEW',
    });
  }

  @Put('update-status')
  async updateStatus(@Body() data: UpdateStatusDto) {
    return await this.jobsService.updateStatus(data);
  }
}
