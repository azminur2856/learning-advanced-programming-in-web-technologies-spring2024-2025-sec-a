import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getHello(): string {
    return 'Welcome Admin in NestJS!';
  }
}
