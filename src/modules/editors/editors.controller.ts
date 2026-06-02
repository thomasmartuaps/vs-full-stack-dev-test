import { Body, Controller, Put } from '@nestjs/common';
import { EditorsService } from './editors.service';

@Controller('editors')
export class EditorsController {
  constructor(private readonly editorsService: EditorsService) {}

  @Put('assign')
  assign(@Body() data: any) {
    console.log(data);
    return this.editorsService.getHello();
  }
}
