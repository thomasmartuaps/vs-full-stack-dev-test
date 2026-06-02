import { Injectable } from '@nestjs/common';

@Injectable()
export class EditorsService {
  getHello(): string {
    return 'Hello World!';
  }
}
