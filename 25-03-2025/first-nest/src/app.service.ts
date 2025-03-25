import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome AZMINUR RAHMAN in NestJS!';
  }
}
