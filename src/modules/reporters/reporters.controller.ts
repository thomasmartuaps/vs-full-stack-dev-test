import { Body, Controller, Put } from '@nestjs/common';
import { ReportersService } from './reporters.service';
import { AssignReporterDto } from './reporters.dto';

@Controller('reporters')
export class ReportersController {
  constructor(private readonly reportersService: ReportersService) {}

  @Put('assign')
  async assign(@Body() data: AssignReporterDto) {
    return await this.reportersService.assignReporter(data);
  }
}
