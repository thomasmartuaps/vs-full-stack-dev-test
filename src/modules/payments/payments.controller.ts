import { Body, Controller, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Put('assign')
  assign(@Body() data: any) {
    console.log(data);
    return this.paymentsService.getHello();
  }
}
