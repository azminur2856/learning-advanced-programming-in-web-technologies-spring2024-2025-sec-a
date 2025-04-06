import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { check } from './DTO/test.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getUsers(@Body() a: check) {
    //return this.usersService.getUsers();
    return a.title;
  }
}
